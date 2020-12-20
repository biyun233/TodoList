import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {


  LoginForm: FormGroup;
  submit = false;

  constructor(private fb: FormBuilder, private authService: AuthServiceService) { }

  ngOnInit() {
    // On gére la Validation du Formulaire ici
    this.LoginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
      },
    );
  }

  // Grâce à cette fonction on peut accéder aux validations dans le html correspondant
  get FormValidation() {
    return this.LoginForm.controls;
  }

  //Valider le connexion
  onSubmit() {
    this.submit = true;
    if (this.LoginForm.invalid) { 
      return;
    } else { 
      this.authService.login(this.LoginForm.value);
    }
  }

}
