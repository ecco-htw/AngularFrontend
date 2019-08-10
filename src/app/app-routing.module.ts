import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import * as path from 'path';

const routes: Routes = [
  {
    path: '',
    loadChildren: './pages/pages.module#PagesModule'
  },
  {
    path: 'map',
    loadChildren: './buoys-map/buoys-map.module#BuoysMapModule'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
