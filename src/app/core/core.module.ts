import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { ViewportComponent } from './components/viewport/viewport.component';
import { FooterComponent } from './components/footer/footer.component';
import {MatButtonToggleModule, MatTableModule} from '@angular/material';

@NgModule({
  imports: [
    SharedModule,
    MatButtonToggleModule,
    MatTableModule
  ],
  declarations: [HeaderComponent, ViewportComponent, FooterComponent],
  exports: [
    HeaderComponent,
    ViewportComponent,
    FooterComponent
  ]
})
export class CoreModule {
}
