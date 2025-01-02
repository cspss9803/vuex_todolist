<style>
    .todo-item { 
        width: 100%; 
        min-height: 55px;
        display: flex; 
        position: relative;
        background-color: #e1eee4;
        padding-left: 1rem; 
        align-items: center; 
        box-sizing: border-box; 
        margin: 1rem 0; 
        border-radius: 5px; 
    }
    .todo-item > input[type=checkbox] { width: 20px; height: 20px; margin: 0; padding: 0; margin-right: 1rem; cursor: pointer; color: #fff; accent-color: #4ba868; }
    .todo-item > p { padding-right: 1rem; max-width: 450px; text-overflow:ellipsis; overflow:hidden; }
    .todo-item > button { width: 20px; height: 20px; position: absolute; top: 50%; transform: translateY(-50%); border: 0; cursor: pointer; background-color: transparent;}
    .todo-item > button svg { position: relative; left: -100%; }
    .todo-item > button.ckeck { left: 1rem; opacity: 0; }
    .todo-item > button.edit { left: calc(90% - 20px); }
    .todo-item > button.edit:hover svg path { fill: #4d61f5; }
    .todo-item > button.remove { left: calc(100% - 45px); }
    .todo-item > button.remove:hover svg path { fill: red; }
    .completed-todo { opacity: 0.5; }
    .completed-todo > p { width: 100%; text-decoration: line-through; }
    .eidtBox { width: 70%; position: relative; }
    .eidtBox > input { width: 100%; height: 30px; padding-left: .5rem; padding-right: 80px; box-sizing: border-box; outline: none; }
    .eidtBox > button { width: 50px; height: 100%; position: absolute; padding: 0; border: 0; color: #fff; cursor: pointer; top: 50%; transform: translateY(-50%); right: 0; background-color: #44764a; }
    .eidtBox > button:hover { background-color: #45894d; }
    .eidtBox > button:active { background-color: #25522a; }
    button svg { pointer-events: none; }
</style>

<template>
    <div :class="todo.isCompleted ? 'todo-item completed-todo' : 'todo-item'">

        <button @click="onToggleTodo" class="ckeck"></button>

        <input type="checkbox" v-model="todo.isCompleted">

        <div class="eidtBox" v-show="todo.isEditing">
            <input  type="text" :value="todo.todoText" @blur="onFinishEditTodo" @keyup.enter="onFinishEditTodo">
            <button>Ok!</button>
        </div>
        <p v-if="!todo.isEditing">{{ todo.todoText }}</p>        

        <button class="edit" @click="onEditTodo" v-show="!todo.isEditing && !todo.isCompleted">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
            </svg>
        </button>

        <button class="remove" @click="onRemoveTodo" v-show="!todo.isEditing">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="rgb(88, 119, 101)" viewBox="0 0 20 20">
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
            </svg>
        </button>
        
    </div>
</template>

<script setup>
import { nextTick } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const props = defineProps(['todo'])
const todo = props.todo

const onToggleTodo = () => store.dispatch('toggleTodo', todo.id)

const onRemoveTodo = () => store.dispatch('removeTodo', todo.id)

const onEditTodo = ( event ) => { 
    store.dispatch('editTodo', todo.id)
    nextTick(()=>{
        const editInput = event.target.parentNode.querySelector('.eidtBox > input')
        editInput.focus()
    })
}

const onFinishEditTodo = ( event ) => {
    const newText = event.target.value.trim()

    // 如果編輯後的代辦事項是空的，就直接移除這個代辦事項
    if( newText === '' ) { onRemoveTodo(); return }
    
    // 反之，則向儲存庫發送更改內容的申請
    const id = todo.id
    store.dispatch('finishEditTodo', {id, newText})
}

</script>