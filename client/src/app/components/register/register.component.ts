import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

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

  onRegisterSubmit() {
    console.log(this.form);
  }
  validateEmail(controls) {
    // tslint:disable-next-line:max-line-length
    const regExp = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
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

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }



  ngOnInit() {
  }

}
