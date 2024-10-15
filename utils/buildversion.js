const os = require('os');

// 获取操作系统信息
const osType = os.type(); // 操作系统类型
const osPlatform = os.platform(); // 操作系统平台
const osRelease = os.release(); // 操作系统版本
const hostname = os.hostname(); // 计算机主机名
const totalMemory = os.totalmem(); // 系统总内存

console.log('操作系统类型:', new Date().toLocaleString() + " " +  osType + " " + osRelease + "," + (totalMemory / (1024 * 1024 * 1024)).toFixed(1) + "GB");
// console.log('操作系统平台:', osPlatform);
// console.log('操作系统版本:', osRelease);
// console.log('主机名:', hostname);
// console.log('总内存 (字节):', );