import { Component } from '@angular/core';
import { AmenuComponent } from '../amenu/amenu.component';
import { IngredientType } from '../../../_core/models/IngredientType';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AdministratorModule } from '../administrator.module';
import { ViewChild, ElementRef } from '@angular/core';
import { AdministratorService } from '../../../_core/services/administrator.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    AmenuComponent,
    NzAvatarModule,
    NzCardModule,
    NzIconModule,
    CommonModule,
    NzModalModule,
    NzInputModule,
    NzButtonModule,
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  ingredientTypes: IngredientType[] = [];

  constructor(
    private modal: NzModalService,
    private adminService: AdministratorService
  ) {}

  inputAddDisabled = true;
  inputDisabled = true;
  inputAddValue: string = '';
  inputAddValueStored: string = '';
  inputValue: string = '';
  inputIdValueStored: number;
  inputValueStored: string = '';

  ngOnInit() {
    this.adminService.getIngredientTypes().subscribe({
      next: (response) => {
        this.ingredientTypes = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  isVisible = false;
  isAddVisible = false;

  showAddModal(): void {
    this.isAddVisible = true;
  }

  showModal(ingType): void {
    this.isVisible = true;
    this.inputValue = ingType.ingredientType;
    this.inputIdValueStored = ingType.idIngredientType;
  }

  handleAddOk(): void {
    const payload = {
      type: this.inputAddValueStored,
    };

    this.isAddVisible = false;
    this.inputAddDisabled = true;

    this.adminService.addIngredientType(payload).subscribe({
      next: (response) => {
        var newIngredientType: IngredientType = {
          idIngredientType: response.id,
          ingredientType: payload.type,
        };
        this.ingredientTypes.push(newIngredientType);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  handleAddCancel(): void {
    this.isAddVisible = false;
    this.inputAddDisabled = true;
  }

  handleOk(): void {
    this.isVisible = false;
    this.inputDisabled = true;

    const payload = {
      idIngredientType: this.inputIdValueStored,
      ingredientType: this.inputValueStored,
    };

    this.adminService.editIngredientType(payload).subscribe({
      next: (response) => {
        for (let i = 0; i < this.ingredientTypes.length; i++) {
          if (
            this.ingredientTypes[i].idIngredientType == payload.idIngredientType
          ) {
            this.ingredientTypes[i].ingredientType = payload.ingredientType;
            break;
          }
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  handleCancel(): void {
    this.isVisible = false;
    this.inputDisabled = true;
  }

  onChangeAddInput(event) {
    this.inputAddDisabled = false;
    this.inputAddValueStored = event.target.value;
  }

  onChangeInput(event) {
    this.inputDisabled = false;
    this.inputValue = event.target.value;
    this.inputValueStored = event.target.value;
  }

  showDeleteConfirm(idIngredient): void {
    this.modal.confirm({
      nzTitle: 'Are you sure you want to delete this category?',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () =>
        this.adminService.deleteIngredientType(idIngredient).subscribe({
          next: (response) => {
            for (let i = 0; i < this.ingredientTypes.length; i++) {
              if (this.ingredientTypes[i].idIngredientType == idIngredient) {
                this.ingredientTypes.splice(i, 1);
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
