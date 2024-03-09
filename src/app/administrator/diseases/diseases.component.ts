import { Component } from '@angular/core';
import { AmenuComponent } from '../amenu/amenu.component';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';
import { Disease } from '../../../_core/models/Disease';

@Component({
  selector: 'app-diseases',
  standalone: true,
  imports: [
    AmenuComponent,
    NzAvatarModule,
    NzCardModule,
    NzIconModule,
    CommonModule,
  ],
  templateUrl: './diseases.component.html',
  styleUrl: './diseases.component.scss',
})
export class DiseasesComponent {
  diseases: Disease[] = [];

  ngOnInit() {
    for (let i = 0; i < 5; i++) {
      this.diseases.push({
        idDisease: i,
        diseaseName: 'Disease' + i,
      });
    }
  }
}
