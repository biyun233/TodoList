import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import {TodoService} from './todo.service';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { AuthServiceService } from './auth-service.service';

const routes: Routes = [
  { path: '', component: UserLoginComponent },
  { path: 'user-register', component: UserRegisterComponent },
  { path: 'user-login', component: UserLoginComponent },
  { path: 'todo-item', component: TodoItemComponent },
  { path: 'todo-list', component: TodoListComponent },

];



@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoItemComponent,
    UserLoginComponent,
    UserRegisterComponent
  ],
  imports: [
    BrowserModule, FormsModule,RouterModule.forRoot(routes), ReactiveFormsModule,

  ],
  providers: [TodoService, AuthServiceService],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
