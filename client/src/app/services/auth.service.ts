import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  domain = 'http://localhost:8080';
  authToken;
  user;
  options;

  constructor(private http: HttpClient) { }

  createAuthenticationHeaders () {
    this.loadToken();
    this.options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': this.authToken
      })
    };
  }

  loadToken () {
    const token = localStorage.getItem('token');
    this.authToken = token;
  }

  registerUser(user) {
    return this.http.post(this.domain + '/authentication/register', user).pipe(catchError(e => throwError(e)));
  }

  checkUsername(username) {
    return this.http.get(this.domain + '/authentication/checkUsername/' + username).pipe(catchError(e => throwError(e)));
  }

  checkEmail(email) {
    return this.http.get(this.domain + '/authentication/checkEmail/' + email).pipe(catchError(e => throwError(e)));
  }

  login(user) {
    return this.http.post(this.domain + '/authentication/login', user).pipe(catchError(e => throwError(e)));
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  storeUserData(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  getProfile () {
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + '/authentication/profile/', this.options).pipe(catchError(e => throwError(e)));
  }

  loggedIn () {
    return tokenNotExpired();
  }

}
