import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SocketIoModule } from 'ngx-socket-io';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TodoModule } from './features/todo/todo.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardModule } from './features/dashboard/dashboard.module';
import { SharedModule } from './shared/shared.module';
import { LayoutComponent } from './features/layout/layout.component';
import { ChartsModule } from 'ng2-charts';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CoreModule } from './core/core.module';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/json/', '.json');
}

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
    SocketIoModule,
    TodoModule,
    BrowserAnimationsModule,
    DashboardModule,

    // newly added
    CoreModule,
    ChartsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
