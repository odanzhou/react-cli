
const { override, fixBabelImports, addLessLoader } = require('customize-cra')
const path = require('path')
const webpack = require('webpack')

// module.exports = function (config) {
//   config.plugins.unshift(new webpack.DefinePlugin({
//     'process.env': {
//         NODE_ENV: `"${process.env.NODE_ENV}"`,
//         BUILD_TIME: Date.now(), // 打包时间
//     }
//   }))
//   return config
// }

const asyncLoadAntIcon = (config) => {
  config.module.rules.push({
    loader: 'webpack-ant-icon-loader',
    enforce: 'pre',
    include: [
      path.resolve('node_modules/@ant-design/icons/lib/dist')
    ]
  })
  return config
}

 // new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/)

module.exports = override(
  fixBabelImports('antd', {
    libraryDirectory: 'es',
    style: 'css',
  }),
  asyncLoadAntIcon,
  addLessLoader(),
)

