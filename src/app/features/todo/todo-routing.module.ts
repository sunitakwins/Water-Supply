import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from 'src/app/layout/layouts';
import { LayoutComponent } from '../layout/layout.component';
import { AlarmComponent } from './components/alarm/alarm.component';
import { GraphComponent } from './components/graph/graph.component';
import { SensorReportsComponent } from './components/sensor-reports/sensor-reports.component';
import { TrendComponent } from './components/trend/trend.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      // {
      //   path: "",
      //   redirectTo: "point-selection",
      //   pathMatch: "full"
      // },
      {
        path: 'alarm-summary',
        component: AlarmComponent
      },
      {
        path: 'point-selection',
        component: GraphComponent
      },
      {
        path: 'trend',
        component: TrendComponent
      },
      {
        path: 'sensor-reports',
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
