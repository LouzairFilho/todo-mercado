import { AppComponent } from './../app.component';
import { Component, OnInit } from '@angular/core';
import { TodoItem } from '../model/todo-item';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  todoList = new Array<TodoItem>;

  constructor() { }

  ngOnInit() {
    this.todoList = [];

    this.todoList.push({id: 1, value: 'Arroz', isComplete: false});
    this.todoList.push({id: 1, value: 'Feijão', isComplete: false});
    this.todoList.push({id: 1, value: 'Oleo', isComplete: true});
    this.todoList.push({id: 1, value: 'Macarrão', isComplete: false});

  }

  get todoComplete(): Array<TodoItem>{
    return this.todoList.filter(td => td.isComplete);
  }

  get todoNotComplete(): Array<TodoItem>{
    return this.todoList.filter(td => !td.isComplete);
  }



}
