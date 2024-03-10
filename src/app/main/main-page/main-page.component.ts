import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { MainService } from '../../../_core/services/main.service';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    NzDropDownModule,
    NzFormModule,
    NzIconModule,
    NzLayoutModule,
    NzProgressModule,
    NzButtonModule,
    NzCardModule,
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {
  user = {
    firstName: '',
    lastName: '',
    points: 0,
    waterGlassesToday: 0,
  };
  percent = this.user.waterGlassesToday * 10;
  dailyCalories = 0;

  cards = [1, 2, 3, 4];
  card_index = 0;

  constructor(private router: Router, private mainService: MainService) {}

  ngOnInit(): void {
    this.mainService
      .getDailyCalories(localStorage.getItem('UserId'))
      .subscribe({
        next: (response) => {
          this.dailyCalories = response[0].totalCalories;
        },
        error: (error) => {
          console.log(error);
        },
      });
    this.mainService.getUserInfo(localStorage.getItem('UserId')).subscribe({
      next: (response) => {
        this.user.firstName = response[0].firstName;
        this.user.lastName = response[0].lastName;
        this.user.points = response[0].points;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.mainService
      .getWaterConsumption(localStorage.getItem('UserId'))
      .subscribe({
        next: (response) => {
          this.user.waterGlassesToday = response[0].waterGlasses;
          console.log(this.user.waterGlassesToday);
        },
        error: (error) => {
          this.user.waterGlassesToday = 0;
          console.log(this.user.waterGlassesToday);
        },
      });
  }

  dateToString(date: Date): string {
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  }

  increase() {
    if (this.user.waterGlassesToday == 0) {
      this.user.waterGlassesToday = 1;
      this.mainService
        .addWaterConsumption({
          idUser: parseInt(localStorage.getItem('UserId')),
          waterGlassesToday: 1,
          date: this.dateToString(new Date()),
        })
        .subscribe({
          next: (response) => {
            console.log('success');
          },
          error: (error) => {
            console.log(error);
          },
        });
    } else {
      this.mainService
        .updateWaterConsumption({
          idUser: parseInt(localStorage.getItem('UserId')),
          waterGlassesToday: this.user.waterGlassesToday + 1,
          date: this.dateToString(new Date()),
        })
        .subscribe({
          next: (response) => {
            console.log('success');
          },
          error: (error) => {
            console.log(error);
          },
        });
    }

    this.percent += 10;
    this.user.waterGlassesToday++;

    if (this.percent > 100) {
      this.percent = 100;
    }
  }

  decrease() {
    this.percent -= 10;
    if (this.percent < 0) {
      this.mainService
        .updateWaterConsumption({
          idUser: localStorage.getItem('UserId'),
          waterGlassesToday: 0,
        })
        .subscribe({
          next: (response) => {
            console.log('success');
          },
          error: (error) => {
            console.log(error);
          },
        });
      this.percent = 0;
    } else {
      this.mainService
        .updateWaterConsumption({
          idUser: localStorage.getItem('UserId'),
          waterGlassesToday: this.user.waterGlassesToday - 1,
        })
        .subscribe({
          next: (response) => {
            console.log('success');
          },
          error: (error) => {
            console.log(error);
          },
        });
    }
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

  // nextCard() {
  //   if (this.card_index < this.cards.length - 1) {
  //     this.card_index++;
  //   } else {
  //     this.card_index = 0;
  //   }
  // }

  // prevCard() {
  //   if (this.card_index > 0) {
  //     this.card_index--;
  //   } else {
  //     this.card_index = this.cards.length - 1;
  //   }
  // }
}
