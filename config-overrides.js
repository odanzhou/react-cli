
const { override, fixBabelImports, addLessLoader } = require('customize-cra')
const path = require('path')
const webpack = require('webpack')

// 扩展 process.env
const AddProcessEnv = {
  BUILD_TIME: Date.now(), // 打包时间
}

const setProcessEnvStringify = (raw = {}) => {
  return Object.keys(raw).reduce((env, key) => {
    env[key] = JSON.stringify(raw[key])
    return env
  }, {})
}

const setProcessEnv = (config) => {
  const plugins = config.plugins
  for(let plugin of plugins) {
    if(plugin instanceof webpack.DefinePlugin) {
      plugin['definitions']['process.env'] = {
        ...setProcessEnvStringify(AddProcessEnv),
        ...plugin['definitions']['process.env'],
      }
      break
    }
  }
  return config
}


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
  setProcessEnv,
  fixBabelImports('antd', {
    libraryDirectory: 'es',
    style: 'css',
  }),
  asyncLoadAntIcon,
  addLessLoader(),
)

