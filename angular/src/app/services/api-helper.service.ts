import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from '../../env/env';

@Injectable({
  providedIn: 'root',
})
export class ApiHelperService {
  apiUrl = env.BaseUrl;
  constructor(private api: HttpClient) {}

  createOne(route: string, formdata: any): Observable<any> {
    return this.api.post(`${this.apiUrl}/${route}`, formdata);
  }

  getAll(route: string, params?: any): Observable<any> {
    return this.api.get(`${this.apiUrl}/${route}`, { params });
  }

  getById(route: string, id: any): Observable<any> {
    return this.api.get(`${this.apiUrl}/${route}/${id}`);
  }

  updateById(route: string, id: any, formdata: any): Observable<any> {
    return this.api.put(`${this.apiUrl}/${route}/${id}`, formdata);
  }

  deleteById(route: string, id: any): Observable<any> {
    return this.api.delete(`${this.apiUrl}/${route}/${id}`);
  }
}
