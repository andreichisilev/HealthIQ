import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministratorRoutingModule } from './administrator-routing.module';
import { FormsModule } from '@angular/forms';
import { IngredientsComponent } from './ingredients/ingredients.component';

@NgModule({
  imports: [CommonModule, AdministratorRoutingModule, FormsModule],
})
export class AdministratorModule {}
