// config.js
console.log(process.env.NODE_ENV)
const env = process.env.NODE_ENV || 'development';

console.log(process.env.buildversion)
const backendUrl = process.env.backendUrl || "https://expressrue-back-oqrizfgxor.cn-hangzhou.fcapp.run/";
const backendDevUrl = process.env.backendUrl || 'http://localhost:9000/';
console.log(process.env.buildversion)
const config = {
  development: {
    backendUrl: backendDevUrl,
    buildversion: process.env.buildversion.buildversion,
    buildInfo: process.env.buildversion.buildInfo
  },
  production: {
    backendUrl: backendUrl,
    buildversion: process.env.buildversion.buildversion,
    buildInfo: process.env.buildversion.buildInfo
  },
  test: {
    buildversion: process.env.buildversion.buildversion,
    backendUrl: 'https://api.test.example.com',
    buildInfo: process.env.buildversion.buildInfo
  },
};

export default config[env];