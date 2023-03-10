import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://127.0.0.1:8000/account'; // replace with your backend API URL
  private authTokenKey = 'auth_token';

  public isLogIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isAuthenticated());

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/login/`;
    const body = { username, password };
    return this.http.post(url, body).pipe(
      tap(res => {
        localStorage.setItem(this.authTokenKey, res.token);
        localStorage.setItem('profile_id', res.profile_id);
        this.isLogIn$.next(true);
      })
    );
  }

  register(email: string, first_name: string, last_name: string, password: string, password2): Observable<any> {
    const url = `${this.baseUrl}/register/`;
    const body = { email, first_name, last_name, password, password2 };
    return this.http.post(url, body);
  }

  logout(): void {
    localStorage.removeItem(this.authTokenKey);
    this.isLogIn$.next(false);
    this.router.navigate['/'];
  }

  isAuthenticated(): boolean {
    const authToken = localStorage.getItem(this.authTokenKey);
    return authToken !== null;
  }

  getAuthToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }
}
