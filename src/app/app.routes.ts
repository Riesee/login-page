import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomePageComponent } from './home-page/home-page.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: '', pathMatch:"full", redirectTo:"login"},
    {path: 'register', component: RegisterComponent},
    {path: 'home', component: HomePageComponent},
];
