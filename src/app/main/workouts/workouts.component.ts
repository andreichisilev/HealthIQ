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
import { Workout } from '../../../_core/models/Workout';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzPopoverModule } from 'ng-zorro-antd/popover';

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
    NzStepsModule,
    NzDividerModule,
  ],
  templateUrl: './workouts.component.html',
  styleUrl: './workouts.component.scss',
})
export class WorkoutsComponent {
  constructor(private router: Router, private mainService: MainService) {}

  workouts: Workout[] = [];
  workoutSplits: String[][] = [];
  index = 0;
  disable = false;

  ngOnInit(): void {
    this.mainService
      .getWorkoutPlan(parseInt(localStorage.getItem('UserId')))
      .subscribe({
        next: (response) => {
          this.workouts = response;
          for (let i = 0; i < this.workouts.length; i++) {
            this.workoutSplits.push(
              this.workouts[i].exercise_Details.split(';')
            );
          }
          console.log(this.workoutSplits);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  handleWorkout(workout) {
    var workoutSplit = workout.split(';');
    console.log(workoutSplit);
  }

  onIndexChange(index: number): void {
    this.index = index;
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
