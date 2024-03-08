import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinishRegisterComponent } from './finish-register/finish-register.component';

const routes: Routes = [
  {
    path: 'finish/register',
    component: FinishRegisterComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
