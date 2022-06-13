<template>
<div class="extra-container">
    <div>
    </div>
    <div>{{ remaining() }} items left</div>
</div>
</template>

<script>
export default {
  name: 'ItemsLeft',
  components: {
  },
  props: [
      "todos"
  ], methods: {
    remaining() {
        return this.todos.filter(todo => !todo.done).length;
    },
  }
}
</script>