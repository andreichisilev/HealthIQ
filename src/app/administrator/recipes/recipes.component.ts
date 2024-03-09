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
  ],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss',
})
export class RecipesComponent {
  recipes: Recipe[] = [];

  listOfOption = ['Apples', 'Nails', 'Bananas', 'Helicopters'];
  listOfSelectedValue: string[] = [];

  isNotSelected(value: string): boolean {
    return this.listOfSelectedValue.indexOf(value) === -1;
  }

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
