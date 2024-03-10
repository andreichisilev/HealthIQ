import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';

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
  percent = 0;
  user = {
    name: 'John Doe',
    email: 'test@gmail.com',
  };

  cards = [1, 2, 3, 4];
  card_index = 0;

  constructor(private router: Router) {}

  increase() {
    this.percent += 10;
    if (this.percent > 100) {
      this.percent = 100;
    }
  }

  decrease() {
    this.percent -= 10;
    if (this.percent < 0) {
      this.percent = 0;
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
