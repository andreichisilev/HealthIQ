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

@Component({
  selector: 'app-workouts',
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
  templateUrl: './workouts.component.html',
  styleUrl: './workouts.component.scss',
})
export class WorkoutsComponent {
  constructor(private router: Router) {}

  workouts = [
    {
      name: 'Chest',
      description: 'Chest workouts',
      image:
        'https://www.verywellfit.com/thmb/7oBc8X2U4jXyq3w6RcJkDlY0bJ0=/1500x1000/filters:fill(FFDB5D,1)/squats-58a6a2c15f9b58a3c9c3a5e3.jpg',
    },
    {
      name: 'Legs',
      description: 'Leg workouts',
      image:
        'https://www.verywellfit.com/thmb/0RQsLmQpV5w6lXJ4t5ZJ5e3Z8Y0=/1500x1000/filters:fill(FFDB5D,1)/lunge-58a6a2b95f9b58a3c9c3a4e0.jpg',
    },
    {
      name: 'Back',
      description: 'Back workouts',
      image:
        'https://www.verywellfit.com/thmb/8DZ4QrLzPcX4c3sY6j4k4dJQq4w=/1500x1000/filters:fill(FFDB5D,1)/pullup-58a6a2b95f9b58a3c9c3a4e2.jpg',
    },
    {
      name: 'Shoulders',
      description: 'Shoulder workouts',
      image:
        'https://www.verywellfit.com/thmb/8DZ4QrLzPcX4c3sY6j4k4dJQq4w=/1500x1000/filters:fill(FFDB5D,1)/pullup-58a6a2b95f9b58a3c9c3a4e2.jpg',
    },
    {
      name: 'Arms',
      description: 'Arm workouts',
      image:
        'https://www.verywellfit.com/thmb/8DZ4QrLzPcX4c3sY6j4k4dJQq4w=/1500x1000/filters:fill(FFDB5D,1)/pullup-58a6a2b95f9b58a3c9c3a4e2.jpg',
    },
  ];

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
