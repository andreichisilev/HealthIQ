import { Component } from '@angular/core';
import { AmenuComponent } from '../amenu/amenu.component';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../../_core/models/Recipe';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { AdministratorService } from '../../../_core/services/administrator.service';
import { Ingredient } from '../../../_core/models/Ingredient';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { RecipeIngredient } from '../../../_core/models/RecipeIngredient';

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
  recipesIngredients: RecipeIngredient[] = [];
  listOfCurrentIngredients: RecipeIngredient[] = [];

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

  isExpandVisible: boolean = false;

  isNotSelectedIngredientMass(value: string): boolean {
    return this.selectedIngredientMasses.indexOf(value) === -1;
  }

  constructor(
    private adminService: AdministratorService,
    private modal: NzModalService
  ) {}

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

    this.adminService.getRecipesIngredients().subscribe({
      next: (response) => {
        this.recipesIngredients = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
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

    console.log(
      this.addRecipe.photo_URL + ' ' + this.addRecipe.photo_URL.substring(12)
    );

    this.adminService.addRecipe(this.addRecipe).subscribe({
      next: (response) => {
        this.recipes.push(this.addRecipe);
        for (let i = 0; i < this.selectedIngredients.length; i++) {
          const payload = {
            idRecipe: parseInt(response),
            idIngredient: this.selectedIngredients[i],
            grams: parseInt(this.selectedIngredientMasses[i]),
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

  showExpandModal(recipeName) {
    this.isExpandVisible = true;

    this.listOfCurrentIngredients = [];

    for (let i = 0; i < this.recipesIngredients.length; i++) {
      if (this.recipesIngredients[i].recipeName === recipeName) {
        this.listOfCurrentIngredients.push(this.recipesIngredients[i]);
      }
    }
  }

  handleExpandCancel() {
    this.isExpandVisible = false;
  }

  showDeleteConfirm(idRecipe): void {
    this.modal.confirm({
      nzTitle: 'Are you sure you want to delete this recipe?',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () =>
        this.adminService.deleteRecipeWithIngredients(idRecipe).subscribe({
          next: (response) => {
            this.adminService.deleteRecipe(idRecipe).subscribe({
              next: () => {
                for (let i = 0; i < this.recipes.length; i++) {
                  if (this.recipes[i].idRecipe === idRecipe) {
                    this.recipes.splice(i, 1);
                    this.recipesIngredients.splice(i, 1);
                    break;
                  }
                }
              },
              error: (error) => {
                console.log(error);
              },
            });
          },
        }),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel'),
    });
  }
}
