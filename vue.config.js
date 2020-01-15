module.exports = {
  //devServer: {
  //},
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line
      config.devtool = 'source-map'
    }
    config.module.rules.push({
      test: require.resolve('quill'),
      use: [
        {
          loader: 'expose-loader',
          options: 'Quill'
        },
        {
          loader: 'expose-loader',
          options: 'window.Quill'
        }
      ]
    })
  },

  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/assets/style/base/base.scss";'
      }
    },
    sourceMap: true
  },

  // publicPath: '/',
  outputDir: 'dist',
  runtimeCompiler: true,
  productionSourceMap: true
  // devServer: {
  //   proxy: 'http://dev.nc.com',
  //   disableHostCheck: true
  // }
  //publicPath: process.env.NODE_ENV === 'production' ? '/' : 'http://dev.nc.com'
  // parallel: undefined,
}
