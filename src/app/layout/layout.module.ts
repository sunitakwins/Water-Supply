import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationLayoutComponent, MainLayoutComponent } from './layouts';

import { MainHeaderComponent } from './header';
import { MainSidebarComponent } from './sidebar';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    MainHeaderComponent,
    MainSidebarComponent,
    MainLayoutComponent, 
    AuthenticationLayoutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ], 
  exports : [
    MainLayoutComponent, 
    AuthenticationLayoutComponent,
  ]
})
export class LayoutModule { }
