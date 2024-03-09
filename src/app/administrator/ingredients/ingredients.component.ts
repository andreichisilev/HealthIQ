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
import { AdministratorService } from '../../../_core/services/administrator.service';
import { IngredientType } from '../../../_core/models/IngredientType';

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
  ingredientTypes: IngredientType[] = [];

  inputAddValue: string = '';

  addIngredient: Ingredient = {
    idIngredient: 0,
    ingredientName: '',
    ingredientType: '',
    caloriesNOPer100g: 0,
    proteinNoPer100g: 0,
    carboNoPer100g: 0,
    fatsNoPer100g: 0,
  };

  editIngredient: Ingredient;

  inputAddDisabled: boolean = true;
  inputEditDisabled: boolean = true;

  constructor(
    private modal: NzModalService,
    private adminService: AdministratorService
  ) {}

  ngOnInit() {
    this.adminService.getIngredientTypes().subscribe({
      next: (response) => {
        this.ingredientTypes = response;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.adminService.getIngredients().subscribe({
      next: (response) => {
        this.ingredients = response;
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
    this.editIngredient = ingredient;
  }

  handleAddOk(): void {
    this.isAddVisible = false;

    this.adminService.addIngredient(this.addIngredient).subscribe({
      next: (response) => {
        this.ingredients.push(this.addIngredient);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  handleEditOk(): void {
    this.isEditVisible = false;

    this.adminService.editIngredient(this.editIngredient).subscribe({
      next: (response) => {
        for (let i = 0; i < this.ingredients.length; i++) {
          if (
            this.ingredients[i].idIngredient == this.editIngredient.idIngredient
          ) {
            this.ingredients[i] = this.editIngredient;
            break;
          }
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
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

  showDeleteConfirm(idIngridient): void {
    this.modal.confirm({
      nzTitle: 'Are you sure you want to delete this ingredient?',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () =>
        this.adminService.deleteIngredient(idIngridient).subscribe({
          next: (response) => {
            for (let i = 0; i < this.ingredients.length; i++) {
              if (this.ingredients[i].idIngredient == idIngridient) {
                this.ingredients.splice(i, 1);
                break;
              }
            }
          },
          error: (error) => {
            console.log(error);
          },
        }),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel'),
    });
  }
}
