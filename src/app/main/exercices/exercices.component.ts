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
  constructor(private router: Router) {}

  exercices = [
    {
      name: 'Pushups',
      description:
        'A push-up is a common calisthenics exercise beginning from the prone position.',
      image:
        'https://i.pinimg.com/originals/6c/7c/9e/6c7c9e1b4e1d6b4e2d2f4f2f5b8b0f7d.jpg',
    },
    {
      name: 'Squats',
      description:
        'A squat is a strength exercise in which the trainee lowers their hips from a standing position and then stands back up.',
      image:
        'https://www.verywellfit.com/thmb/7oBc8X2U4jXyq3w6RcJkDlY0bJ0=/1500x1000/filters:fill(FFDB5D,1)/squats-58a6a2c15f9b58a3c9c3a5e3.jpg',
    },
    {
      name: 'Lunges',
      description:
        'A lunge can refer to any position of the human body where one leg is positioned forward with knee bent and foot flat on the ground while the other leg is positioned behind.',
      image:
        'https://www.verywellfit.com/thmb/0RQsLmQpV5w6lXJ4t5ZJ5e3Z8Y0=/1500x1000/filters:fill(FFDB5D,1)/lunge-58a6a2b95f9b58a3c9c3a4e0.jpg',
    },
    {
      name: 'Pullups',
      description:
        'A pull-up is an upper-body strength exercise. The pull-up is a closed-chain movement where the body is suspended by the hands and pulls up.',
      image:
        'https://www.verywellfit.com/thmb/8DZ4QrLzPcX4c3sY6j4k4dJQq4w=/1500x1000/filters:fill(FFDB5D,1)/pullup-58a6a2b95f9b58a3c9c3a4e2.jpg',
    },
    {
      name: 'Planks',
      description:
        'The plank is an isometric core strength exercise that involves maintaining a position similar to a push-up for the maximum possible time.',
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
