import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TodoService} from './todo.service';
import {TodoListData} from './dataTypes/TodoListData';
import {TodoItemData} from './dataTypes/TodoItemData';
import * as firebase from 'firebase';
import {AuthServiceService} from '../app/auth-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  constructor(private authService: AuthServiceService){
    const firebaseConfig = {
      apiKey: "AIzaSyCeFL63BhUCzHOK99mC0nIztFnSRBV8ao4",
      authDomain: "todolist-162e7.firebaseapp.com",
      databaseURL: "https://todolist-162e7.firebaseio.com",
      projectId: "todolist-162e7",
      storageBucket: "todolist-162e7.appspot.com",
      messagingSenderId: "566597998647",
      appId: "1:566597998647:web:4a865d43166afd110187b2"
    };
    firebase.initializeApp(firebaseConfig);
  }

  // Déconnexion de l'Utilisateur
  logout() {
    this.authService.logout();
  }
}
