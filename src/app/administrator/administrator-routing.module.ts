import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { DiseasesComponent } from './diseases/diseases.component';
import { CategoriesComponent } from './categories/categories.component';
import { RecipesComponent } from './recipes/recipes.component';

const routes: Routes = [{ path: 'categories', component: CategoriesComponent },
{path: 'diseases', component: DiseasesComponent},
{path: 'ingredients', component: IngredientsComponent},
{path: 'recipes', component: RecipesComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdministratorRoutingModule {}
