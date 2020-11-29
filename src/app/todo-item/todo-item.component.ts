import {Component, Input, OnInit} from '@angular/core';
import { TodoItemData } from '../dataTypes/TodoItemData';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() private item: TodoItemData;
  constructor(private todoService: TodoService) { }

  ngOnInit() {

  }
  get label(): string {
    return this.item.label;
  }

  // les fonctions pour items
  itemLabel(label: string) {
    if(label){
      this.todoService.setItemsLabel(label, this.item);
    }else {
      this.todoService.removeItems(this.item);
    }
  }

  itemDelete() {
    this.todoService.removeItems(this.item);
  }

  itemDone(done: boolean) {
    this.todoService.setItemsDone(done, this.item);
  }
}
