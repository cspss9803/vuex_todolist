<template>
    <form @submit.prevent="handleAddTodo" action="#" class="add-todo-container">
        <input 
            type="text" 
            class="todo-content" 
            autocomplete="off" 
            placeholder="請輸入代辦事項..." 
            @keyup.enter="addTodoWithEnter" 
        >
        <button>新增代辦事項</button>
    </form>
</template>

<style>
    .add-todo-container { width: 100%; display: flex; }
    .add-todo-container > input { width: 100%; height: 50px; outline: none; font-size: 1.3rem; padding-left: 1rem; border-radius: 5px 0 0 5px; }
    .add-todo-container > input::-webkit-input-placeholder { font-size: 1rem; }
    .add-todo-container > button { 
        word-break: keep-all; 
        width: 150px;
        background-color: #44764a;
        outline: none;
        border: 0;
        color: #fff;
        cursor: pointer;
        border-radius: 0 5px 5px 0;
    }
    .add-todo-container > button:hover { background-color: #45894d; }
    .add-todo-container > button:active { background-color: #35723c; }
</style>

<script setup>
import { useStore } from 'vuex'
const store = useStore()

// 當表單送出時，向儲存庫(store) dispatch 一個 addTodo 的申請
const handleAddTodo = ( event ) => {

    // 取得代辦事項
    const todoInput = event.target.querySelector('.todo-content')

    // 取得代辦事項的文字內容(去除前後的空格)
    const todoText = todoInput.value.trim()

    // 確保目前的代辦事項是有文字內容的
    if( todoText === '' ) { return }

    // 向儲存庫(store) 發送(dispatch) 一個名為 "addTodo" 的 動作(action)
    // 如此一來，儲存庫就會去新增代辦事項，然後立即渲染在畫面上
    store.dispatch('addTodo', todoText)

    // 新增完代辦事項之後，清空輸入框的內容
    todoInput.value = ''

    // 持續聚焦在輸入框，讓使用者可以馬上寫下一條代辦事項 
    todoInput.focus();

}

// 當使用者是靠 Enter 鍵來發送代辦事項時...
const addTodoWithEnter = ( event ) => {

    // 準備一個 handleAddTodo 需要的參數格式
    const enterEvent = { target: '' }

    // 設定這個參數的值為輸入框的外層(也就是<form>)
    enterEvent.target = event.target.parentNode

    // 最後將參數放入，並呼叫 handleAddTodo 來新增代辦事項
    handleAddTodo(enterEvent)
}

</script>