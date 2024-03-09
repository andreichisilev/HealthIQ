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
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );
    return this.httpClient.delete(this.serverUrl + '/Disease/DeleteDisease', {
      headers: headers,
      body: body,
    });
  }

  addIngredient(body): Observable<any> {
    return this.httpClient.post(
      this.serverUrl + '/Ingredient/AddIngredient',
      body
    );
  }

  getIngredients(): Observable<any> {
    return this.httpClient.get(this.serverUrl + '/Ingredient/GetIngredients');
  }

  editIngredient(body): Observable<any> {
    return this.httpClient.patch(
      this.serverUrl + '/Ingredient/UpdateIngredient',
      body
    );
  }

  deleteIngredient(id): Observable<any> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );
    return this.httpClient.delete(
      this.serverUrl + '/Ingredient/DeleteIngredient',
      {
        headers: headers,
        body: id,
      }
    );
  }

  addRecipe(body): Observable<any> {
    return this.httpClient.post(this.serverUrl + '/Recipe/AddRecipes', body);
  }

  getRecipes(): Observable<any> {
    return this.httpClient.get(this.serverUrl + '/Recipe/GetRecipes');
  }

  editRecipe(body): Observable<any> {
    return this.httpClient.patch(
      this.serverUrl + '/Recipe/UpdateRecipes',
      body
    );
  }

  deleteRecipe(id): Observable<any> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );
    return this.httpClient.delete(this.serverUrl + '/Recipe/DeleteRecipe', {
      headers: headers,
      body: id,
    });
  }
}
