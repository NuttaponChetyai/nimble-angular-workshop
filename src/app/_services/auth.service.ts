import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRes } from '../models/response/LoginRes';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const AUTH_API = 'https://training-homework.calllab.net/v1/';

@Injectable({
  providedIn: 'root'
})



export class AuthService {

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<LoginRes> {
    return this.http.post<LoginRes>(
      AUTH_API + 'login',
      {
        username,
        password,
      },
      httpOptions
    );
  }
}
