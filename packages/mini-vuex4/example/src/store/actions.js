
export default {
    addTodo({ commit }, text) {
        commit('addTodo', text)
    },
    toggleTodo({ commit }, id) {
        commit('toggleTodo', id)
    },
    removeTodo({ commit }, id) {
        commit('removeTodo', id)
    }
}   