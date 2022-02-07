import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/helpers/auth.guard';


const routes: Routes = [

  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () =>
      import('./core/auth/auth.module').then(
        (m) => m.AuthModule
      ),
      // canActivate: [AuthGuard]
  },

  // ========= new added route ======================================
  // {
  //   path: 'auth',
  //   loadChildren: () =>
  //     import('./features/authentication/authentication.module').then(
  //       (m) => m.AuthenticationModule
  //     ),
  // },
  // {
  //   path: 'point-selection',
  //   loadChildren: () =>
  //     import('./features/alarm-summary/alarm-summary.module').then(
  //       (m) => m.AlarmSummaryModule
  //     ),
  //     canActivate: [AuthGuard]
  // },
  // {
  //   path: 'trend',
  //   loadChildren: () =>
  //     import('./features/alarm-summary/alarm-summary.module').then(
  //       (m) => m.AlarmSummaryModule
  //     ),
  //     canActivate: [AuthGuard]
  // },
  {
    path: 'alarm-summary',
    loadChildren: () =>
      import('./features/alarm-summary/alarm-summary.module').then(
        (m) => m.AlarmSummaryModule
      ),
      canActivate: [AuthGuard]
  },
  {
    path: 'reports',
    loadChildren: () =>
      import('./features/reports/reports.module').then(
        (m) => m.ReportsModule
      ),
      canActivate: [AuthGuard]
  },

   // ===============================================
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
      canActivate: [AuthGuard]
  },
  {
    path: 'db',
    loadChildren: () =>
      import('./features/todo/todo.module').then(
        (m) => m.TodoModule
      ),
      canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
