import { Component } from '@angular/core';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Router } from '@angular/router';
import { NzCardModule } from 'ng-zorro-antd/card';
import { CommonModule } from '@angular/common';
import { MainService } from '../../../_core/services/main.service';

@Component({
  selector: 'app-exercices',
  standalone: true,
  imports: [
    NzIconModule,
    NzLayoutModule,
    NzDropDownModule,
    NzFormModule,
    NzProgressModule,
    NzButtonModule,
    NzCardModule,
    CommonModule,
  ],
  templateUrl: './exercices.component.html',
  styleUrl: './exercices.component.scss',
})
export class ExercicesComponent {
  constructor(private router: Router, private mainService: MainService) {}
  exercices = [];

  ngOnInit(): void {
    this.mainService.getExercices().subscribe({
      next: (response) => {
        this.exercices = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  goToHome() {
    this.router.navigate(['/main/home']);
  }

  goToMeals() {
    this.router.navigate(['/main/recipes']);
  }

  goToWellness() {
    this.router.navigate(['/main/wellness']);
  }

  goToExercises() {
    this.router.navigate(['/main/exercises']);
  }

  goToWorkouts() {
    this.router.navigate(['/main/workouts']);
  }

  logout() {
    this.router.navigate(['auth/login']);
    localStorage.removeItem('UserId');
  }
}
