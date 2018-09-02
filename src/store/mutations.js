// 在这里我们可以拿到定义好的常量
// 语法：export * as types from './mutation-types'
import * as types from './mutation-types'

// 然后在这里定义一个mutations, 它是一个对象

const mutations = {
  [types.SET_DATA] (state, data1) {
    state.data1 = data1
  }
}
// 在getters.js里封装一个函数，用来取state里的数据
export default mutations
