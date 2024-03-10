import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCardModule } from 'ng-zorro-antd/card';

import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { Recipe } from '../../../_core/models/Recipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-userrecipes',
  standalone: true,
  imports: [
    NzDropDownModule,
    NzFormModule,
    NzIconModule,
    NzLayoutModule,
    NzProgressModule,
    NzCardModule,
    NzAvatarModule,
    CommonModule,
  ],
  templateUrl: './userrecipes.component.html',
  styleUrl: './userrecipes.component.scss',
})
export class UserrecipesComponent {
  constructor(private router: Router) {}
  recipes: Recipe[] = [];

  ngOnInit(): void {
    for (let i = 0; i < 10; i++) {
      this.recipes.push({
        idRecipe: i,
        recipeName: 'Recipe' + i,
        recipeInstructions: 'Instructions' + i,
        cookingTime: 10,
        photo_URL: '',
        idUser: 0,
      });
    }
  }

  goToHome() {
    this.router.navigate(['/main/home']);
  }

  goToWellness() {
    this.router.navigate(['/main/wellness']);
  }

  logout() {
    this.router.navigate(['auth/login']);
    localStorage.removeItem('UserId');
  }
}
