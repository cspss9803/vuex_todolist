<style>
    main {
        margin-top: 5vh;
        position: relative;
        width: clamp(300px, 90vw, 600px);
        left: 50%;
        transform: translateX(-50%);
        padding: 2rem;
        padding-bottom: 1rem;
    }
</style>

<template>
    <main>
        <AddTodo/>
        <TodoList>
            <TodoItem 
                v-for="todo in todos" 
                :key="todo.id" 
                :todo="todo"
            />
        </TodoList>
    </main>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'

import AddTodo from './components/AddTodo.vue';
import TodoList from './components/TodoList.vue';
import TodoItem from './components/TodoItem.vue';

const store = useStore()
const todos = computed(() => store.state.todos).value

</script>


