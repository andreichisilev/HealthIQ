import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

@Component({
  selector: 'app-wellness',
  standalone: true,
  imports: [NzDropDownModule, NzFormModule, NzIconModule, NzLayoutModule],
  templateUrl: './wellness.component.html',
  styleUrl: './wellness.component.scss',
})
export class WellnessComponent {
  weight = 'assets/dumbell-solid.svg';

  constructor(private router: Router) {}

  goToHome() {
    this.router.navigate(['/main/home']);
  }

  goToWellness() {
    this.router.navigate(['/main/wellness']);
  }
}
