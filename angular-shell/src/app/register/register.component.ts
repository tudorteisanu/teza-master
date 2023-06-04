import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {RegisterService} from "./register.service";
import {AuthService} from "../shared/auth.service";
import {RouterLinkWithHref} from "@angular/router";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLinkWithHref],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;
  isSubmitting: boolean = false;
  backendErrors: any | null = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private registerService: RegisterService, private authService: AuthService) {}

  get parsedBackendErrors(): string[] {
    return Object.entries(this.backendErrors).map(([key, value]) => `${key}: ${(value as Array<any>).join(',')}`)
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      email: 'user@example.com',
      username: 'user',
      password: 'Light231!',
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

    this.registerService.register(request).subscribe({
      next: ({token, ...data}) => {
        this.authService.currentUser$.next(data);
        this.authService.token = token;
        localStorage.setItem('token', token);

      },
      error: (error) => {

        this.isSubmitting = false;
        console.log(error)
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
