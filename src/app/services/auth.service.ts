import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://127.0.0.1:8000/account'; // replace with your backend API URL
  private authTokenKey = 'auth_token';

  public isLogIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isAuthenticated());

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/login/`;
    const body = { username, password };
    return this.http.post(url, body).pipe(
      tap(res => {
          localStorage.setItem(this.authTokenKey, res.token);
          this.isLogIn$.next(true);
      })
    );
  }

  register(email: string, password: string, password2): Observable<any> {
    const url = `${this.baseUrl}/register/`;
    const body = { email, password, password2 };
    return this.http.post(url, body);
  }

  logout(): void {
    localStorage.removeItem(this.authTokenKey);
    this.isLogIn$.next(false);
  }

  isAuthenticated(): boolean {
    const authToken = localStorage.getItem(this.authTokenKey);
    return authToken !== null;
  }

  getAuthToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }
}
