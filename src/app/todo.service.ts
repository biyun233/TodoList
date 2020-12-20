import { Injectable } from '@angular/core';
import {TodoListData} from './dataTypes/TodoListData';
import {Observable, BehaviorSubject} from 'rxjs';
import {TodoItemData} from './dataTypes/TodoItemData';

@Injectable()
export class TodoService {

  //On récupère todoList dans local avec bon type
  private todoListSubject = new BehaviorSubject<TodoListData>( {label: 'TodoList', items: []} );

  constructor() {
    this.init();
    this.todoListSubject = new BehaviorSubject<TodoListData>(JSON.parse(localStorage.getItem("todoList")));
  }

  
  getTodoListDataObservable(): Observable<TodoListData> {
    return this.todoListSubject.asObservable();
  }

  // pour chaque changement, on mise à jour le stockage local
  setItemsLabel(label: string, ...items: TodoItemData[] ) {
    const tdl = this.todoListSubject.getValue();
    this.todoListSubject.next( {
      label: tdl.label,
      items: tdl.items.map( I => items.indexOf(I) === -1 ? I : ({label, isDone: I.isDone}) )
    });
    this.miseAjour();
  }

  setItemsDone(isDone: boolean, ...items: TodoItemData[] ) {
    const tdl = this.todoListSubject.getValue();
    this.todoListSubject.next( {
      label: tdl.label,
      items: tdl.items.map( I => items.indexOf(I) === -1 ? I : ({label: I.label, isDone}) )
    });
    this.miseAjour();
  }

  appendItems( ...items: TodoItemData[] ) {
    const tdl = this.todoListSubject.getValue();
    this.todoListSubject.next( {
      label: tdl.label, // ou on peut écrire: ...tdl,
      items: [...tdl.items, ...items]
    });
    this.miseAjour();
  }

  removeItems( ...items: TodoItemData[] ) {
    const tdl = this.todoListSubject.getValue();
    this.todoListSubject.next( {
      label: tdl.label, // ou on peut écrire: ...tdl,
      items: tdl.items.filter( I => items.indexOf(I) === -1 )
    });
    this.miseAjour();
  }

  init(){
    //si la donnée en local est null, on l'initialise
    if(!JSON.parse(localStorage.getItem("todoList"))){
      var nouveau = JSON.stringify(this.todoListSubject.getValue());
      localStorage.setItem("todoList",nouveau);
    }
  }
  miseAjour(){
    
    //On met todoList en temp réel dans local
    var nouveau = JSON.stringify(this.todoListSubject.getValue());
    localStorage.setItem("todoList",nouveau);
  }

}