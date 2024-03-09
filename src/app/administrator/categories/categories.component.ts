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

  constructor(private modal: NzModalService) {}

  inputAddDisabled = true;
  inputDisabled = true;
  inputAddValue: string = '';
  inputValue: string;

  ngOnInit() {
    for (let i = 0; i < 5; i++) {
      this.ingredientTypes.push({
        idIngredientType: i,
        type: 'Category' + i,
      });
    }
  }

  isVisible = false;
  isAddVisible = false;

  showAddModal(): void {
    this.isAddVisible = true;
  }

  showModal(type): void {
    this.isVisible = true;
    this.inputValue = type;
  }

  handleAddOk(): void {
    this.isAddVisible = false;
    this.inputAddDisabled = true;
  }

  handleAddCancel(): void {
    this.isAddVisible = false;
    this.inputDisabled = true;
  }

  handleOk(): void {
    this.isVisible = false;
    this.inputDisabled = true;
  }

  handleCancel(): void {
    this.isVisible = false;
    this.inputDisabled = true;
  }

  onChangeInput(event) {
    this.inputDisabled = false;
    this.inputValue = event.target.value;
  }

  showDeleteConfirm(): void {
    this.modal.confirm({
      nzTitle: 'Are you sure you want to delete this category?',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => console.log('OK'),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel'),
    });
  }
}
