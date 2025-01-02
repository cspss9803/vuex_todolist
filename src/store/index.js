import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            todos: [
                { 
                    id: crypto.randomUUID(), 
                    todoText: '完成 vue 代辦清單', 
                    isCompleted: true, 
                    isEditing: false
                }
            ]
        };
    },

    mutations: {

        addTodo(state, newText) {
            state.todos.push({ 
                id: crypto.randomUUID(), 
                todoText: newText, 
                isCompleted: false, 
                isEditing: false 
            })
        },

        toggleTodo(state, id) {
            const todo = state.todos.find(todo => todo.id === id)
            if (todo) { todo.isCompleted = !todo.isCompleted }
        },

        editTodo(state, id) {
            const todo = state.todos.find(todo => todo.id === id)
            if (todo) { todo.isEditing = !todo.isEditing }
        },

        finishEditTodo(state, {id, newText}) {
            console.log(state.todos)
            const todo = state.todos.find(todo => todo.id === id)
            todo.todoText = newText
            todo.isEditing = false
        },

        removeTodo(state, id) {
            const index = state.todos.findIndex(todo => todo.id === id)
            if (index !== -1) {
                state.todos.splice(index, 1)
            }
        },

    },

    actions: {
        addTodo({ commit }, newTodo) { commit('addTodo', newTodo) },

        editTodo({ commit }, id) { commit('editTodo', id) },

        finishEditTodo({ commit }, {id, newText}) { commit('finishEditTodo', { id, newText }) },

        removeTodo({ commit }, id) { commit('removeTodo', id) },

        toggleTodo({ commit }, id) { commit('toggleTodo', id) }
    }
    
});

export default store;
