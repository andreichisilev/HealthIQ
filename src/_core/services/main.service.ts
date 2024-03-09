import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  private readonly serverUrl = 'https://localhost:7150/api';

  constructor(private httpClient: HttpClient) {}

  updateUserInfo(body): Observable<any> {
    return this.httpClient.patch(this.serverUrl + '/User/UpdateUserInfo', body);
  }
}
