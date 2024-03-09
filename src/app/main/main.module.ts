import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router, RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [CommonModule, MainRoutingModule, FontAwesomeModule, RouterModule],
})
export class MainModule {}
