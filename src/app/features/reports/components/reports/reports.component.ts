import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { SnotifyService } from 'ng-snotify';
import { DataTypeValue, DropdownCategoryName } from 'src/app/core/enums';
import { WaterFlowRequestModel, WaterFlowResponseModel } from 'src/app/core/models/reports/reports.model';
import { EventService } from 'src/app/core/services';
import { ReportsService } from '../../services/reports.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  @ViewChild('form') form !: NgForm;
  DataFormatLayoutRequest: DropdownCategoryName = DropdownCategoryName.DataFormatValue;

  selectedFromDate: string = new Date(Date.now() - 86400 * 1000).toISOString();
  selectedToDate: Date = new Date();

  selectedValue: string = '';
  sensorName: string = '';
  sensorId: string = '';
  FormValueArray: string[] = [];
  sensorIdArray: string[] = [];
  reportData : WaterFlowResponseModel[] =[];

  constructor( 
    private reportService: ReportsService, private eventService: EventService, 
    private snotifyService : SnotifyService,
    private translateService : TranslateService,
    private datePipe : DatePipe) { }

  ngOnInit() {
    this.FormValueArray = this.reportService.formValueArray;
    this.eventService.sensorIdDetails.subscribe(res => {
      this.sensorName = res.sensorname; this.sensorId = res.mainSensorid;
      // this.sensorIdArray.push(res.mainSensorid);
      // console.log('aa', this.sensorIdArray);
    })
  }


  selectedLayout(dataFormatName: string){
     this.selectedValue = dataFormatName;
  }

  onSubmit() {
    
    if(this.form.invalid) return;
    
    const requestParam: WaterFlowRequestModel = {
      mainSensorId: this.sensorId,
      fromDate : this.datePipe.transform(this.selectedFromDate,'yyyy-MM-dd h:mm:ss a') || '',
      toDate : this.datePipe.transform(this.selectedToDate,'yyyy-MM-dd h:mm:ss a') || '',
      type : this.selectedValue
    };
  
    debugger
    this.reportService.waterFlowDataBySensorIdDates(requestParam).subscribe(res => {
      this.reportData = res.waterFlowResponse;

      // if(this.reportData.length == 0){
      //   // this.snotifyService.error(this.translateService.instant('common.dataNotAvailable'));
      // }else {

      // }
    });

  }

  sendFilterData(data : any[]){
    this.eventService.alertSummaryData.next(data);
  }

}
