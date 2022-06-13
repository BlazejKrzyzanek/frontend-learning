<template>
    <form  @submit="addToDo" class="text-container">
        <input type="text" class="text-input" placeholder="What's the task?" v-model="text" name="text">
    </form>
</template>

<script>
    export default {
    name: 'AddToDoButton',
    data() {
        return {
            text: ''
        }
    },
    methods: {
        addToDo(event){
            event.preventDefault();
            if (this.text.trim().length === 0) {
                return
            }

            this.$emit("add-todo-event", this.text);
            this.text= '';
        }
    }
}
</script>

<style lang="scss">
.text-input {
    width: 300px;
    padding: 5px;
    margin-bottom: 16px;
}

</style>