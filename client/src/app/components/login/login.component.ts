import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { AuthGuard } from './../../auth/auth.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  message;
  messageClass;
  visibilite = 'uk-invisible';
  visibilitee = 'uk-invisible';
  processing = false;
  previousUrl;
  emailValid;
  emailMessage;
  usernameValid;
  usernameMessage;

  createForm() {
    this.form = this.formBuilder.group({

      username : ['', Validators.required],
      password : ['', Validators.required],
    });
  }

  disableForm() {
    this.form.controls['username'].disable();
    this.form.controls['password'].disable();
  }

  enableForm() {
    this.form.controls['username'].enable();
    this.form.controls['password'].enable();
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
        this.visibilitee = 'uk-visible@m';
        this.usernameValid = true;
        this.usernameMessage = data.message;

      }
    } );
  }

  onLoginSubmit() {

    const user = {
      username : this.form.get('username').value,
      password : this.form.get('password').value,
    };
    this.authService.login(user).subscribe(data => {
      if (!data.success) {
        this.visibilite = 'uk-visible@m';
        this.messageClass = 'uk-alert-danger';
        this.message = data.message;
        this.processing = false;
        this.enableForm();
      } else {
        this.visibilitee = 'uk-visible@m';
        this.authService.storeUserData(data.token, data.user);
        setTimeout(() => {
          if (this.previousUrl) {
            this.router.navigate([this.previousUrl]);
          } else {
            this.router.navigate(['/dashboard']);
          }
        }, 2000);
      }
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private authGuard: AuthGuard
  ) {
    this.createForm();
  }

  ngOnInit() {
    if (this.authGuard.rediretUrl) {
      this.visibilite = 'uk-visible@m';
      this.messageClass = 'uk-alert-danger';
      this.message = 'Vous devez accédez à votre compte pour voir cette page';
      this.previousUrl = this.authGuard.rediretUrl;
      this.authGuard.rediretUrl = undefined;
    }
  }

}
