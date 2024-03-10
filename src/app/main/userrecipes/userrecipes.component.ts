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
import { AdministratorService } from '../../../_core/services/administrator.service';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RecipeIngredient } from '../../../_core/models/RecipeIngredient';
import { IngredientType } from '../../../_core/models/IngredientType';

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
    NzModalModule,
    NzButtonModule,
  ],
  templateUrl: './userrecipes.component.html',
  styleUrl: './userrecipes.component.scss',
})
export class UserrecipesComponent {
  constructor(
    private router: Router,
    private adminService: AdministratorService
  ) {}
  recipes: Recipe[] = [];
  recipesIngredients: RecipeIngredient[] = [];
  listOfCurrentIngredients: RecipeIngredient[] = [];
  ingredientTypes: IngredientType[] = [];

  isVisible: boolean = false;

  filterSelected: number = -1;

  ngOnInit(): void {
    this.adminService.getRecipes().subscribe({
      next: (response) => {
        this.recipes = response;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.adminService.getRecipesIngredients().subscribe({
      next: (response) => {
        this.recipesIngredients = response;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.adminService.getIngredientTypes().subscribe({
      next: (response) => {
        this.ingredientTypes = response;
        console.log(this.ingredientTypes);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  showModal(recipeName) {
    this.isVisible = true;

    this.listOfCurrentIngredients = [];
    for (let i = 0; i < this.recipesIngredients.length; i++) {
      if (this.recipesIngredients[i].recipeName === recipeName) {
        this.listOfCurrentIngredients.push(this.recipesIngredients[i]);
      }
    }
  }

  handleOk() {}

  handleCancel() {
    this.isVisible = false;
  }

  selectFilter(filterIndex) {
    this.filterSelected = filterIndex;
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
