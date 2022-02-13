import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, ForwardGuard } from './core/guards';



const routes: Routes = [
  {
    path: '',
    loadChildren: () =>import('./features/authentication/authentication.module').then((m) => m.AuthenticationModule),
    canActivate: [ForwardGuard]
  },
  {
    path: 'point-detail',
    loadChildren: () =>import('./features/point-detail/point-detail.module').then((m) => m.PointDetailModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'point-compare',
    loadChildren: () =>import('./features/point-compare/point-compare.module').then((m) => m.PointCompareModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'alarm-summary', 
    loadChildren: () =>import('./features/alarm-summary/alarm-summary.module').then((m) => m.AlarmSummaryModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'reports', 
    loadChildren: () => import('./features/reports/reports.module').then((m) => m.ReportsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'other',
    loadChildren: () => import(`./features/miscellaneous/miscellaneous.module`).then(m => m.MiscellaneousModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'other/404'
  },

  // ===============================================
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
