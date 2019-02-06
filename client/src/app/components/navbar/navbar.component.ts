import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  onLogoutClick() {
    this.authService.logout();
    this.flashMessageService.show('Vous étes déconnecté', { cssClass: 'uk-alert-primary', timeout: 2000 });
    this.router.navigate(['/']);
  }

  constructor(
    private authService: AuthService,
     private router: Router,
     private flashMessageService: FlashMessagesService) { }

  ngOnInit() {
  }

}
