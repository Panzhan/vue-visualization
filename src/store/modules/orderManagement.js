const state = {
    bidManagementSupplier: null
}

// 全局计算属性
const getters = {}

const mutations = {
    handleUpdateSupplier(state, payload) {
        state.bidManagementSupplier = payload || state.bidManagementSupplier
    },
}

// 异步的action,请求工具限制请求数据不能使用vuex。
const actions = {}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
