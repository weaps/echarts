// 初始化 store 入口文件
import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
// 引入createLogger, 此插件是用来：当state 数据变化时 可打印出详细记录
import createLogger from 'vuex/dist/logger'
Vue.use(Vuex)
// 添加vuex调试工具, 只有在开发环境中启用 （此功能影响性能）
const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  // 当是严格模式下，启用debug
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
