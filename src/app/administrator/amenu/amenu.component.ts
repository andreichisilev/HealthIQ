import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'app-amenu',
  standalone: true,
  imports: [
    NzCollapseModule,
    NzIconModule,
    NzListModule,
    NzButtonModule,
    NzCalendarModule,
    NzCollapseModule,
    NzIconModule,
    NzMenuModule,
    NzToolTipModule,
  ],
  templateUrl: './amenu.component.html',
  styleUrl: './amenu.component.scss',
})
export class AmenuComponent {
  isCollapsed = false;
  selected0 = false;
  selected1 = false;
  selected2 = false;
  selected3 = false;

  constructor(private router: Router) {}

  ngOnInit() {
    var url = this.router.url;
    if (url.includes('categories')) this.selected0 = true;
    else if (url.includes('diseases')) this.selected1 = true;
    else if (url.includes('ingredients')) this.selected2 = true;
    else if (url.includes('recipes')) this.selected3 = true;
  }

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  goToCategories() {
    this.router.navigate(['/administrator/categories']);
  }

  goToDiseases() {
    this.router.navigate(['/administrator/diseases']);
  }

  goToIngredients() {
    this.router.navigate(['/administrator/ingredients']);
  }

  goToRecipes() {
    this.router.navigate(['/administrator/recipes']);
  }
}
