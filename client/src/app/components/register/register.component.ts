import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  message;
  messageClass;
  visibilite = 'uk-invisible';
  processing = false;
  emailValid;
  emailMessage;
  usernameValid;
  usernameMessage;

  createForm() {
    this.form = this.formBuilder.group({
      email : ['', Validators.compose([
        Validators.required,
        Validators.minLength(15),
        Validators.maxLength(30),
        this.validateEmail
      ])],
      username : ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
        this.validateUsername
      ])],
      password : ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(35)
      ])],
      confirmPassword : ['', Validators.required],
    }, { validator: this.matchingPassword ('password', 'confirmPassword') });
  }

  disableForm() {
    this.form.controls['email'].disable();
    this.form.controls['username'].disable();
    this.form.controls['password'].disable();
    this.form.controls['confirmPassword'].disable();
  }

  enableForm() {
    this.form.controls['email'].enable();
    this.form.controls['username'].enable();
    this.form.controls['password'].enable();
    this.form.controls['confirmPassword'].enable();
  }

  onRegisterSubmit() {
    this.processing = true;
    this.disableForm();
    const user = {
      email : this.form.get('email').value,
      username : this.form.get('username').value,
      password : this.form.get('password').value,
    };
    this.authService.registerUser(user).subscribe(data => {
      if (!data.success) {
        this.visibilite = 'uk-visible@m';
        this.messageClass = 'uk-alert-danger';
        this.message = data.message;
        this.processing = false;
        this.enableForm();
      } else {
        this.visibilite = 'uk-visible@m';
        this.messageClass = 'uk-alert-success';
        this.message = data.message;
        setTimeout(() => {
          this.router.navigate(['/login']);
          }, 2000);
      }
    });
  }
  validateEmail(controls) {
    // tslint:disable-next-line:max-line-length
    const regExp = new RegExp(/^(([^<>()[\]\\.,;:\s@\']+(\.[^<>()[\]\\.,;:\s@\']+)*)|(\'.+\'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return { 'validateEmail' : true };
    }
  }

  validateUsername(controls) {
    // tslint:disable-next-line:max-line-length
    const regExp = new RegExp(/^[A-Za-z0-9]+$/);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return { 'validateUsername' : true };
    }
  }

  matchingPassword(password, confirmPassword) {
    // tslint:disable-next-line:max-line-length
    return (group: FormGroup) => {
      if (group.controls[password].value === group.controls[confirmPassword].value) {
        return null;
      } else {
        return { 'matchingPassword': true };
      }
    };
  }

  checkEmail() {
    this.authService.checkEmail(this.form.get('email').value).subscribe( data => {
      if (!data.success) {
        this.emailValid = false;
        this.emailMessage = data.message;
        this.visibilite = 'uk-visible@m';
      } else {
        this.visibilite = 'uk-visible@m';
        this.emailValid = true;
        this.emailMessage = data.message;

      }
    } );
  }

  checkUsername() {
    this.authService.checkUsername(this.form.get('username').value).subscribe( data => {
      if (!data.success) {
        this.visibilite = 'uk-visible@m';
        this.usernameValid = false;
        this.usernameMessage = data.message;
      } else {
        this.visibilite = 'uk-visible@m';
        this.usernameValid = true;
        this.usernameMessage = data.message;

      }
    } );
  }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.createForm();
  }



  ngOnInit() {
  }

}
