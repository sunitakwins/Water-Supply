import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from 'src/app/layout/layouts';
import { AlarmComponent } from './components/alarm/alarm.component';
import { GraphComponent } from './components/graph/graph.component';
import { SensorReportsComponent } from './components/sensor-reports/sensor-reports.component';
import { TrendComponent } from './components/trend/trend.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: "alarm-summaryy",
        pathMatch: "full"
      },
      {
        path: 'alarm-summaryy',
        component: AlarmComponent
      },
      {
        path: 'point-detailn',
        component: GraphComponent
      },
      {
        path: 'trendd',
        component: TrendComponent
      },
      {
        path: 'reportss',
        component: SensorReportsComponent
      },
    ]
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule { }
