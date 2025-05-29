// 使用传统的 require 方式代替 import
var config = require('./config');

function HttpClient(baseURL) {
    this.baseURL = baseURL || '';
    this.defaultOptions = {
        headers: {},
        timeout: 30000 // 默认超时时间：30秒
    };
    this.requestInterceptors = [];
    this.responseInterceptors = [];
}

// 添加请求拦截器
HttpClient.prototype.addRequestInterceptor = function(interceptor) {
    this.requestInterceptors.push(interceptor);
};

// 添加响应拦截器
HttpClient.prototype.addResponseInterceptor = function(interceptor) {
    this.responseInterceptors.push(interceptor);
};

// 处理请求选项
HttpClient.prototype.processRequestOptions = function(options, callback) {
    var self = this;
    var processedOptions = this.extend({}, this.defaultOptions, options);
    
    var chain = function(opts, interceptors, index, callback) {
        if (index >= interceptors.length) {
            callback(opts);
            return;
        }
        
        interceptors[index](opts, function(newOpts) {
            chain(newOpts, interceptors, index + 1, callback);
        });
    };
    
    chain(processedOptions, this.requestInterceptors, 0, callback);
};

// 处理响应
HttpClient.prototype.processResponse = function(response, callback) {
    var self = this;
    
    var chain = function(resp, interceptors, index, callback) {
        if (index >= interceptors.length) {
            callback(resp);
            return;
        }
        
        interceptors[index](resp, function(newResp) {
            chain(newResp, interceptors, index + 1, callback);
        });
    };
    
    chain(response, this.responseInterceptors, 0, callback);
};

// 主请求方法
HttpClient.prototype.request = function(url, options, callback) {
    if (typeof options === 'function') {
        callback = options;
        options = {};
    }
    
    var self = this;
    var fullURL = this.baseURL + url;
    
    this.processRequestOptions(options || {}, function(processedOptions) {
        var timeout = processedOptions.timeout;
        var fetchOptions = self.extend({}, processedOptions);
        delete fetchOptions.timeout;
        
        self.xhrRequest(fullURL, fetchOptions, timeout, function(error, xhr) {
            if (error) {
                console.error('Request failed:', error);
                callback({
                    ok: false,
                    status: 0,
                    statusText: '',
                    data: null
                }, null);
                return;
            }
            
            var responseData = self.parseResponse(xhr);
            var response = {
                ok: xhr.status >= 200 && xhr.status < 300,
                status: xhr.status,
                statusText: xhr.statusText,
                data: responseData
            };
            
            self.processResponse(response, function(processedResponse) {
                if (!processedResponse.ok) {
                    console.error('HTTP error! status: ' + processedResponse.status);
                }
                
                var data = {};
                try {
                    data = JSON.parse(processedResponse.data);
                } catch (error) {
                    data = processedResponse.data;
                }
                
                callback(null, data);
            });
        });
    });
};

// XMLHttpRequest 实现
HttpClient.prototype.xhrRequest = function(url, options, timeout, callback) {
    var xhr = new XMLHttpRequest();
    options = options || {};
    
    xhr.open(options.method || 'GET', url, true);

    // 设置请求头
    var headers = options.headers || {};
    for (var key in headers) {
        if (headers.hasOwnProperty(key)) {
            xhr.setRequestHeader(key, headers[key]);
        }
    }

    xhr.timeout = timeout || 0;

    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            callback(null, xhr);
        } else {
            callback(new Error('Request failed with status: ' + xhr.status));
        }
    };

    xhr.onerror = function() {
        callback(new Error('Network error'));
    };

    xhr.ontimeout = function() {
        callback(new Error('Request timeout'));
    };

    // 确保 body 是字符串
    var body = options.body;
    if (body && typeof body !== 'string') {
        try {
            body = JSON.stringify(body);
            if (!headers['Content-Type']) {
                xhr.setRequestHeader('Content-Type', 'application/json');
            }
        } catch (e) {
            callback(new Error('Failed to stringify request body'));
            return;
        }
    }

    xhr.send(body);
};

// 解析响应
HttpClient.prototype.parseResponse = function(xhr) {
    var contentType = xhr.getResponseHeader('Content-Type');
    if (contentType && contentType.indexOf('application/json') !== -1) {
        try {
            return JSON.parse(xhr.responseText);
        } catch (e) {
            console.warn('Failed to parse JSON response:', e);
        }
    }
    return xhr.responseText;
};

// GET 请求
HttpClient.prototype.get = function(url, params, options, callback) {
    if (typeof params === 'function') {
        callback = params;
        params = {};
        options = {};
    } else if (typeof options === 'function') {
        callback = options;
        options = {};
    }
    
    var queryString = this.buildQueryString(params || {});
    var fullURL = queryString ? url + '?' + queryString : url;
    this.request(fullURL, this.extend({}, options, { method: 'GET' }), callback);
};

// POST 请求
HttpClient.prototype.post = function(url, data, options, callback) {
    if (typeof data === 'function') {
        callback = data;
        data = {};
        options = {};
    } else if (typeof options === 'function') {
        callback = options;
        options = {};
    }
    
    this.request(url, this.extend({}, options, {
        method: 'POST',
        body: this.stringifyData(data || {}, options ? options.headers : null)
    }), callback);
};

// 其他 HTTP 方法 (PUT, DELETE, PATCH) 类似实现...

// 构建查询字符串
HttpClient.prototype.buildQueryString = function(params) {
    var queryParts = [];
    
    for (var key in params) {
        if (params.hasOwnProperty(key)) {
            queryParts.push(
                encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
            );
        }
    }
    
    return queryParts.join('&');
};

// 根据 Content-Type 序列化数据
HttpClient.prototype.stringifyData = function(data, headers) {
    var contentType = (headers && headers['Content-Type']) || 
                     (this.defaultOptions.headers && this.defaultOptions.headers['Content-Type']);
    
    if (contentType === 'application/json') {
        return JSON.stringify(data);
    } else if (contentType === 'application/x-www-form-urlencoded') {
        return this.buildQueryString(data);
    }
    return data;
};

// 对象扩展方法 (替代 {...obj} 展开语法)
HttpClient.prototype.extend = function(target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
            if (source.hasOwnProperty(key)) {
                target[key] = source[key];
            }
        }
    }
    return target;
};

// 使用示例
var api = new HttpClient(config.backendUrl + 'rest/api/position');
var staticApi = new HttpClient('');
var tiandituquery = new HttpClient('https://api.tianditu.gov.cn/geocoder');

// 添加请求拦截器示例
api.addRequestInterceptor(function(options, next) {
    // options.headers['Authorization'] = 'Bearer YOUR_TOKEN';
    next(options);
});

// 添加响应拦截器示例
api.addResponseInterceptor(function(response, next) {
    if (response.status === 401) {
        // 处理未授权的情况
    }
    next(response);
});

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        api: api,
        staticApi: staticApi,
        tiandituquery: tiandituquery,
        HttpClient: HttpClient
    };
}