const path = require('path');
const fs = require('fs');

// process.cwd(): 当前 Node.js 进程执行时的工作目录
// __disname:当前模块的目录名
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  _resolveApp: resolveApp,
  PUBLIC_PATH: '/',
  appRoot: resolveApp('.'),
  appSrc: resolveApp('src'),
  appIndex: resolveApp('src/App'),
  appDist: resolveApp('dist'),
  appNodeModules: resolveApp('node_modules'),
  appEjs: resolveApp('src/document.ejs'),
  appPublic: resolveApp('public'),
  appDll: resolveApp('dll'),
  appAnalysis: resolveApp('analysis')
};
