// 获取命令行传参
const parseArgv = require('minimist')(process.argv.slice(2));
const os = require('os');
// const generateRequestConfig = require('./request'); 

// 解析运行时环境
const buildEnvEnum = ['dev', 'local', 'qa', 'preview', 'prod'];
const automatedDeploymentConfigArray = parseArgv._;
let RUN_ENV =
  automatedDeploymentConfigArray[automatedDeploymentConfigArray.length - 1];
if (!buildEnvEnum.includes(RUN_ENV)) {
  RUN_ENV = 'dev';
}
// 解析部署参数
const automatedDeploymentConfig = automatedDeploymentConfigArray
  .slice(0, -2)
  .reduce((source, item) => {
    source[item] = true;
    return source;
  }, {});

// 删除运行时环境
delete parseArgv._;
// 获取操作系统信息
const osType = os.type(); // 操作系统类型
const osPlatform = os.platform(); // 操作系统平台
const osRelease = os.release(); // 操作系统版本
const hostname = os.hostname(); // 计算机主机名
const totalMemory = os.totalmem(); // 系统总内存

console.log('操作系统类型:', osType);
console.log('操作系统平台:', osPlatform);
console.log('操作系统版本:', osRelease);
console.log('主机名:', hostname);
console.log('总内存 (字节):', totalMemory);
buildversion = new Date().toLocaleString() + " | " +  osType.split("_")[0] + " " + osRelease.split(".")[0] + " , " + (totalMemory / (1024 * 1024 * 1024)).toFixed(1) + "GB"
const NODE_ENV = process.env.NODE_ENV || 'development';
// 解析命令行参数
module.exports = Object.keys(parseArgv).reduce(
  (envConfig, key) => {
    envConfig[key] = parseArgv[key] === 'false' ? false : parseArgv[key];
    return envConfig;
  },
  {
    ...automatedDeploymentConfig,
    NODE_ENV,
    RUN_ENV,
    sourcemap: false,
    buildversion
    // ...generateRequestConfig(RUN_ENV, NODE_ENV),
  }
);
