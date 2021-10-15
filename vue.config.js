const path = require('path')
const isProd = process.env.NODE_ENV === 'production'
// // const baseUrl = process.env.baseUrl
const assetsDir = 'static'
// const merge = require('webpack-merge')
// 版本号
process.env.VUE_APP_VERSION = require('./package.json').version
const Version = new Date().getTime();
// 拼接路径
function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {

    publicPath: process.env.baseUrl,
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,
    // eslint-loader 是否在保存的时候检查
    lintOnSave: false,
    runtimeCompiler: true,//VUE报错You are using the runtime-only build of Vue where the template compiler is not available
    outputDir: 'dist',
    //端口的取值范围是：0-65535
    devServer: {
        port: 65432,
        hot: true,
        open: true
    },
    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        // extract: true,
        // 开启 CSS source maps?
        // sourceMap: false,
        // css预设器配置项
        loaderOptions: {
            sass: {
                //         prependData: `$baseUrl: "${baseUrl}";
                // @import '~@/assets/css/vars.scss';
                // @import '~@/assets/css/mixins.scss';
                // @import "~@/assets/css/sprite";`
                prependData: `@import "~@/assets/css/vars.scss";`
            }
        },
        // 启用 CSS modules for all css / pre-processor files.
        // requireModuleExtension: true
    },
    // filenameHashing: true,

    // webpack配置
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/zh/guide/webpack.md
    chainWebpack: config => {
        if (isProd) {
            // mutate config for production...
            config
                .mode('production')
                .output.filename(assetsDir + `/js/[name].[contenthash:3].js`)
                .chunkFilename(assetsDir + `/js/[name].[contenthash:3].js`)
            config.plugin('extract-css').use(require('mini-css-extract-plugin'), [{
                filename: assetsDir + `/css/[name].[contenthash:3].css`,
                chunkFilename: assetsDir + `/css/[name].[contenthash:3].css`
            }])
            // 独立css文件后修改文件路径
            // config.module
            //     .rule('images')
            //     .use('url-loader')
            //     .tap(options => 
            //         merge(options, { 
            //             publicPath: '../../'
            //         })
            //     )
            // config.plugin('uglify-js').use(require('uglifyjs-webpack-plugin'), [{
            //     uglifyOptions: {
            //         warnings: false,
            //         compress: {
            //             passes: 2,
            //             toplevel: true,
            //             unsafe_proto: true,
            //             drop_console: true,
            //             drop_debugger: true,
            //             pure_funcs: ['console.log', 'console.info']
            //         }
            //     }
            // }]);
            // config.plugin('clean').use(require('clean-webpack-plugin'), [['dist']])
            if (process.env.npm_config_report) {
                config
                    .plugin('webpack-bundle-analyzer')
                    .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
            }
        } else {
            // mutate for development...
        }
        // 重新设置 alias
        config.resolve.alias.set('@', resolve('src'))
    },
    // webpack-dev-server 相关配置
    // see https://webpack.js.org/configuration/dev-server/
    // use thread-loader for babel & TS in production build
    // enabled by default if the machine has more than 1 cores
    parallel: require('os').cpus().length > 1 // ,
    // PWA 插件相关配置
    // see https://github.com/vuejs/vue-cli/tree/dev/packages/@vue/cli-plugin-pwa
    // pwa: {},
    // 第三方插件配置
    // pluginOptions: {
    //   // ...
    // },

}
