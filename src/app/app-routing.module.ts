import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/auth/components/login/login.component';
import { AuthGuard } from './core/helpers/auth.guard';
import { LayoutComponent } from './features/layout/layout.component';

const routes: Routes = [
  // {
  // path: '',
  // component: LoginComponent,
  // children: [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () =>
      import('./core/auth/auth.module').then(
        (m) => m.AuthModule
      ),
      // canActivate: [AuthGuard]
  },
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
