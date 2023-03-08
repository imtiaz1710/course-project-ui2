import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private baseUrl = 'http://127.0.0.1:8000';
  private authTokenKey = 'auth_token';

  constructor(private http: HttpClient) { }

  getRecentActivities(): Observable<any> {
    const url = `${this.baseUrl}/recent-activities`;
    return this.http.get(url);
  }

  getProfile(id): Observable<any> {
    const url = `${this.baseUrl}/profile/${id}`;
    return this.http.get(url);
  }

  updateProfile(id, profile: any): Observable<any> {
    const authToken = localStorage.getItem(this.authTokenKey);
    const headers = new HttpHeaders({
      'Authorization': `token ${authToken}`
    });
    
    const url = `${this.baseUrl}/profile/${id}/update`;
    return this.http.put(url, profile, { headers });
  }
}
