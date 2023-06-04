import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser$ = new BehaviorSubject(null);
  token: string | null = null;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
    this.getCurrentUser();
  }

  getCurrentUser(): void {
    this.http.get('/user').subscribe({
      next: ({user}: any) => {
        this.currentUser$.next(user);
    }
    })
  }
}
