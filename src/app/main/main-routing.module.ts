import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinishRegisterComponent } from './finish-register/finish-register.component';
import { MainPageComponent } from './main-page/main-page.component';
import { WellnessComponent } from './wellness/wellness.component';
import { UserrecipesComponent } from './userrecipes/userrecipes.component';
import { ExercicesComponent } from './exercices/exercices.component';
import { WorkoutsComponent } from './workouts/workouts.component';
const routes: Routes = [
  {
    path: 'finish/register',
    component: FinishRegisterComponent,
  },
  {
    path: 'home',
    component: MainPageComponent,
  },
  {
    path: 'wellness',
    component: WellnessComponent,
  },
  {
    path: 'recipes',
    component: UserrecipesComponent,
  },
  {
    path: 'exercises',
    component: ExercicesComponent,
  },
  {
    path: 'workouts',
    component: WorkoutsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
