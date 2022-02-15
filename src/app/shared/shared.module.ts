// @ts-ignore
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AngularDropdownModule } from 'angular-dropdown';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import {MessageService} from './EventBroadcast';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';

import { UiModule } from './components/ui/ui.module';
import { MainDropdownComponent } from './components/main-dropdown/main-dropdown.component';
import { GlobalCategoryDropdownComponent } from './components/global-category-dropdown/global-category-dropdown.component';



const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};


@NgModule({
  declarations: [ MainDropdownComponent, GlobalCategoryDropdownComponent],
  imports: [
  /*BrowserAnimationsModule,*/
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgxMaterialTimepickerModule,
    SnotifyModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    CommonModule,
    MaterialModule,
    AngularDropdownModule,
    RouterModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgMultiSelectDropDownModule.forRoot(),
    PerfectScrollbarModule,

    
    UiModule,
    FormsModule,
    ReactiveFormsModule,
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
    RouterModule,
    AngularDropdownModule,
    TranslateModule,
    NgMultiSelectDropDownModule,
    PerfectScrollbarModule,

    UiModule,
    MainDropdownComponent,
    GlobalCategoryDropdownComponent
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


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/json/', '.json');
}

