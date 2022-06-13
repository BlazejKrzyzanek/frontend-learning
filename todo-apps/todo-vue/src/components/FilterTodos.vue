<template>
<div class="extra-container">
    <div>
        <button class="tab-button" v-bind:class="{ 'active' : filter === 'all'}"  @click="setFilter('all')">All</button>
        <button class="tab-button" v-bind:class="{ 'active' : filter === 'todo'}" v-if="atLeastOneToDo()" @click="setFilter('todo')">To do</button>
        <button class="tab-button" v-bind:class="{ 'active' : filter === 'done'}"  v-if="atLeastOneDone()" @click="setFilter('done')">Done</button>
    </div>
</div>
</template>

<script>
export default {
    name: 'FilterTodos',
    components: { 
    },
    data() {
    return {
        filter: "all"
    }
    },
    props: [
        "todos"
    ], 
    methods: {
        setFilter( newFilter) {
            this.filter = newFilter;
            this.$emit("filter-todo-event", newFilter);
        },
        atLeastOneDone() {
            return this.todos.filter(todo => todo.done).length > 0
        },
        atLeastOneToDo() {
            return this.todos.filter(todo => !todo.done).length > 0
        }
  }
}
</script>

<style lang="scss">
.tab-button {
    background-color: white; /* Green */
    color: black;
    padding: 8px 24px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    border: 1px solid black;
    margin-left: 5px;

    &.active {
        background-color: #4CAF50;
        color: white;
    }

    &:hover {
        background-color: #74e777;
        cursor: pointer;
    }

    &:active {
        background-color: #1d7220;
        cursor: pointer;
    }
}
</style>