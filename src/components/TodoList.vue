<style>
    #todo-list { width: 100%; }
    #todo-list > ul { padding: 0; }
    #todo-list > p { text-align: center; color: #bebebe; }
</style>

<template>
    <section id="todo-list">
        <ul v-if="todos.length > 0">
            <slot></slot>
        </ul>
        <p v-else>尚無任何代辦事項</p>
    </section>
</template>

<script setup >

import { useStore } from 'vuex'
import { computed } from 'vue'
const store = useStore()
const todos = computed(() => store.state.todos).value

</script>