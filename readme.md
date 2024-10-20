### 本地开发环境说明
#### 1.环境说明
开发工具依赖在精简中
开发环境：node 16.20.2
电脑配置：
- CPU i7-4710HQ 2.5GHZ
- 内存 ddr3 8G、
- 存储Samsung SSD 870 EVO 250GB


#### 2.安装的开发工具依赖说明
全局安装rimraf，目的删除node_modules
- 1.开发环境依赖占用147MB空间，包含11,803个文件
- 2.移除babel postcss less，54.1 MB空间，包含8,994个文件
- 3.降低css-loader（3.6.0）、css-minimizer-webpack-plugin（2.0.0）版本，临时屏蔽require('node:crypto')使用，可运行在node12环境
- 4.引入preact及相关开发依赖，开发环境下的依赖74.3 MB 11150个文件 ，打包时间延长至8秒
- 5.依赖更新添加less-loader，开发环境下的依赖78.6 MB 11653个文件
- 6.将后端添加到一个项目中方便开发，开发环境下的依赖146MB 16,371个文件(暂缓)
#### 3.命令速记
```
rimraf .\node_modules\
git tag -a "v0.0.7" -m "使用preact改造该项目"
git push origin v0.0.7
git push origin tag -d v0.0.7
```

ie 10、11 promise未识别
```
import Promise from 'babel-polyfill';
// 解决promise 在ie中未定义的问题
function Promise(executor) {
	this.state = 'pending';
	this.value = undefined;
	this.reason = undefined;
	this.onFulfilledCallbacks = [];
	this.onRejectedCallbacks = [];
	const resolve = (value) => {
	  if (this.state === 'pending') {
		this.state = 'resolved';
		this.value = value;
		this.onFulfilledCallbacks.forEach((callback) => callback(value));
	  }
	};
  
	const reject = (reason) => {
	  if (this.state === 'pending') {
		this.state = 'rejected';
		this.reason = reason;
		this.onRejectedCallbacks.forEach((callback) => callback(reason));
	  }
	};
  
	try {
	  executor(resolve, reject);
	} catch (error) {
	  reject(error);
	}
}
if (!window.Promise) {
	window.Promise = Promise;
}
```
使用AsyncRoute后兼容性降低，最乐观，最好能兼容ie 10+(难，上限)

开发环境下ie 10以上文字（更难)
生产环境缺陷 ie9（工具 SCRIPT1010: 缺少标识符ie8）
路由/#/now/location IE11及以下都不支持
##### md折叠用法
<details>
<summary>点击展开</summary>

这是隐藏的内容。
- 项目1
- 项目2
</details>