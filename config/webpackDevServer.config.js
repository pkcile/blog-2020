const paths = require('./paths');
const ignoredFiles = require('./webpack/ignoredFiles');
const path = require('path')
console.log(path.join(__dirname, '../public'))
module.exports = (proxy, envConfig, allowedHosts = []) => {
  const host =
    typeof envConfig.host === 'string' ? envConfig.host : 'localhost';
  const port = typeof envConfig.port === 'string' ? envConfig.port : 6767;
  const open = envConfig.open || false;
  return {
    open,
    hot: true,
    https: false,
    host,
    port,
    // 代理
    proxy,
    // 服务器白名单
    allowedHosts: allowedHosts.length > 0 ? allowedHosts : 'all',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*',
    },
    // 启用压缩生成
    compress: false,
    // 静态文件
    static: {
      // directory: paths.appPublic,
      // publicPath: paths.publicUrlOrPath.envPublicUrl,
      directory: path.join(__dirname, '../public'),
      // watch: {
      //   ignored: ignoredFiles(paths.appSrc),
      // },
    },
    // 浏览器日志
    client: {
      // progress: true,
      overlay: {
        errors: true,
        warnings: false,
      },
    },
     
  };
};
