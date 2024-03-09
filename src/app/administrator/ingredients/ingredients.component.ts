import { Component } from '@angular/core';
import { AmenuComponent } from '../amenu/amenu.component';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';
import { Ingredient } from '../../../_core/models/Ingredient';

@Component({
  selector: 'app-ingredients',
  standalone: true,
  imports: [AmenuComponent, NzAvatarModule,
    NzCardModule,
    NzIconModule,
    CommonModule,],
  templateUrl: './ingredients.component.html',
  styleUrl: './ingredients.component.scss'
})
export class IngredientsComponent {
  ingredients: Ingredient[] = [];

  ngOnInit() {
    for (let i = 0; i < 5; i++) {
      this.ingredients.push({
        idIngredient: i,
        ingredient_Name: 'Ingredient' + i,
        idIngredientType: 1,
        caloriesNOPer100g: 100,
        proteinNoPer100g: 100,
        carboNoPer100g: 100,
        fatsNoPer100g: 100
      });
    }
  }
}
