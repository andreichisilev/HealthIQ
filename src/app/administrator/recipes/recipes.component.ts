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
    NzInputNumberModule,
    NzSelectModule,
  ],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss',
})
export class RecipesComponent {
  recipes: Recipe[] = [];

  inputAddValue: string = '';

  inputAddDisabled: boolean = true;
  inputEditDisabled: boolean = true;

  ngOnInit() {
    for (let i = 0; i < 5; i++) {
      this.recipes.push({
        idRecipe: i,
        recipe_name: 'Recipee' + i,
        recipe_instructions:
          'InstructionsInstructionsInstructionsInstructionsInstructionsInstructionsInstructionsInstructionsInstructions',
        cookingTime: 10,
        photo_URL: '',
        idUser: 0,
      });
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
