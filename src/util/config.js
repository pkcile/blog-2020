// config.js
console.log(process.env.NODE_ENV)
const env = process.env.NODE_ENV || 'development';
const backendUrl = process.env.backendUrl || "https://expressrue-back-oqrizfgxor.cn-hangzhou.fcapp.run/";
const backendDevUrl = process.env.backendUrl || 'http://localhost:9000/';
const config = {
  development: {
    backendUrl: backendDevUrl,
  },
  production: {
    backendUrl: backendUrl,
  },
  test: {
    backendUrl: 'https://api.test.example.com',
  },
};

export default config[env];