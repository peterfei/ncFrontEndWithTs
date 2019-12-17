module.exports = {
    devServer: {
        disableHostCheck: true,
    },
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'development') {
            // eslint-disable-next-line
            config.devtool = 'source-map'
        }
        config.module.rules.push()
    },

    css: {
        loaderOptions: {
            sass: {
                prependData: '@import "@/assets/style/base/base.scss";',
            },
        },
        sourceMap: true,
    },

    // publicPath: '/',
    outputDir: 'dist',
    runtimeCompiler: true,
    productionSourceMap: true,
    // parallel: undefined,
}
