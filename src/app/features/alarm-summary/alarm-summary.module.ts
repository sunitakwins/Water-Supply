import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlarmSummaryRoutingModule } from './alarm-summary-routing.module';
import { AlarmSummaryComponent } from './components/alarm-summary/alarm-summary.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutModule } from './../../layout/layout.module';


@NgModule({
  declarations: [
    AlarmSummaryComponent
  ],
  imports: [
  CommonModule,
    SharedModule,
    AlarmSummaryRoutingModule,
    LayoutModule
  ]
})
export class AlarmSummaryModule { }
