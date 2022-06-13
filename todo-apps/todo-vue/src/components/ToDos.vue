<template>
<div class="todo-items">
    <div class="todo-item" v-bind:key="item._id" v-for="item in todos">
        <TodoItem v-bind:todoItem="item" @delete-todo-event="$emit('delete-todo-event', item._id)" @check-todo-event="$emit('check-todo-event', item)"/>
    </div>    
</div>
</template>

<script>
import TodoItem from "./TodoItem";

export default {
  name: 'ToDos',
  components: {
      TodoItem 
  },
  props: [
      "todos"
  ],
}
</script>

<style lang="scss">
.todo-items {
    height: 450px;
    overflow-y: auto;
}

.todo-item {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    padding: 8px;
    background-color: antiquewhite;
    justify-content: space-between;
    border-radius: 5px;
}

.remove-item {
    background-color: transparent; /* Green */
    border: none;
    color: black;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: x-large;

    &:hover {
        color:darkgray;
        cursor: pointer;
    }

    &:active {
        color: gray;
        cursor: pointer;
    }
}

.done {
    text-decoration: line-through;
}

.extra-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
}

.text-container {
    display: flex;
    justify-content: center;
    margin-bottom: 16px;
}
</style>