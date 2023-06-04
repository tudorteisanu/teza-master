import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {LoginService} from "./login.service";
import {RouterLinkWithHref} from "@angular/router";
import {AuthService} from "../shared/auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  isSubmitting: boolean = false;
  backendErrors: any | null = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private loginService: LoginService, private authService: AuthService) {}

  get parsedBackendErrors(): string[] {
    return Object.entries(this.backendErrors).map(([key, value]) => `${key}: ${(value as Array<any>).join(',')}`)
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      email: 'valera299299@example.com',
      password: 'valera299299@example.com',
    });
  }

  submit(): void {
    if (this.isSubmitting) {
      return;
    }

    const request: any = this.form.value;
    this.isSubmitting = true;
    this.errorMessage = null;
    this.backendErrors = null;

    this.loginService.login(request).subscribe({
      next: ({user: {token, ...data}}) => {
        this.authService.currentUser$.next(data);
        this.authService.token = token;
        localStorage.setItem('token', token);
        window.location.href = '/'
      },
      error: (error) => {
        this.isSubmitting = false;
        if (error.hasOwnProperty('error')) {
          this.backendErrors = error.error.errors;
          return;
        }

        this.errorMessage = error.message;

      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }

}
