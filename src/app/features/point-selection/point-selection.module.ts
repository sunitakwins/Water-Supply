import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PointSelectionRoutingModule } from './point-selection-routing.module';
import { PointSelectionComponent } from './components/point-selection/point-selection.component';
import { GraphicalViewComponent } from './components/point-selection/graphical-view/graphical-view.component';
import { ListViewComponent } from './components/point-selection/list-view/list-view.component';
import { AlarmSettingsComponent } from './components/point-selection/alarm-settings/alarm-settings.component';
import { MaintenanceSettingsComponent } from './components/point-selection/maintenance-settings/maintenance-settings.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutModule } from './../../layout/layout.module';


@NgModule({
  declarations: [
    PointSelectionComponent,
    GraphicalViewComponent,
    ListViewComponent,
    AlarmSettingsComponent,
    MaintenanceSettingsComponent
  ],
  imports: [
  CommonModule,
    SharedModule,
    PointSelectionRoutingModule,
    LayoutModule 
  ]
})
export class PointSelectionModule { }
