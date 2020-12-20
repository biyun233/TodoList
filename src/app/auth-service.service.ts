import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserCompte } from '../app/dataTypes/UserCompte';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private router: Router) { }
  // Créer un Compte d'utilisateur
  async register(userCompte: UserCompte) {
    await firebase.auth().createUserWithEmailAndPassword(userCompte.email, userCompte.password)
      .then((res) => {
        this.router.navigate(['/todo-list']);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  
  // Connexion Utilisateur
  login(userCompte: UserCompte) {
    firebase.auth().signInWithEmailAndPassword(userCompte.email, userCompte.password)
      .then((res) => {
        this.router.navigate(['/todo-list']);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

   // Déconnexion de l'Utilisateur
   logout() {
    firebase.auth().signOut();
    this.router.navigate(['/user-login']);
  }
}
