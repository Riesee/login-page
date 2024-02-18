import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { RegisterModel } from '../models/register-form.interface';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, MatInputModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  isLogin: boolean = false;
  constructor(private _router: Router, private _loginService: LoginService){}
  loginForm = new FormGroup({
      email : new FormControl("",[Validators.required, Validators.minLength(5), Validators.email]),
      password : new FormControl("",[Validators.required, Validators.minLength(8)]),
},)

  isDisableForFormGroup():boolean{
    return !this.loginForm.valid;
  }

  goToRegister(): void{
    this._router.navigateByUrl("/register");
  }

  login(){
    const users:RegisterModel[] = this._loginService.getUsers();
    users.forEach(user =>{
      if(user.email === this.loginForm.get("email")?.value && user.password === this.loginForm.get("password")?.value){
        console.log("başarılı");
        this._loginService.login(this.loginForm.value);
        this.isLogin = true;
        this._router.navigateByUrl("/home");
      }
    })
    if (!this.isLogin){
      window.alert("Böyle bir kullanıcı bulunmamaktadır.")
    }
    this.isLogin = false;
  }
}
