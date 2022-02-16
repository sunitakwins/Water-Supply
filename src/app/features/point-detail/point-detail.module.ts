import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutModule } from './../../layout/layout.module';
import { MaintenanceSettingsComponent } from './components/point-detail/maintenance-settings/maintenance-settings.component';
import { AlarmSettingsComponent } from './components/point-detail/alarm-settings/alarm-settings.component';
import { ListViewComponent } from './components/point-detail/list-view/list-view.component';
import { GraphicalViewComponent } from './components/point-detail/graphical-view/graphical-view.component';
import { PointDetailRoutingModule } from './point-detail-routing.module';
import { PointDetailComponent } from './components/point-detail/point-detail.component';


@NgModule({
  declarations: [
    PointDetailComponent,
    GraphicalViewComponent,
    ListViewComponent,
    AlarmSettingsComponent,
    MaintenanceSettingsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PointDetailRoutingModule,
    LayoutModule 
  ]
})
export class PointDetailModule { }
