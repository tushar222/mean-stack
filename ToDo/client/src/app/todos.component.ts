import { Component, OnInit } from '@angular/core';
import{TodoService} from '../todo.service'
import {Todo} from '../todo'

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
  providers: [TodoService]
})
export class TodosComponent implements OnInit {

  todolist: Todo[] =[];
  text: string | undefined;
  tempTodo : Todo | undefined;
  constructor(private todoService : TodoService) { }

  ngOnInit(): void {

    this.todoService.getTodos().subscribe(tds => this.todolist = tds, err => console.log(err));

  }

  deleteThisTodo(id: string |undefined){
    var todoLst = this.todolist;
    this.todoService.DeleteTodos(id).subscribe(data=>{
      for(var i =0; i<todoLst.length; i++){
        if(todoLst[i]._id == id){
          todoLst.splice(i,1);
        }
      }
      
    });
  }

  AddTodo(){
    const newTodo = {
      text : this.text,
      isCompleted : false
    }

    this.todoService.AddTodo(newTodo).subscribe(td=> {this.todolist.push(td);
      this.todoService.getTodos().subscribe(tds => this.todolist = tds, err => console.log(err));
      this.text = '';
    });
  }

  updateThisTodo(id: string | undefined){
    var todoLst = this.todolist;
  
    for(var i =0; i<todoLst.length; i++){
      if(todoLst[i]._id == id){
        this.tempTodo = todoLst[i];
        todoLst[i].isCompleted = !todoLst[i].isCompleted;
      }
    }
    this.todoService.updateTodo(this.tempTodo).subscribe(data=>{},err=> console.log(err));
  }

}
