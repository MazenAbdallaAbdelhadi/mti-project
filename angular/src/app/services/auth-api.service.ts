import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from '../../env/env';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  apiUrl = `${env.BaseUrl}/auth`;
  constructor(private api: HttpClient) {}

  login(body: any): Observable<any> {
    return this.api.post(`${this.apiUrl}/login`, body);
  }

  register(body: any): Observable<any> {
    return this.api.post(`${this.apiUrl}/register`, body);
  }

  logout(): Observable<any> {
    return this.api.delete(`${this.apiUrl}/logout`);
  }
}
