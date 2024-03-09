import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdministratorService {
  private readonly serverUrl = 'https://localhost:7150/api';
  constructor(private httpClient: HttpClient) {}

  addIngredientType(body): Observable<any> {
    return this.httpClient.post(
      this.serverUrl + '/IngredientType/AddIngredientType',
      body
    );
  }

  editIngredientType(body): Observable<any> {
    return this.httpClient.patch(
      this.serverUrl + '/IngredientType/UpdateIngredientType',
      body
    );
  }

  getIngredientTypes(): Observable<any> {
    return this.httpClient.get(
      this.serverUrl + '/IngredientType/GetIngredientTypes'
    );
  }

  deleteIngredientType(id): Observable<any> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );
    return this.httpClient.delete(
      this.serverUrl + '/IngredientType/DeleteIngredientType',
      { headers: headers, body: id }
    );
  }

  addDisease(body): Observable<any> {
    return this.httpClient.post(this.serverUrl + '/Disease/AddDisease', body);
  }

  getDiseases(): Observable<any> {
    return this.httpClient.get(this.serverUrl + '/Disease/GetDiseases');
  }

  editDisease(body): Observable<any> {
    return this.httpClient.patch(
      this.serverUrl + '/Disease/UpdateDisease',
      body
    );
  }

  deleteDisease(body): Observable<any> {
    return this.httpClient.delete(
      this.serverUrl + '/Disease/DeleteDisease',
      body
    );
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
