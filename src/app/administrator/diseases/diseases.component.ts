import { Component } from '@angular/core';
import { AmenuComponent } from '../amenu/amenu.component';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';
import { Disease } from '../../../_core/models/Disease';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-diseases',
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
  ],
  templateUrl: './diseases.component.html',
  styleUrl: './diseases.component.scss',
})
export class DiseasesComponent {
  constructor(private modal: NzModalService) {}

  diseases: Disease[] = [];

  inputAddValue: string = '';
  inputEditValue: string = '';
  inputAddDisabled: boolean = true;
  inputEditDisabled: boolean = true;

  ngOnInit() {
    for (let i = 0; i < 5; i++) {
      this.diseases.push({
        idDisease: i,
        diseaseName: 'Disease' + i,
      });
    }
  }

  isAddVisible = false;
  isEditVisible = false;

  showAddModal(): void {
    this.isAddVisible = true;
  }

  showEditModal(diseaseName) {
    this.isEditVisible = true;
    this.inputEditValue = diseaseName;
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
      nzTitle: 'Are you sure you want to delete this disease?',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => console.log('OK'),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel'),
    });
  }
}
