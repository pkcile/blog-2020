/*
 * @Author: pkcile wangpengkun2012@hotmail.com
 * @Date: 2024-08-01 00:28:07
 * @LastEditors: pkcile wangpengkun2012@hotmail.com
 * @LastEditTime: 2024-08-11 00:13:19
 * @FilePath: \webpack5-vue2.7\config\paths.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */


const fs = require('fs');
const path = require('path');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const publicUrlOrPath = {
  isEnvDevelopment: process.env.NODE_ENV === 'development',
  envPublicUrl: process.env.NODE_ENV === 'development' ? "./": process.env.PUBLIC_URL
};
module.exports = {
  appPath: resolveApp('.'),
  appBuild: resolveApp('dist'),
  appPublic: resolveApp('public'),
  appSrc: resolveApp('src'),
  appEntry: resolveApp('src/index.js'),
  appHtml: resolveApp('public/index.ejs'),
  appPackageJson: resolveApp('package.json'),
  appTsConfig: resolveApp('tsconfig.json'),
  pnpmLockFile: resolveApp('pnpm-lock.yaml'),
  appNodeModules: resolveApp('node_modules'),
  appWebpackCache: resolveApp('node_modules/.cache'),
  publicUrlOrPath,
};
