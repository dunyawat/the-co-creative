import { createStore } from "vuex";
import state from '@/store/state'
import mutations from '@/store/mutations'
import actions from '@/store/actions'
import getters from '@/store/getters'
import { def } from "@vue/shared";

const store = createStore({
    namespaced: true,
    state,
    mutations,
    getters,
    actions,
})

export default store