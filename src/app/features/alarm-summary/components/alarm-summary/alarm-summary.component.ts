import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/core/services';
import { AlarmSummaryService } from '../../services/alarm-summary.service';

@Component({
  selector: 'app-alarm-summary',
  templateUrl: './alarm-summary.component.html',
  styleUrls: ['./alarm-summary.component.scss']
})
export class AlarmSummaryComponent implements OnInit {
  sensorName : string = '';
  alertDataList : any = [];
  displayedColumns : string[] = ['Date And Time', 'Point Name', 'Data Name', 'Status'];

  constructor( private eventService : EventService, private alarmSummary : AlarmSummaryService  ) { }

  ngOnInit() {
    this.eventService.sensorIdValue.subscribe(res =>{
      this.sensorName = res.sensorname;
      this.getAlertListData(res.mainSensorid);
    }) 
  }

  getAlertListData(id : string){
    this.alarmSummary.getAlertByMainSensorId(id).subscribe(res =>{
         this.alertDataList =  res.alertResponses;
    })
  }

  // Excel import code
  importAsXlsx() {
    // this.csvArray = [];
    // this.filteredCSVData = [];
    // const options = {
    //   filename: this.cookieService.get('language') === 'en' ? 'Alert History_' + this.currentAreaName : 'アラート履歴_' + this.currentAreaName,
    //   fieldSeparator: ',',
    //   quoteStrings: '"',
    //   decimalSeparator: '.',
    //   showLabels: true,
    //   showTitle: true,

    //   title: this.cookieService.get('language') === 'en' ? 'Alert History_' + this.currentPointName : '報告書_' + this.currentPointName, /*title: this.cookieService.get('language') === 'en' ? 'Report_' + this.currentPointName : '報告書_' + this.currentPointName,*/
    //   useTextFile: false,
    //   useBom: true,
    //   useKeysAsHeaders: true,
    // };
    // for (let i = 0; i < this.tableData.length; i++) {
    //   this.filteredCSVData.push({
    //     'Date And Time': this.datePipe.transform(this.tableData[i].dated, 'yyyy/MM/dd hh:MM:ss') + ',',
    //     'Point Name': this.currentPointName,
    //     'Data Name': this.tableData[i].dataNameToDisplay,
    //     Status: this.tableData[i].status
    //   });
    // }
    // const csvExporter = new ExportToCsv(options);
    // csvExporter.generateCsv(this.filteredCSVData);
    // this.snotifyService.success(this.translate.instant('Data exported successfully'), '');
  }
}
