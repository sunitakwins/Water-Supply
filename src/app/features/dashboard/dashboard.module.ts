import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MaintenanceSettings } from './components/maintenance-settings/maintenance-settings.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ MaintenanceSettings],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
