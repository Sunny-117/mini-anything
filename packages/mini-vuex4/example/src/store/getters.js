export default {
    finishedTodos(state) {
        return state.todos.filter(todo => todo.isFinished);
    },
    unfinishedTodos(state) {
        return state.todos.filter(todo => !todo.isFinished)
    },
    filteredTodos(state, getters) {
        switch (state.filter) {
            case 'finished':
                return getters.finishedTodos
            case 'unfinished':
                return getters.unfinishedTodos
            default:
                return state.todos
        }
    }
}