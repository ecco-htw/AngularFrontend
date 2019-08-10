import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {ImpressumComponent} from './components/impressum/impressum.component';

/**
 * Provides routing for home page and impressum
 */
const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'impressum', component: ImpressumComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
