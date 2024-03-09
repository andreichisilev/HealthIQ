import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzProgressModule } from 'ng-zorro-antd/progress';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    NzDropDownModule,
    NzFormModule,
    NzIconModule,
    NzLayoutModule,
    NzProgressModule,
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {
  percent = 0;

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

  goToWellness() {
    this.router.navigate(['/main/wellness']);
  }
}
