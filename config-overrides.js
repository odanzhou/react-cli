
const { override, fixBabelImports, addLessLoader } = require('customize-cra')
const path = require('path')

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

module.exports = override(
  fixBabelImports('antd', {
    libraryDirectory: 'es',
    style: 'css',
  }),
  asyncLoadAntIcon,
  addLessLoader(),
)

