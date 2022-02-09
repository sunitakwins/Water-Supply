import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PointCompareRoutingModule } from './point-compare-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PointCompareComponent } from './components/point-compare/point-compare.component';


@NgModule({
  declarations: [
    PointCompareComponent
  ],
  imports: [
    CommonModule,
    PointCompareRoutingModule,
    SharedModule
  ]
})
export class PointCompareModule { }
