/*
 * @Author: pkcile wangpengkun2012@hotmail.com
 * @Date: 2024-08-01 00:28:07
 * @LastEditors: pkcile wangpengkun2012@hotmail.com
 * @LastEditTime: 2024-08-11 00:18:42
 * @FilePath: \webpack5-vue2.7\config\webpack.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const Webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

const paths = require('./paths');
const createEnvironmentHash = require('./webpack/createEnvironmentHash');
const getHasMultipleCores = require('./webpack/getHasMultipleCores');

module.exports = (webpackEnv, envConfig) => {
  const isEnvProduction = webpackEnv === 'production';
  const isEnvDevelopment = webpackEnv === 'development';
  const shouldUseSourceMap = envConfig.sourcemap;
  const hasMultipleCores = isEnvProduction && getHasMultipleCores();
  if (hasMultipleCores) {
    // 多线程
    const threadLoader = require('thread-loader');
    threadLoader.warmup(
      {
        workers: 3,
        workerParallelJobs: 50,
        poolTimeout: 2000,
        poolParallelJobs: 50,
      },
      ['babel-loader']
    );
  }
  return {
    mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
    bail: isEnvProduction,
    // 持久化缓存
    cache: {
      type: 'filesystem',
      version: createEnvironmentHash(envConfig),
      cacheDirectory: paths.appWebpackCache,
      store: 'pack', // 编译器闲置放置缓存到文件夹
      buildDependencies: {
        defaultWebpack: ['webpack/lib/'],
        config: [__filename],
        // tsconfig: [paths.appTsConfig],
      },
    },
    devtool: isEnvProduction
      ? shouldUseSourceMap
        ? 'source-map'
        : false
      : isEnvDevelopment && 'eval-cheap-module-source-map',
    entry: paths.appEntry,
    module: {
      parser: {
        javascript: {
          exportsPresence: 'error',
          reexportExportsPresence: 'error',
        },
      },
      // noParse: /^(pinia)$/, // 跳过文件编译 vue生态不需要二次编译
      rules: [
        /* 处理js */
        {
          test: /\.m?jsx?$/,
          // 确保 JS 的转译应用到 node_modules 的 Vue 单文件组件
          exclude: (file) =>
            /node_modules/.test(file) && !/\.vue\.js/.test(file),
          use: [
            hasMultipleCores && {
              loader: 'thread-loader', // 多线程
            },
            {
              loader: 'babel-loader',
              options: {
                // This is a feature of `babel-loader` for webpack (not Babel itself).
                // It enables caching results in ./node_modules/.cache/babel-loader/
                // directory for faster rebuilds.
                cacheDirectory: true,
                // set it to false -- your project may benefit from this if it transpiles thousands of files.
                cacheCompression: false,
              },
            },
          ].filter(Boolean),
        },
        /* 处理css */
        {
          test: /\.css$/,
          use: [
            isEnvProduction
              ? {
                  loader: MiniCssExtractPlugin.loader,
                }
              : {
                  loader: 'style-loader',
                },
            {
              loader: 'css-loader',
              options: {
                sourceMap: isEnvProduction && shouldUseSourceMap,
                importLoaders: 2,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: isEnvProduction && shouldUseSourceMap,
              },
            },
          ],
        },
        // /* 处理less */
        // {
        //   test: /\.less$/,
        //   use: [
        //     isEnvProduction
        //       ? {
        //           loader: MiniCssExtractPlugin.loader,
        //         }
        //       : {
        //           loader: 'style-loader',
        //         },
        //     {
        //       loader: 'css-loader',
        //       options: {
        //         sourceMap: isEnvProduction && shouldUseSourceMap,
        //         importLoaders: 2,
        //       },
        //     },
        //     {
        //       loader: 'postcss-loader',
        //       options: {
        //         sourceMap: isEnvProduction && shouldUseSourceMap,
        //       },
        //     },
        //     {
        //       loader: 'less-loader',
        //       options: {
        //         sourceMap: isEnvProduction && shouldUseSourceMap,
        //         lessOptions: require('./theme/lessOptions.js'), // 用于antd 主题配置
        //       },
        //     },
        //   ],
        // },
        /* 内置loader处理其他文件 */
        /* 处理svg */
        {
          test: /\.(svg)(\?.*)?$/,
          type: 'asset/resource',
          generator: {
            filename: 'img/[name].[hash:8][ext]',
          },
        },
        /* 处理img */
        {
          test: /\.(png|jpe?g|gif|webp|avif)(\?.*)?$/,
          type: 'asset',
          generator: {
            filename: 'img/[name].[hash:8][ext]',
          },
          parser: {
            dataUrlCondition: {
              maxSize: 1024, // 1kb
            },
          },
        },
        /* 处理media */
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          type: 'asset',
          generator: {
            filename: 'media/[name].[hash:8][ext]',
          },
        },
        /* 处理font */
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
          type: 'asset',
          generator: {
            filename: 'fonts/[name].[hash:8][ext]',
          },
        },
      ],
    },
    output: {
      path: paths.appBuild,
      filename: isEnvProduction
        ? 'js/[name].[contenthash:8].js'
        : 'js/[name].js',
      chunkFilename: isEnvProduction
        ? 'js/[name].[contenthash:8].js'
        : 'js/[name].js',
      clean: isEnvProduction && {
        keep(asset) {
          return asset.includes('public');
        },
      },
    },
    // output: {
    //   // The build folder.
    //   path: paths.appBuild,
    //   // Add /* filename */ comments to generated require()s in the output.
    //   pathinfo: isEnvDevelopment,
    //   // There will be one main bundle, and one file per asynchronous chunk.
    //   // In development, it does not produce real files.
    //   filename: isEnvProduction
    //     ? 'static/js/[name].[contenthash:8].js'
    //     : isEnvDevelopment && 'static/js/bundle.js',
    //   // There are also additional JS chunk files if you use code splitting.
    //   chunkFilename: isEnvProduction
    //     ? 'static/js/[name].[contenthash:8].chunk.js'
    //     : isEnvDevelopment && 'static/js/[name].chunk.js',
    //   assetModuleFilename: 'static/media/[name].[hash][ext]',
    //   // webpack uses `publicPath` to determine where the app is being served from.
    //   // It requires a trailing slash, or the file assets will get an incorrect path.
    //   // We inferred the "public path" (such as / or /my-project) from homepage.
    //   publicPath: paths.publicUrlOrPath,
    //   // Point sourcemap entries to original disk location (format as URL on Windows)
    //   devtoolModuleFilenameTemplate: isEnvProduction
    //     ? info =>
    //         path
    //           .relative(paths.appSrc, info.absoluteResourcePath)
    //           .replace(/\\/g, '/')
    //     : isEnvDevelopment &&
    //       (info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')),
    // },
    optimization: {
      realContentHash: false, // 不进行额外的哈希编译
      runtimeChunk: isEnvProduction && { name: 'runtime' }, // 抽离runtime chunk
      // 分包
      splitChunks: {
        cacheGroups: {
          defaultVendors: {
            name: 'chunk-vendors',
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            chunks: 'initial',
          },
          common: {
            name: 'chunk-common',
            minChunks: 1,
            minSize: 200,
            priority: -20,
            chunks: 'initial',
            reuseExistingChunk: true,
          },
        },
      },
      minimize: isEnvProduction,
      minimizer: [
        // 并行压缩
        new TerserPlugin({
          terserOptions: {
            compress: {
              // https://github.com/terser/terser#compress-options
              arrows: false,
              collapse_vars: false,
              comparisons: false,
              computed_props: false,
              hoist_funs: false,
              hoist_props: false,
              hoist_vars: false,
              inline: false,
              loops: false,
              negate_iife: false,
              properties: false,
              reduce_funcs: false,
              reduce_vars: false,
              switches: false,
              toplevel: false,
              typeofs: false,
              booleans: true,
              if_return: true,
              sequences: true,
              unused: true,
              conditionals: true,
              dead_code: true,
              evaluate: true,
              pure_funcs: ['console.log', 'console.info'],
              drop_debugger: true,
            },
            mangle: {
              safari10: true,
            },
          },
          parallel: hasMultipleCores,
          extractComments: false, // 不将代码中的备注抽取为单独文件
        }),
        // 压缩css
        isEnvProduction &&
          new CssMinimizerPlugin({
            parallel: hasMultipleCores, // 使用多进程并发
            minimizerOptions: {
              preset: [
                'default',
                {
                  mergeLonghand: false,
                  cssDeclarationSorter: false,
                },
              ],
            },
          }),
      ].filter(Boolean),
    },
    performance: {
      hints: false && 'warning',
      maxAssetSize: 1024 * 1024, // 1M，默认 244KB
      maxEntrypointSize: 1024 * 1024, // 1M 默认 244KB
    },
    plugins: [
      // 定义全局变量
      new Webpack.DefinePlugin({
        webpackDefineEnvConfig: JSON.stringify(envConfig),
      }),
    // Makes some environment variables available in index.html.
    // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
    // <link rel="icon" href="%PUBLIC_URL%/favicon.ico">
    // It will be an empty string unless you specify "homepage"
    // in `package.json`, in which case it will be the pathname of that URL.
      // html
      new HtmlWebpackPlugin({

        inject: true,
        // scriptLoading: 'defer',
        template: paths.appHtml,
        templateParameters: {
          title: "王朋坤的主页",
          PUBLIC_URL:  "." //paths.publicUrlOrPath.envPublicUrl
        },
        ...(isEnvProduction
          ? {
              //filename: 'index.html',
              minify: {
                // 使用html-minifier-terser
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
              },
            }
          : undefined),
      }),
      // new HtmlWebpackPlugin(
      //   Object.assign(
      //     {},
      //     {
      //       title: "测试标题",
      //       inject: true,
      //       template: paths.appHtml,
      //     },
      //     isEnvProduction
      //       ? {
      //           minify: {
      //             removeComments: true,
      //             collapseWhitespace: true,
      //             removeRedundantAttributes: true,
      //             useShortDoctype: true,
      //             removeEmptyAttributes: true,
      //             removeStyleLinkTypeAttributes: true,
      //             keepClosingSlash: true,
      //             minifyJS: true,
      //             minifyCSS: true,
      //             minifyURLs: true,
      //           },
      //         }
      //       : undefined
      //   )
      // ),
      // 压缩css
      isEnvProduction &&
        new MiniCssExtractPlugin({
          filename: 'css/[name].[contenthash:8].css',
          chunkFilename: 'css/[name].[contenthash:8].css',
        }),
      // // 优化moment打包
      // new Webpack.IgnorePlugin({
      //   resourceRegExp: /^\.\/locale$/,
      //   contextRegExp: /moment$/,
      // }),
      // 复制文件
      isEnvProduction &&
        new CopyPlugin({
          patterns: [
            {
              from: paths.appPublic,
              to: paths.appBuild,
              toType: 'dir',
              noErrorOnMissing: true,
              globOptions: {
                ignore: ['**/.DS_Store', paths.appHtml],
              },
              info: {
                minimized: true,
              },
            },
          ],
        }),
      // eslint 校验
      // new ESLintPlugin({
      //   extensions: ['.ts', '.tsx', '.js', '.jsx'],
      //   cwd: paths.appPath,
      //   context: paths.appPath,
      //   // 缓存
      //   cache: true,
      //   cacheLocation: path.resolve(
      //     paths.appNodeModules,
      //     '.cache/.eslintcache'
      //   ),
      //   failOnWarning: true,
      //   failOnError: true,
      // }),
      // 纠正大小写路径
      isEnvDevelopment && new CaseSensitivePathsPlugin(),
    ].filter(Boolean),
    resolve: {
      alias: {
        '@': paths.appSrc
      },
      extensions: ['.js'],
      modules: ['node_modules', paths.appNodeModules],
    },
    stats: 'errors-only',
  };
};