import { ChangeDetectorRef, Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { GlobalKeys } from '../models/global-keys.enum';
import { RegisterModel } from '../models/register-form.interface';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(private _router: Router, private _loginService: LoginService, private _cdr: ChangeDetectorRef) {}

  registerForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    passwordAgain: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    surName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  ngOnInit() {
    this._formChange();
  }

  private _formChange() {
    this.registerForm.get('password')?.valueChanges.subscribe((data) => {
      this.checkEqualsPassword();
    });
    this.registerForm.get('passwordAgain')?.valueChanges.subscribe((data) => {
      this.checkEqualsPassword();
      console.log("passsworda girdi");
      
    });
  }

  isDisableForFormGroup(): boolean {
    return !this.registerForm.valid;
  }

  goToLogin(): void {
    this._router.navigateByUrl('/login');
  }

  getFormNameInvalid(formName: string): boolean | undefined {
    return this.registerForm.get(formName)?.invalid;
  }

  getErrorMessage(formName: string): string {
    if (this.getRegisterForm(formName, 'required')) {
      return 'Zorunlu alan!';
    } else if (this.getRegisterForm(formName, 'minlength')) {
      return 'Min karakter sayısını geçiniz';
    } else if (this.getRegisterForm(formName, 'email')) {
      return 'Geçerli değer giriniz.';
    } else if (this.getRegisterForm(formName, 'maxlength')) {
      return 'Max karakter sayısını geçtiniz';
    } else if (this.getRegisterForm(formName, 'missmatch')) {
      return 'şifreler aynı değil!';
    } else return '';
  }

  getRegisterForm(formName: string, errorType: string) {
    return this.registerForm.get(formName)?.hasError(errorType);
  }



  checkEqualsPassword() {
    if (
      this.registerForm.get('password')?.value !==
      this.registerForm.get('passwordAgain')?.value
    ) {
      this.registerForm.get('password')?.setErrors({missmatch: true})
      this.registerForm.get("passwordAgain")?.setErrors({missmatch: true});
      this.registerForm.updateValueAndValidity();
      this._cdr.detectChanges();
      
    } else {
      this.registerForm.get('password')?.setErrors(null)
      this.registerForm.get("passwordAgain")?.setErrors(null)
      this.registerForm.updateValueAndValidity();
      this._cdr.detectChanges();
    }
  } 

  register() {
    const payload: RegisterModel | any = this.registerForm.value;
    this._loginService.register(payload);
  }
}
