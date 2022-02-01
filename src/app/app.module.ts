import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SocketIoModule } from 'ngx-socket-io';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TodoState } from './state/todo-state';
import { TodoModule } from './features/todo/todo.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardModule } from './features/dashboard/dashboard.module';
import { SharedModule } from './shared/shared.module';
import { LayoutComponent } from './features/layout/layout.component';
import { ChartsModule } from 'ng2-charts';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {MatSortModule} from '@angular/material/sort';

// export function createTranslateLoader(http: HttpClient) {
//   return new TranslateHttpLoader(http, './assets/json/', '.json');
// }
@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
   

  ],
  imports: [

    ChartsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    NgxsModule.forRoot([TodoState], {
      developmentMode: !environment.production
    }),
    SocketIoModule,
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    TodoModule,
    BrowserAnimationsModule,
    DashboardModule,
    MatSortModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
