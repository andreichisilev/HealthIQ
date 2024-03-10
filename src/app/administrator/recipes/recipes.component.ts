import { Component } from '@angular/core';
import { AmenuComponent } from '../amenu/amenu.component';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../../_core/models/Recipe';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { AdministratorService } from '../../../_core/services/administrator.service';
import { Ingredient } from '../../../_core/models/Ingredient';
import { NzDividerModule } from 'ng-zorro-antd/divider';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [
    AmenuComponent,
    NzAvatarModule,
    NzCardModule,
    NzIconModule,
    CommonModule,
    NzModalModule,
    NzInputModule,
    NzInputNumberModule,
    NzSelectModule,
    NzButtonModule,
    FormsModule,
    NzDividerModule,
  ],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss',
})
export class RecipesComponent {
  recipes: Recipe[] = [];
  ingredients: Ingredient[] = [];

  selectedIngredients: Ingredient[] = [];
  selectedIngredientMasses: string[] = [];

  ingredientMasses = [];

  addRecipe: Recipe = {
    idRecipe: 0,
    recipeName: '',
    recipeInstructions: '',
    cookingTime: null,
    photo_URL: '',
    idUser: null,
  };
  editRecipe: Recipe;

  isNotSelectedIngredientMass(value: string): boolean {
    return this.selectedIngredientMasses.indexOf(value) === -1;
  }

  constructor(private adminService: AdministratorService) {}

  isNotSelected(value: string): boolean {
    for (let i = 0; i < this.ingredients.length; i++) {
      if (this.ingredients[i].ingredientName === value) {
        return true;
      }
    }
    return false;
  }

  inputAddValue: string = '';

  inputAddDisabled: boolean = true;
  inputEditDisabled: boolean = true;

  ngOnInit() {
    this.adminService.getIngredients().subscribe({
      next: (response) => {
        this.ingredients = response;
      },
      error: (error) => {},
    });

    this.adminService.getRecipes().subscribe({
      next: (response) => {
        this.recipes = response;
      },
      error: (error) => {
        console.log(error);
      },
    });

    for (let i = 1; i <= 50; i++) {
      this.ingredientMasses.push(i * 10);
    }
  }

  isAddVisible = false;
  isEditVisible = false;

  showAddModal(): void {
    this.isAddVisible = true;
  }

  showEditModal(ingredient) {
    this.isEditVisible = true;
    //this.editIngredient = ingredient;
  }

  handleAddOk(): void {
    this.isAddVisible = false;

    this.addRecipe.photo_URL = this.addRecipe.photo_URL.substring(
      this.addRecipe.photo_URL.indexOf('\\' + 1)
    );

    this.adminService.addRecipe(this.addRecipe).subscribe({
      next: (response) => {
        for (let i = 0; i < this.ingredients.length; i++) {
          const payload = {
            idRecipe: response.id,
            idIngredient: this.selectedIngredients[i].idIngredient,
            grams: this.selectedIngredientMasses[i],
          };

          this.adminService.addRecipeIngredient(payload).subscribe({
            next: (response) => {},
            error: (error) => {
              console.log(error);
            },
          });
        }
      },
      error: (error) => {
        console.log(error);
      },
    });

    console.log(this.addRecipe);
    console.log(this.selectedIngredients);
    console.log(this.selectedIngredientMasses);
  }

  handleEditOk(): void {
    this.isEditVisible = false;
  }

  handleAddCancel(): void {
    this.isAddVisible = false;
  }

  handleEditCancel(): void {
    this.isEditVisible = false;
  }

  onChangeAddValue() {
    this.inputAddDisabled = false;
  }

  onChangeEditValue() {
    this.inputEditDisabled = false;
  }
}
