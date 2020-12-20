import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  FormUser: FormGroup;
  submit = false;

  constructor(private fb: FormBuilder, private authService: AuthServiceService ) { }

  ngOnInit() {
    this.FormUser = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    },
      { validator: this.VerifyPassword('password', 'confirmPassword') },
    );
  }

  get FormValidation() {
    return this.FormUser.controls;
  }

  //Valider la création du compte
  onSubmit() {
    
    if (this.FormUser.invalid) {
      return;
    } else {
      this.submit = true;
      this.authService.register(this.FormUser.value);
    }
  }

  // Vérifier deux mots de passe sont égaux ou pas 
  VerifyPassword(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];

      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({mustMatch: true});
      } else {
        matchingControl.setErrors(null);
      }

    };
  }

  
}
