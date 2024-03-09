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
import { AdministratorService } from '../../../_core/services/administrator.service';

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
  constructor(
    private modal: NzModalService,
    private adminService: AdministratorService
  ) {}

  diseases: Disease[] = [];

  inputAddValue: string = '';
  inputAddValueStored: string = '';
  inputEditValue: string = '';
  inputEditValueStored: string = '';
  inputIdValueStored: number;
  inputAddDisabled: boolean = true;
  inputEditDisabled: boolean = true;

  ngOnInit() {
    this.adminService.getDiseases().subscribe({
      next: (response) => {
        this.diseases = response;
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

  showEditModal(disease) {
    this.isEditVisible = true;
    this.inputEditValue = disease.diseaseName;
    this.inputIdValueStored = disease.idDisease;
  }

  handleAddOk(): void {
    this.isAddVisible = false;

    const payload = {
      diseaseName: this.inputAddValueStored,
    };

    this.adminService.addDisease(payload).subscribe({
      next: (response) => {
        var newDisease: Disease = {
          idDisease: 0,
          diseaseName: payload.diseaseName,
        };

        this.diseases.push(newDisease);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  handleEditOk(): void {
    this.isEditVisible = false;

    const payload = {
      idDisease: this.inputIdValueStored,
      diseaseName: this.inputEditValueStored,
    };

    this.adminService.editDisease(payload).subscribe({
      next: (response) => {
        for (let i = 0; i < this.diseases.length; i++) {
          if (this.diseases[i].idDisease == payload.idDisease) {
            this.diseases[i].diseaseName = payload.diseaseName;
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

  onChangeAddValue(event) {
    this.inputAddDisabled = false;
    this.inputAddValueStored = event.target.value;
  }

  onChangeEditValue(event) {
    this.inputEditDisabled = false;
    this.inputEditValueStored = event.target.value;
  }

  showDeleteConfirm(idDisease): void {
    this.modal.confirm({
      nzTitle: 'Are you sure you want to delete this disease?',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () =>
        this.adminService.deleteDisease(idDisease).subscribe({
          next: (response) => {
            for (let i = 0; i < this.diseases.length; i++) {
              if (this.diseases[i].idDisease == idDisease) {
                this.diseases.splice(i, 1);
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
