import {Component, OnInit} from '@angular/core';
import {TodoListData} from '../dataTypes/TodoListData';
import {TodoItemData} from '../dataTypes/TodoItemData';
import {TodoService} from '../todo.service';

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

    private todoList: TodoListData; 
    filter : string;
    constructor(private todoService: TodoService) {
        todoService.getTodoListDataObservable().subscribe( tdl => this.todoList = tdl );
    }

    ngOnInit() {
        this.filter = "Tous";
    }
    
    get label(): string {
        return this.todoList.label;
    }
    
    get items(): TodoItemData[] {
        return this.todoList.items;
    }

    appendItem(label:string):void {
        //On append un item seulement quand il est non vide (inclut caractère à part d'espace)
        var s = false;
        for(var i = 0; i < label.length; i++) {
            if(label[i] != ' '){
                s = true;
            }
        }
        if(label.length != 0 && s){
            this.todoService.appendItems({
                label,
                isDone: false
            });
        }
    }

    //marquer ou démarquer les items
    listDone(){
        var liste_done = true;
        for(let item of this.todoList.items){
            if(!item.isDone){
                this.todoService.setItemsDone(true, item);
                liste_done = false;
            }
        }
        if(liste_done){
            for(let item of this.todoList.items){
                this.todoService.setItemsDone(false, item);
            }
        }
    }

    //counter cochés
    countDone(){
        var count = 0;
        for(let item of this.todoList.items){
            if(!item.isDone){
                count ++;
            }
        }
        return count;
    }

    // supprimer cochés
    DeleteDone(){
        
        for(let item of this.todoList.items){
            if(item.isDone){
                this.todoService.removeItems(item);
            }
        }
    }

    //navigation pour Tous, Actifs, Complétés
    filter_item(){
        if(this.filter == 'Tous'){
            return this.todoList.items;
        }
        else if(this.filter == 'Actifs'){
            return this.todoList.items.filter(item => !item.isDone);
        }
        else if(this.filter == 'Complétés'){
            return this.todoList.items.filter(item => item.isDone);
        }
    }

    //décider l'affichage de "supprimer cochés"
    verifyDone() {
        var done = false;
        for(let item of this.todoList.items){
            if(item.isDone){
                done = true;
            }
        }
        return done;
    }

}
