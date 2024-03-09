import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinishRegisterComponent } from './finish-register/finish-register.component';
import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [
  {
    path: 'finish/register',
    component: FinishRegisterComponent,
  },
  {
    path: 'home',
    component: MainPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
