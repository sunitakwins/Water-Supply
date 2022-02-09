import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ExportToCsv } from 'export-to-csv-file';
import { SnotifyService } from 'ng-snotify';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { EventService } from 'src/app/core/services';
import { ComponentService } from '../../services/component.service';

@Component({
  selector: 'app-main-dropdown',
  templateUrl: './main-dropdown.component.html',
  styleUrls: ['./main-dropdown.component.scss']
})
export class MainDropdownComponent implements OnInit {
  @Input() alertSummary: boolean = false; 

  userCities : any = []; 
  cityAreas : any =[];
  sensorListData : any =[];
  dataList : any = [];
  filteredCSVData : any = [];
  sensorName : string = '';

  constructor( 
    private commonService : ComponentService, 
    private eventService : EventService, 
    private cookieService :CookieService,
    private datePipe : DatePipe,
    private translate : TranslateService  ) { }

  ngOnInit() {
    this.getCities();
    
    this.eventService.alertSummaryData.subscribe(data =>{
        this.dataList = data;
    });
  }

  getCities(){
   let id = +1;
    this.commonService.getCitiesByUserId(id).subscribe( cityData => {
       this.userCities = cityData;
    })
  }


  onSelection(object : any, dropdownName : string ){
   if(dropdownName == 'city'){
    let cityId = object.cityid;   this.getAreas(cityId); return;
   }else if(dropdownName == 'area') {
    let areaId = object.areaid;  this.getSensorPoints(areaId); return;
   }else{
     this.sensorName = object.sensorname;
     this.eventService.sensorIdDetails.next(object); 
     return;
   }
  }

  // removeSensor(){
  //   debugger
  // }

  getAreas(id : number){
    this.commonService.getAreasByCity(id).subscribe(areaData => {
      this.cityAreas = areaData;
   })
  }


  getSensorPoints(id : number){
    this.commonService.getAreaSensorByArea(id).subscribe(sensorData => {
        this.sensorListData = sensorData;
    })
  }

    // Excel import code
    importAsXlsx() {

      let fileName =this.alertSummary ? (this.translate.instant(`common.alertSummary`) + this.sensorName) : '';
      
      debugger
      const options = {
        filename: this.cookieService.get('language') === 'en' ? 'Alert History_' + this.sensorName : 'アラート履歴_' + this.sensorName,
        fieldSeparator: ',', quoteStrings: '"', decimalSeparator: '.', showLabels: true, showTitle: true,
        useTextFile: false, useBom: true, useKeysAsHeaders: true,
      };

      if(this.alertSummary){
        // alert Summary
        for (let i = 0; i < this.dataList.length; i++) {
          this.filteredCSVData.push({
            'Date And Time': this.datePipe.transform(this.dataList[i].dated, 'yyyy/MM/dd hh:MM:ss') + ',',
            'Point Name': this.sensorName,
            'Data Name': this.dataList[i].dataNameToDisplay,
            'Status': this.dataList[i].status
          });
        }
        const csvExporter = new ExportToCsv(options);  csvExporter.generateCsv(this.filteredCSVData);
        // this.snotifyService.success(this.translate.instant('Data exported successfully'), ''); 
      }
      else {
        // Report excel 
      }
  
     
    }
}
