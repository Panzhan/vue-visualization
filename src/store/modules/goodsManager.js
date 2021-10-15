const state = {
    types: [
        {
            id: 4,
            name: "智能出价",
            key: 'autoprice',
        },{
            id: 1,
            name: "直接出价",
            key: 'price',
        },
        // 暂时去掉所有的自动跟价
        // {
        //     id: 2,
        //     name: "自动跟价",
        //     key: 'lowerprice',
        // },
        {
            id: 3,
            name: "到手价出价",
            key: 'incomeprice',
        },
       
    ]
}

// 全局计算属性
const getters = {}

const mutations = {}

// 异步的action,请求工具限制请求数据不能使用vuex。
const actions = {}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
