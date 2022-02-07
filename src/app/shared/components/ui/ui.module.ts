import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '.';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [ LoaderComponent ],
  imports: [
    CommonModule,
    NgxSpinnerModule,
  ],
  exports :[
    LoaderComponent,
  ]
})
export class UiModule { }
