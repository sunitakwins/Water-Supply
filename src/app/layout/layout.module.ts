import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationLayoutComponent, MainLayoutComponent } from './layouts';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MainLayoutComponent, 
    AuthenticationLayoutComponent,
  ], 
  exports : [
    MainLayoutComponent, 
    AuthenticationLayoutComponent,
  ]
})
export class LayoutModule { }
