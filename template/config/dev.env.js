'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_DOMAIN: '"http://litemall.api.test.hbtalk.org/"',
  // API_DOMAIN: '"http://litemall.api.hottalk.im/"',
  APP_UID: '"111"',
  // API_DOMAIN: '"http://localhost:8082"',
})

