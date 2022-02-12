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
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CoreModule } from './core/core.module';
import { DatePipe } from '@angular/common';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/json/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    HttpClientModule,
    SocketIoModule,
    DashboardModule,

    // newly added
    CoreModule,
    SharedModule,
    AppRoutingModule,
  ],
  providers: [ DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
