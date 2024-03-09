import { Component } from '@angular/core';
import { AmenuComponent } from '../amenu/amenu.component';
import { IngredientType } from '../../../_core/models/IngredientType';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    AmenuComponent,
    NzAvatarModule,
    NzCardModule,
    NzIconModule,
    CommonModule,
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  ingredientTypes: IngredientType[] = [];

  ngOnInit() {
    for (let i = 0; i < 5; i++) {
      this.ingredientTypes.push({
        idIngredientType: i,
        type: 'Category' + i,
      });
    }
  }
}
