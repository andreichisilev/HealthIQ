import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly serverUrl = 'https://localhost:7150/api';
  constructor(private httpClient: HttpClient) {}

  register(body): Observable<any> {
    return this.httpClient.post(this.serverUrl + '/User/RegisterUser', body);
  }

  login(body): Observable<any> {
    return this.httpClient.post(this.serverUrl + '/User/LoginUser', body);
  }
}
