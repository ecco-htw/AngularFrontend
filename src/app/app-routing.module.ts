import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import * as path from 'path';

const routes: Routes = [

    {
    path: '',
    loadChildren: './buoys-map/buoys-map.module#BuoysMapModule'
  },
  {
    path: '',
    loadChildren: './pages/pages.module#PagesModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
