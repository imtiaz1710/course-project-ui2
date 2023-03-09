import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';

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

  getRooms(): Observable<any> {
    const url = `${this.baseUrl}/rooms`;
    return this.http.get(url);
  }

  getRoomsByTopic(topic: string): Observable<any> {
    const url = `${this.baseUrl}/search?topic=${topic}`;
    return this.http.get(url);
  }

  getRoomDetailsById(id: string): Observable<any> {
    const url = `${this.baseUrl}/room-detail/${id}`;
    return this.http.get(url);
  }

  commentRoom(roomId: string, comment: string): Observable<any> {
    const url = `${this.baseUrl}/room/${roomId}/comment`;
    const authToken = localStorage.getItem(this.authTokenKey);
    const headers = new HttpHeaders({
      'Authorization': `token ${authToken}`
    });

    const body = { body: comment };

    return this.http.post(url, body, { headers });
  }

  getRoomsBySerachText(text: string): Observable<any> {
    const url = `${this.baseUrl}/search?search=${text}`;
    return this.http.get(url);
  }

  editRoom(roomId: string, name: string, description: string, topic: string): Observable<any> {
    const authToken = localStorage.getItem(this.authTokenKey);
    const headers = new HttpHeaders({
      'Authorization': `token ${authToken}`
    });

    const body = { topic, name, description };
    const url = `${this.baseUrl}/room-update/${roomId}`;
    return this.http.put(url, body, { headers });
  }

  deleteRoom(roomId: string): Observable<any> {
    const url = `${this.baseUrl}/delete-room/${roomId}`;
    const authToken = localStorage.getItem(this.authTokenKey);
    const headers = new HttpHeaders({
      'Authorization': `token ${authToken}`
    });

    const body = { };

    return this.http.post(url, body, { headers });
  }
}
