<template>
    <div class="todo-item-left">
        <input ref="todoCheck" type="checkbox" :checked="todoItem.done" @click="check(todoItem)"/>
        <label class="todo-item-label" v-bind:class="{ 'done' : todoItem.done }">{{ todoItem.text }}</label>
    </div>

    <button class="remove-item" @click="$emit('delete-todo-event', todoItem._id)">&times;</button>
</template>

<script>
export default {
  name: 'TodoItem',
  components: {
  },
  props: [
    "todoItem"
  ],
  methods: {
    check(todoItem){
        todoItem.done = this.$refs.todoCheck.checked;
        this.$emit("check-todo-event", todoItem);
    }
  }
}
</script>

<style>
</style>