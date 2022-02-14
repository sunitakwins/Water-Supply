import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ExportToCsv } from 'export-to-csv-file';

import { CookieService } from 'ngx-cookie-service';
import { Messages } from 'src/app/core/config';
import { WaterFlowRequestModel } from 'src/app/core/models';
import { EventService, ToasterService, AuthService } from 'src/app/core/services';
import { ComponentService } from '../../services/component.service';

@Component({
  selector: 'app-main-dropdown',
  templateUrl: './main-dropdown.component.html',
  styleUrls: ['./main-dropdown.component.scss']
})
export class MainDropdownComponent implements OnInit {
  @Input() alertSummary: boolean = false;
  @Input() showExcelIcon: boolean = false;
  @Input() showDateInputs: boolean = false;

  public readonly Message = Messages;
  
  userCities: any = [];
  cityAreas: any = [];
  sensorListData: any = [];
  dataList: any = [];
  filteredCSVData: any = [];
  sensorName: string = '';
  areaId : string = '';
  sensorId : string = '';

  selectedFromDate: Date = new Date();
  selectedToDate: Date = new Date();

  constructor(
    private commonService: ComponentService,
    private eventService: EventService,
    private cookieService: CookieService,
    private datePipe: DatePipe,
    private toaster : ToasterService,
    private authService : AuthService,
    private translate: TranslateService) { }

  ngOnInit() {
    let userData = this.authService.getUserDetails();
    this.eventService.alertSummaryData.subscribe(data => {
      this.dataList = data;
    });
   
    this.getCities(userData.id);
  }

  // need to change this code
  getCities(userId : string) {
    this.commonService.getCitiesByUserId(userId).subscribe(cityData => {
      this.userCities = cityData;
    })
  }


  onSelection(object: any, dropdownName: string) {
    if (dropdownName == 'city') {
      let cityId = object.cityid; this.getAreas(cityId); return;
    } else if (dropdownName == 'area') {
      this.areaId = object.areaid; this.getSensorPoints(this.areaId); return;
    } else {
      this.sensorName = object.sensorname; this.sensorId = object.mainsensorId;
      this.eventService.sensorIdDetails.next(object);
      return;
    } 
  }


  getAreas(id: string) {
    this.commonService.getAreasByCity(id).subscribe(areaData => {
      this.cityAreas = areaData;
    })
  }


  getSensorPoints(id: string) {
    this.commonService.getAreaSensorByArea(id).subscribe(sensorData => {
      this.sensorListData = sensorData;
    })
  }

  onSubmit(){
    const dateTimeData: WaterFlowRequestModel = {
      mainSensorId: this.sensorId,
      fromDate : this.datePipe.transform(this.selectedFromDate,'yyyy-MM-dd HH:mm') || '',
      toDate : this.datePipe.transform(this.selectedToDate,'yyyy-MM-dd HH:mm') || '',
    };
     this.eventService.selectedDateDetails.next(dateTimeData);
  }

  // Excel import code
  importAsXlsx() {
    
    if(this.dataList.length == 0) {
      this.toaster.successToast(this.Message.Error.NoDataFoundError); return;
    } 
    
    let fileName = this.alertSummary ? (this.translate.instant(`common.alertSummary`) + this.sensorName) : '';

    const options = {
      filename: this.cookieService.get('language') === 'en' ? 'Alert History_' + this.sensorName : 'アラート履歴_' + this.sensorName,
      fieldSeparator: ',', quoteStrings: '"', decimalSeparator: '.', showLabels: true, showTitle: true,
      useTextFile: false, useBom: true, useKeysAsHeaders: true,
    };

    if (this.alertSummary) {
      // alert Summary
      for (let i = 0; i < this.dataList.length; i++) {
        this.filteredCSVData.push({
          'Date And Time': this.datePipe.transform(this.dataList[i].dated, 'yyyy/MM/dd hh:MM:ss') + ',',
          'Point Name': this.sensorName,
          'Data Name': this.dataList[i].dataNameToDisplay,
          'Status': this.dataList[i].status
        });
      }
      const csvExporter = new ExportToCsv(options); csvExporter.generateCsv(this.filteredCSVData);
      this.toaster.successToast(this.Message.Success.ExcelExported);
      // this.snotifyService.success(this.translate.instant(this.Message.ExcelExported), ''); 
    }
    else {
      // Report excel 
    }

  }




}
