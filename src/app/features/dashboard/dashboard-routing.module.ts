import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaintenanceSettings } from './components/maintenance-settings/maintenance-settings.component';

const routes: Routes = [
  { path: 'settings', component: MaintenanceSettings }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
