import { Component } from '@angular/core';
import { AmenuComponent } from '../amenu/amenu.component';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';
import { Ingredient } from '../../../_core/models/Ingredient';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ingredients',
  standalone: true,
  imports: [
    AmenuComponent,
    NzAvatarModule,
    NzCardModule,
    NzIconModule,
    CommonModule,
    NzModalModule,
    NzButtonModule,
    NzInputModule,
    NzSelectModule,
    NzInputNumberModule,
    FormsModule,
  ],
  templateUrl: './ingredients.component.html',
  styleUrl: './ingredients.component.scss',
})
export class IngredientsComponent {
  ingredients: Ingredient[] = [];

  inputAddValue: string = '';

  editIngredient: Ingredient;

  inputAddDisabled: boolean = true;
  inputEditDisabled: boolean = true;

  constructor(private modal: NzModalService) {}

  ngOnInit() {
    for (let i = 0; i < 5; i++) {
      this.ingredients.push({
        idIngredient: i,
        ingredient_Name: 'Ingredient' + i,
        idIngredientType: 1,
        caloriesNOPer100g: 100,
        proteinNoPer100g: 100,
        carboNoPer100g: 100,
        fatsNoPer100g: 100,
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
    this.editIngredient = ingredient;
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

  showDeleteConfirm(): void {
    this.modal.confirm({
      nzTitle: 'Are you sure you want to delete this ingredient?',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => console.log('OK'),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel'),
    });
  }
}
