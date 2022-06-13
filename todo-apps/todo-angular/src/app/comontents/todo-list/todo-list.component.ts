import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TodoItem } from 'src/app/interfaces/todo-item';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos: TodoItem[] = [];
  todoText: string;
  allChecked: boolean;
  filter: string;

  constructor(private http: HttpClient) { 
    this.allChecked = false;
    this.filter = 'all'
    this.todoText = '';
    this.getTodos();
  }

  ngOnInit(): void {

  }

  add() : void {
    if (this.todoText.trim().length === 0) {
      return
    }

    this.http.post(API_URL + "/todos", {'text': this.todoText})
      .subscribe((response: any) => {
        this.todos = response;
      })

    this.todoText = '';
    this.allChecked = false;
  }

  delete(id: string): void {
    this.http.delete(API_URL + "/todos/" + id)
      .subscribe((response: any) => {
        this.todos = response;
      })
  }

  check(todo: TodoItem): void {
    this.http.put(API_URL + "/todos/" + todo._id, {'done': todo.done })
      .subscribe((response: any) => {
        this.todos = response;
        console.log(response);
      })
  }

  remaining(): number {
    return this.todos.filter(todo => !todo.done).length;
  }

  atLeastOneDone(): boolean {
    return this.todos.filter(todo => todo.done).length > 0
  }

  atLeastOneToDo(): boolean {
    return this.todos.filter(todo => !todo.done).length > 0
  }

  todosFiltered(): TodoItem[] {
    if (this.filter === 'todo') {
      return this.todos.filter(todo => !todo.done);
    } else if (this.filter === 'done') {
      return this.todos.filter(todo => todo.done);
    }

    return this.todos;
  }

  getTodos(): void {
    this.http.get(API_URL + "/todos")
      .subscribe((response: any) => {
        this.todos = response;
      })
  }
}
