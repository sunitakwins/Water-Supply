import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationLayoutComponent } from 'src/app/layout/layouts';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: AuthenticationLayoutComponent,
  //   children: [{
  //     path: 'login',
  //     component: LoginComponent
  //   }]
  // }  
];

@NgModule({
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule]
    })
export class AuthenticationRoutingModule { }
