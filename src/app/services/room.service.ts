import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private baseUrl = 'http://127.0.0.1:8000';
  private authTokenKey = 'auth_token';

  constructor(private http: HttpClient) { }

  createRoom(topic: string, name: string, description: string): Observable<any> {
    const authToken = localStorage.getItem(this.authTokenKey);
    const headers = new HttpHeaders({
      'Authorization': `token ${authToken}`
    });

    const url = `${this.baseUrl}/create-room`;
    const body = { topic, name, description };
    return this.http.post(url, body, { headers });
  }
}
