import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../todo'; 
@Component({
  moduleId: module.id,
  selector: 'todos',
  templateUrl: `todos.component.html`,
  providers: [TodoService]
})
export class TodosComponent implements OnInit {
  
  todos: Todo[];
  
  constructor(private _todoService: TodoService){
    
  }
  
  ngOnInit(){
    this.todos=[];
    this._todoService.getTodos()
      .subscribe(todos => {
        this.todos = todos;
      });
  }
  addTodo(event:any ,todoText:any){
    var result:any;
    var newTodo:Todo={
      "text":todoText.value,
      "isCompleted":false
    };
    
    result = this._todoService.saveTodo(newTodo);
    
    result.subscribe(x => {
      this.todos.push(newTodo);
      todoText.value="";
    })
  }
  
  
  updateStatus(todo:any){
    
    var _todo = {
      _id:todo._id,
      text:todo.text,
      isCompleted: !todo.isCompleted
    };
    
    this._todoService.updateTodo( _todo).subscribe(data =>{
      todo.isCompleted=!todo.isCompleted;
    });
    
    
  }
  getStatus(todo:any){
    if (todo.isCompleted){
      return "line-through";
    }else{
      return "none";
    }
  }
  
  setEditState(todo:any,state:boolean){
    if (state){
      todo.isEditMode = state;
    }else{
      delete todo.isEditMode;
    }
    
  }
  
  updateTodoText(event:any ,todo:any){
    if (event.which === 13){
      todo.text=event.target.value;
      var _todo = {
      _id:todo._id,
      text:todo.text,
      isCompleted: todo.isCompleted
    };
    
    this._todoService.updateTodo( _todo).subscribe(data =>{
      this.setEditState(todo,false);
    });
    }
  }
  
  deleteTodo(todo:any){
    var result:any;
    result=this._todoService.deleteTodo(todo._id)
    result.subscribe(data =>{
    this.todos=this.todos.filter(function(el) {
        return el._id !== todo._id;
      });
    });
  }
  
}
