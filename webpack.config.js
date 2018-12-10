const path = require('path')


function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  // We provide the app's title in Webpack's name field, so that
  // it can be accessed in index.html to inject the correct title.
  name: 'lager', // TODO: change to Settings
  resolve: {
    alias: {
      '@': resolve('src')
    }
  }
}
