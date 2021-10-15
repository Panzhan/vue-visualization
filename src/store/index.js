import Vue from 'vue'
import Vuex from 'vuex'
import base from './modules/base'
import orderManagement from './modules/orderManagement'
import root from './root'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
    ...root,
    getters,
    modules: {
        base,
        orderManagement,
    }
})

export default store
