import { AppComponent } from './../app.component';
import { Component, OnInit } from '@angular/core';
import { TodoItem } from '../model/todo-item';
import { CookieService } from 'ngx-cookie-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  TODO_COOCKIES = 'TODO_LIST'
  LAST_ID_COOCKIES = 'TODO_LAST_ID'

  todoList = new Array<TodoItem>;

  form!: FormGroup;


  constructor(
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    if (this.cookieService.check(this.TODO_COOCKIES)) {
      this.todoList = JSON.parse(this.cookieService.get(this.TODO_COOCKIES));
    }


    this.form = new FormGroup({
      task: new FormControl([], { validators: [Validators.required] }),
    });
  }

  get todoComplete(): Array<TodoItem>{
    return this.todoList.filter(td => td.isComplete);
  }

  get todoNotComplete(): Array<TodoItem>{
    return this.todoList.filter(td => !td.isComplete);
  }

  toggleTask(item: TodoItem) {
    this.todoList.forEach(td => {
      if (td.id === item.id){
        td.isComplete = !td.isComplete;
      }
    })

    this.updateTodoListCoockies();
  }

  removeTask(item: TodoItem) {
    this.todoList = this.todoList.filter(td => td.id !== item.id)
    this.updateTodoListCoockies();
  }


  addTask(){

    const task = this.form.value.task;
    const id = new Date().getTime();
    this.todoList.push({id: this.getId(), value: task, isComplete: false});

    this.updateTodoListCoockies();
    this.form.reset();
  }

  updateTodoListCoockies(){
    if (this.todoList.length > 0) {
      const todoJson = JSON.stringify(this.todoList);
      this.cookieService.set(this.TODO_COOCKIES, todoJson);
    } else {
      this.cookieService.delete(this.TODO_COOCKIES);
      this.cookieService.delete(this.LAST_ID_COOCKIES);
    }
  }


  getId(): number {
    let id = 1
    if (this.cookieService.check(this.LAST_ID_COOCKIES)) {
      id = Number.parseInt(JSON.parse(this.cookieService.get(this.LAST_ID_COOCKIES)));
      id++;
    }

    this.cookieService.set(this.LAST_ID_COOCKIES, id.toString());

    return id;
  }
}
