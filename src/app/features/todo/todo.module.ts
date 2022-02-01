import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { ListingComponent } from './components/listing/listing.component';
import { AddComponent } from './components/add/add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GraphComponent } from './components/graph/graph.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChartsModule } from 'ng2-charts';
import { TrendComponent } from './components/trend/trend.component';
import { AlarmComponent } from './components/alarm/alarm.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SensorReportsComponent } from './components/sensor-reports/sensor-reports.component';
import { DatePipe } from '@angular/common';
import {NgxSpinnerModule} from 'ngx-spinner';
import { AreaComponent } from './components/area/area.component';

@NgModule({
  declarations: [ListingComponent, AddComponent, GraphComponent, TrendComponent, AlarmComponent, SensorReportsComponent, AreaComponent],
  imports: [
    NgxPaginationModule,
    CommonModule,
    ReactiveFormsModule,
    TodoRoutingModule,
    SharedModule,
    ChartsModule,
    NgxSpinnerModule
  ],
  exports: [ListingComponent, AddComponent, AlarmComponent, GraphComponent, TrendComponent, SensorReportsComponent],
  providers: [DatePipe]
})
export class TodoModule { }
