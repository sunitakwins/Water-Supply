import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '.';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PageLoaderComponent } from './page-loader/page-loader.component';



@NgModule({
  declarations: [ LoaderComponent, PageLoaderComponent ],
  imports: [
    CommonModule,
    NgxSpinnerModule
  ],
  exports :[
    LoaderComponent,
    PageLoaderComponent
  ]
})
export class UiModule { }
