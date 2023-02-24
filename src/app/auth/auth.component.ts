import { Component, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponse, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string = null;
  @ViewChild('f') myForm: NgModel;

  constructor(private authService: AuthService, private router: Router) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    if (!this.myForm.valid) return;
    const values = this.myForm.value;

    this.isLoading = true;

    let authObs: Observable<AuthResponse>;

    if (this.isLoginMode) {
      authObs = this.authService.login(values.email, values.password);
    } else {
      authObs = this.authService.signup(values.email, values.password);
    }

    authObs.subscribe(
      (resData) => {
        this.isLoading = false;
        console.log(resData);
        this.router.navigate(['/recipes']);
      },
      (errorMsg) => {
        console.log(errorMsg);
        this.isLoading = false;
        this.error = errorMsg;
      }
    );

    this.myForm.reset();
  }

  onClose() {
    this.error = null;
  }
}
