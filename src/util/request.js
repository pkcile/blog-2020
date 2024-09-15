class HttpClient {
    constructor(baseURL = '') {
        this.baseURL = baseURL;
        this.defaultOptions = {
            headers: {
                // 'Content-Type': 'application/json',
                // 'sec-fetch-mode': 'cors',
                // 'sec-fetch-site': 'cross-site',

            },
            timeout: 30000, // 默认超时时间：30秒
        };
        this.requestInterceptors = [];
        this.responseInterceptors = [];
    }

    addRequestInterceptor(interceptor) {
        this.requestInterceptors.push(interceptor);
    }

    addResponseInterceptor(interceptor) {
        this.responseInterceptors.push(interceptor);
    }

    async processRequestOptions(options) {
        let processedOptions = { ...this.defaultOptions, ...options };
        for (const interceptor of this.requestInterceptors) {
            processedOptions = await interceptor(processedOptions);
        }
        return processedOptions;
    }

    async processResponse(response) {
        let processedResponse = response;
        for (const interceptor of this.responseInterceptors) {
            processedResponse = await interceptor(processedResponse);
        }
        return processedResponse;
    }

    // 主请求方法
    async request(url, options = {}) {
        const fullURL = this.baseURL + url;
        const processedOptions = await this.processRequestOptions(options);

        const { timeout, ...fetchOptions } = processedOptions;

        try {
            // 使用 XMLHttpRequest 来替代 fetch，以提高兼容性
            const xhr = await this.xhrRequest(fullURL, fetchOptions, timeout);
            const responseData = this.parseResponse(xhr);
            const processedResponse = await this.processResponse({
                ok: xhr.status >= 200 && xhr.status < 300,
                status: xhr.status,
                statusText: xhr.statusText,
                data: responseData,
            });

            if (!processedResponse.ok) {
                console.error(`HTTP error! status: ${processedResponse.status}`);
            }

            return processedResponse.data;
        } catch (error) {
            console.error('Request failed:', error);
            return {
                ok: false,
                status: 0,
                statusText: '',
                data: null,}
        }
    }

    // XMLHttpRequest 实现
    xhrRequest(url, options, timeout) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(options.method || 'GET', url, true);

            Object.entries(options.headers || {}).forEach(([key, value]) => {
                xhr.setRequestHeader(key, value);
            });

            xhr.timeout = timeout;

            xhr.onload = () => resolve(xhr);
            xhr.onerror = () => reject(new Error('Network error'));
            xhr.ontimeout = () => reject(new Error('Request timeout'));

            xhr.send(options.body);
        });
    }

    // 解析响应
    parseResponse(xhr) {
        const contentType = xhr.getResponseHeader('Content-Type');
        if (contentType && contentType.includes('application/json')) {
            try {
                return JSON.parse(xhr.responseText);
            } catch (e) {
                console.warn('Failed to parse JSON response:', e);
            }
        }
        return xhr.responseText;
    }

    // GET 请求
    get(url, params = {}, options = {}) {
        const queryString = this.buildQueryString(params);
        const fullURL = queryString ? `${url}?${queryString}` : url;
        return this.request(fullURL, { ...options, method: 'GET' });
    }

    // POST 请求
    post(url, data = {}, options = {}) {
        return this.request(url, {
            ...options,
            method: 'POST',
            body: this.stringifyData(data, options.headers),
        });
    }

    // PUT 请求
    put(url, data = {}, options = {}) {
        return this.request(url, {
            ...options,
            method: 'PUT',
            body: this.stringifyData(data, options.headers),
        });
    }

    // DELETE 请求
    delete(url, options = {}) {
        return this.request(url, { ...options, method: 'DELETE' });
    }

    // PATCH 请求
    patch(url, data = {}, options = {}) {
        return this.request(url, {
            ...options,
            method: 'PATCH',
            body: this.stringifyData(data, options.headers),
        });
    }

    // 构建查询字符串
    buildQueryString(params) {
        return Object.entries(params)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');
    }

    // 根据 Content-Type 序列化数据
    stringifyData(data, headers = {}) {
        const contentType = headers['Content-Type'] || this.defaultOptions.headers['Content-Type'];
        if (contentType === 'application/json') {
            return JSON.stringify(data);
        } else if (contentType === 'application/x-www-form-urlencoded') {
            return this.buildQueryString(data);
        }
        return data;
    }
}

// 使用示例
export  const api = new HttpClient('http://localhost:9000/rest/api/position');
export const tiandituquery = new HttpClient('https://api.tianditu.gov.cn/geocoder');

// 添加请求拦截器示例
api.addRequestInterceptor(async (options) => {
    // options.headers['Authorization'] = 'Bearer YOUR_TOKEN';
    return options;
});

// 添加响应拦截器示例
api.addResponseInterceptor(async (response) => {
    if (response.status === 401) {
        // 处理未授权的情况
    }
    return response;
});