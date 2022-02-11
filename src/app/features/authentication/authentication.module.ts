import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { LayoutModule } from 'src/app/layout/layout.module';
import { ChangePasswordComponent } from './components/change-password/change-password.component';


@NgModule({
  declarations: [ 
    LoginComponent,
    ChangePasswordComponent
  ],
  imports: [
    LayoutModule,
    CommonModule,
    AuthenticationRoutingModule,
    SharedModule
    
  ],
  providers: [CookieService]
})
export class AuthenticationModule { }
