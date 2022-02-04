import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlarmSummaryRoutingModule } from './alarm-summary-routing.module';
import { AlarmSummaryComponent } from './components/alarm-summary/alarm-summary.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MainDropdownComponent } from 'src/app/shared/components/main-dropdown/main-dropdown.component';


@NgModule({
  declarations: [
    AlarmSummaryComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AlarmSummaryRoutingModule,
  ]
})
export class AlarmSummaryModule { }
