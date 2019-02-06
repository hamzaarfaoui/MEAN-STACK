import { ProfileComponent } from './components/profile/profile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { BlogComponent } from './components/blog/blog.component';
import { AuthGuard } from './auth/auth.guard';
import { NotAuthGuard } from './auth/not-auth.guard';


const routes: Routes = [
  {
    path : '',
    component : HomeComponent
  },
  {
    path : 'dashboard',
    component : DashboardComponent,
    canActivate : [AuthGuard]
  },
  {
    path : 'blog',
    component : BlogComponent,
    canActivate : [NotAuthGuard]
  },
  {
    path : 'register',
    component : RegisterComponent,
    canActivate : [NotAuthGuard]
  },
  {
    path : 'login',
    component : LoginComponent,
    canActivate : [NotAuthGuard]
  },
  {
    path : 'profile',
    component : ProfileComponent,
    canActivate : [AuthGuard]
  },
  {
    path : '**',
    component : PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
