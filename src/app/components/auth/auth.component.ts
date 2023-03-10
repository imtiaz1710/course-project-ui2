import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup;
  registrationForm: FormGroup;
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.initForms();
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmitLoginForm() {
    this.isLoading = true;
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.authService.login(email, password).subscribe(
      resData => {
        if(!!resData?.error){

        }
        else{
          this.isLoading = false;
          this.router.navigate(['/']);
        }
      },
      errorMessage => {
        this.error = errorMessage?.error?.non_field_errors.toString();
        this.isLoading = false;
      }
    );
    this.loginForm.reset();
  }

  onSubmitRegistrationForm() {
    this.isLoading = true;
    const email = this.registrationForm.value.email;
    const first_name = this.registrationForm.value.first_name;
    const last_name = this.registrationForm.value.last_name;
    const password = this.registrationForm.value.password;
    const confirmPassword = this.registrationForm.value.confirmPassword;
    
    if (password !== confirmPassword) {
      this.error = 'Passwords do not match';
      this.isLoading = false;
      return;
    }

    this.authService.register(email,first_name, last_name, password, confirmPassword).subscribe(
      resData => {
        if(!!resData?.errors){
          this.error = 'Please input valid data'
        }else{
          this.isLoading = false;
          this.router.navigate(['/']);
          this.authService.isLogIn$.next(true);
        }
      },
      errorMessage => {
        this.error = [...errorMessage?.error?.password, ...errorMessage?.error?.email].toString();
        this.isLoading = false;
      }
    );
    this.registrationForm.reset();
  }

  private initForms() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
  }
}
