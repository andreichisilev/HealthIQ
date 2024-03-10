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

  getDailyCalories(UserId): Observable<any> {
    return this.httpClient.get(
      this.serverUrl + '/User/GetRecommendedCalorieIntake?userId=' + UserId
    );
  }

  getUserInfo(UserId): Observable<any> {
    return this.httpClient.get(
      this.serverUrl + '/User/GetUserInfo?idUser=' + UserId
    );
  }

  getWaterConsumption(UserId): Observable<any> {
    return this.httpClient.get(
      this.serverUrl + '/WaterConsumption/GetWaterConsumption/' + UserId
    );
  }

  addWaterConsumption(body): Observable<any> {
    return this.httpClient.post(
      this.serverUrl + '/WaterConsumption/AddWaterConsumption',
      body
    );
  }

  updateWaterConsumption(body): Observable<any> {
    return this.httpClient.patch(
      this.serverUrl + '/WaterConsumption/UpdateWaterConsumption',
      body
    );
  }

  getWorkoutPlan(userId): Observable<any> {
    return this.httpClient.get(
      this.serverUrl + '/WorkoutPlan/GetWorkoutPlan?idUser=' + userId
    );
  }

  getExercices(): Observable<any> {
    return this.httpClient.get(
      this.serverUrl + '/Exercise/GetExercisesJoinMuscles'
    );
  }
}
