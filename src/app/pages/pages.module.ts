import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './components/home/home.component';
import { ImpressumComponent } from './components/impressum/impressum.component';

@NgModule({
  declarations: [HomeComponent, ImpressumComponent],
  imports: [
    CommonModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
