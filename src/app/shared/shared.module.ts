// @ts-ignore
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { EditDataPointComponent } from './modals/edit-data-point/edit-data-point.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AngularDropdownModule } from 'angular-dropdown';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { FormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { MatTableExporterModule } from 'mat-table-exporter';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import {MessageService} from './EventBroadcast';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/json/', '.json');
}
@NgModule({
  declarations: [HeaderComponent, FooterComponent, SidebarComponent, EditDataPointComponent],
  imports: [
    /*BrowserAnimationsModule,*/
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgxMaterialTimepickerModule,
    SnotifyModule,
    FormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    CommonModule,
    MaterialModule,
    AngularDropdownModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    NgxSpinnerModule,
    RouterModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgMultiSelectDropDownModule.forRoot(),
    MatTableExporterModule,
    PerfectScrollbarModule
  ],
  exports: [
    /*BrowserAnimationsModule,*/
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgxMaterialTimepickerModule,
    SnotifyModule,
    FormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MaterialModule,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    RouterModule,
    NgxSpinnerModule,
    AngularDropdownModule,
    TranslateModule,
    NgMultiSelectDropDownModule,
    MatTableExporterModule,
    PerfectScrollbarModule
  ],
  providers: [
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
      multi: true
    },
    SnotifyService, MessageService
  ]
})
export class SharedModule {
}

