<template>
  <div class="content" id="app">
    <div class="container shadow">
      <FilterTodos v-bind:todos="todos" @filter-todo-event="filter"/>  
      <AddToDoButton @add-todo-event="addToDoItem"/>
      <ToDos v-bind:todos="todosFiltered" @delete-todo-event="deleteToDoItem" @check-todo-event="check"/>
      <ItemsLeft v-bind:todos="todos"/>
    </div>
  </div>
</template>

<script>
    import axios from 'axios'
    import ToDos from './components/ToDos'
    import AddToDoButton from './components/AddToDoButton'
    import FilterTodos from './components/FilterTodos.vue'
import ItemsLeft from './components/ItemsLeft.vue'

    const API_URL = "http://localhost:4000/api";

    export default {
    name: 'App',
    components: {
    ToDos,
    AddToDoButton,
    FilterTodos,
    ItemsLeft
},
    data() {
        return {
            todos: [],
            todosFiltered: [],
            currentFilter: 'all'
        }
    },
    async created() {
      axios.get(API_URL + '/todos')
      .then(response => {
        this.todos = response.data;
        this.refresh();
      })
      .catch(e => {
        this.errors.push(e)
      })
    },
    methods: {
      async addToDoItem(text) {
        try {
          await axios.post(API_URL + '/todos', {
            'text': text
          }).then((response) =>
          {
            this.todos = response.data;
            this.refresh();
          }
          )
        } catch (e) {
          this.errors.push(e)
        }
      },
      async deleteToDoItem(toDoId){
        try {
          await axios.delete(API_URL + '/todos/' + toDoId).then((response) =>
          {
            this.todos = response.data;
            this.refresh();
          }
          )
        } catch (e) {
          this.errors.push(e)
        }
      },
      async check(todoItem){
        try {
          await axios.put(API_URL + '/todos/' + todoItem._id, {
            'done': todoItem.done
          }).then((response) =>
          {
            this.todos = response.data;
            this.refresh();
          }
          )
        } catch (e) {
          this.errors.push(e)
        }
      },
      filter(name){
        this.currentFilter = name;
        this.refresh();
      },
      refresh(){
        console.log(this.currentFilter);
        if (this.currentFilter === 'todo') {
          this.todosFiltered = this.todos.filter(todo => !todo.done);
        } else if (this.currentFilter === 'done') {
          this.todosFiltered = this.todos.filter(todo => todo.done);
        } else {
          this.todosFiltered = this.todos;
        }
      }
    },
    }
</script>



<style lang="scss">
$black-shadow: #555;


.content {
    width: 100%;
    min-height: 100vh;
    display: flex;
}

.container {
    width: 560px;
    height: 560px;
    align-items: center;
    margin: auto;
    padding: 25px;
    border: 1px black solid;
    border-radius: 20px;
    background-color: white;
}

.shadow {
    position: relative;
  
    &:before, &:after {
    z-index: -1;
    position: absolute;
    content: "";
    bottom: 15px;
    left: 10px;
    width: 50%;
    top: 80%;
    max-width:300px;
    background: $black-shadow;
    -webkit-box-shadow: 0 15px 10px $black-shadow;
       -moz-box-shadow: 0 15px 10px $black-shadow;
            box-shadow: 0 15px 10px $black-shadow;
    -webkit-transform: rotate(-3deg);
       -moz-transform: rotate(-3deg);
         -o-transform: rotate(-3deg);
        -ms-transform: rotate(-3deg);
            transform: rotate(-3deg);
    }
    
    &:after {
        -webkit-transform: rotate(3deg);
           -moz-transform: rotate(3deg);
             -o-transform: rotate(3deg);
            -ms-transform: rotate(3deg);
                transform: rotate(3deg);
        right: 10px;
        left: auto;
    }
}
</style>