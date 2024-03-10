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
import { MainService } from '../../../_core/services/main.service';

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
    private adminService: AdministratorService,
    private mainService: MainService
  ) {}

  recipes: Recipe[] = [];
  availableRecipes: Recipe[] = [];
  recipesIngredients: RecipeIngredient[] = [];
  listOfCurrentIngredients: RecipeIngredient[] = [];
  ingredientTypes: IngredientType[] = [];

  user = {
    firstName: '',
    lastName: '',
    points: 0,
  };

  isVisible: boolean = false;

  filterSelected: number = -1;

  ngOnInit(): void {
    this.adminService.getRecipes().subscribe({
      next: (response) => {
        this.recipes = response;
        this.availableRecipes = this.recipes;
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

  findRecipe(idRecipe) {
    for (let i = 0; i < this.recipes.length; i++) {
      if (this.recipes[i].idRecipe == idRecipe) return this.recipes[i];
    }
    return null;
  }

  recipeAlreadyAvailable(idRecipe) {
    for (let i = 0; i < this.availableRecipes.length; i++) {
      if (this.availableRecipes[i].idRecipe == idRecipe) return true;
    }
    return false;
  }

  selectFilter(filterIndex) {
    if (filterIndex == this.filterSelected && filterIndex != -1) {
      this.filterSelected = -1;
      this.availableRecipes = this.recipes;
    } else {
      this.filterSelected = filterIndex;
      this.availableRecipes = [];
      for (let i = 0; i < this.recipesIngredients.length; i++) {
        if (
          this.recipesIngredients[i].ingredientType ===
          this.ingredientTypes[this.filterSelected].ingredientType
        ) {
          if (!this.recipeAlreadyAvailable(this.recipesIngredients[i].idRecipe))
            this.availableRecipes.push(
              this.findRecipe(this.recipesIngredients[i].idRecipe)
            );
        }
      }
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
}
