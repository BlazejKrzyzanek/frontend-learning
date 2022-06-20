<script>
	import { onMount } from "svelte";

	const API_URL = "http://localhost:4000/api"

	let todos = [];
	let todosFiltered = [];
	let currentFilter = 'all';
	let todoText = '';
	let remaining = 0;
	let atLeastOneDone = false;
	let atLeastOneToDo = false;
	
	onMount(async () => {
	  fetch(API_URL + "/todos")
	  .then(response => response.json())
	  .then(data => {
			todos = data;
			update()
	  }).catch(error => {
		console.log(error);
	  });
	});

	function add() {
		if (todoText.trim().length === 0) {
			return
		}
		console.log(todoText);

		fetch(API_URL + "/todos", {
			method: "POST",
			body: JSON.stringify({'text': todoText}),
			headers: { 'Content-Type': 'application/json' }
		})
		.then(response => response.json())
		.then(data => {
			todos = data;
			update()
		}).catch(error => {
			console.log(error);
		});

		todoText = '';
	}

	function deleteTodo(id) {
		fetch(API_URL + "/todos/" + id,{
			method: "DELETE"
		})
		.then(response => response.json())
		.then(data => {
			todos = data;
			update();
		}).catch(error => {
			console.log(error);
		});

	}

	function check(todo) {
		fetch(API_URL + "/todos/" + todo._id, {
			method: "PUT",
			body: JSON.stringify({'done': !todo.done }),
			headers: { 'Content-Type': 'application/json' }
		})
		.then(response => response.json())
		.then(data => {
			todos = data;
			update();
		}).catch(error => {
			console.log(error);
		});
	}

	function update() {
		remaining = todos.filter(todo => !todo.done).length;
		atLeastOneDone = todos.filter(todo => todo.done).length > 0;
		atLeastOneToDo = todos.filter(todo => !todo.done).length > 0;
		filterTodos(currentFilter);
	}

	function filterTodos(filter) {
		if (filter === 'todo') {
			todosFiltered = todos.filter(todo => !todo.done);
		} else if (filter === 'done') {
			todosFiltered = todos.filter(todo => todo.done);
		} else {
			todosFiltered = todos;
		}

		currentFilter = filter;
	}
</script>

<main class="content">
	<div class="container shadow">
		<div class="extra-container">
			<div>
				<button class="tab-button" class:active={currentFilter === 'all'} on:click={() => filterTodos('all')}>All</button>
				{#if atLeastOneToDo}
				<button class="tab-button" class:active={currentFilter === 'todo'} on:click={() => filterTodos('todo')}>To do</button>
				{/if}
				{#if atLeastOneDone}
				<button class="tab-button" class:active={currentFilter === 'done'}  on:click={() => filterTodos('done')}>Done</button>
				{/if}
			</div>
		</div>
		
		
		<form class="text-container" on:submit|preventDefault={add}>
			<input type="text" class="text-input" placeholder="What's the task?" name="todoText" bind:value={todoText}>
		</form>
		
		<div class="todo-items">
			{#each todosFiltered as todo}
			<div class="todo-item">
				<div class="todo-item-left">
					<input id={todo._id} type="checkbox" bind:checked={todo.done} on:click={() => check(todo)}/>
					<label for={todo._id} class="todo-item-label" class:done={todo.done}>{todo.text}</label>
				</div>
				<button class="remove-item" on:click={() => deleteTodo(todo._id)}>&times;</button>
			</div>
			{/each}
		</div>
		
		<div class="extra-container">
			<div>
			</div>
			<div> {remaining} items left</div>
		</div>
	  </div>
</main>

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

	.text-input {
		width: 300px;
		padding: 5px;
		margin-bottom: 16px;
	}

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

	.todo-item-left {
		display: flex;
		align-items: center;
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