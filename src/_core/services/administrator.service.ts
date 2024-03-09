import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdministratorService {
  private readonly serverUrl = '';
  constructor(private httpClient: HttpClient) {}

  addIngredientType(body): Observable<any> {
    return this.httpClient.post(this.serverUrl, body);
  }

  editIngredientType(body): Observable<any> {
    return this.httpClient.put(this.serverUrl, body);
  }

  deleteIngredientType(id): Observable<any> {
    //return this.httpClient.post(this.serverUrl);
    return null;
  }

  addDisease(body): Observable<any> {
    return this.httpClient.post(this.serverUrl, body);
  }

  editDisease(body): Observable<any> {
    return this.httpClient.put(this.serverUrl, body);
  }

  deleteDisease(body): Observable<any> {
    //return this.httpClient.delete();
    return null;
  }

  addIngredient(body): Observable<any> {
    return this.httpClient.post(this.serverUrl, body);
  }

  editIngredient(body): Observable<any> {
    return this.httpClient.put(this.serverUrl, body);
  }

  deleteIngredient(body): Observable<any> {
    //return this.httpClient.delete();
    return null;
  }
}
