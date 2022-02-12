import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TodoService} from 'src/app/services/todo.service';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Subscription} from 'rxjs';
import {MatTableExporterDirective} from 'mat-table-exporter';
import {SnotifyService} from 'ng-snotify';
import {TranslateService} from '@ngx-translate/core';
import * as moment from 'moment';
import {MatSelect} from '@angular/material/select';
import {FormControl, FormGroup} from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';
import {ExportToCsv} from 'export-to-csv-file';
import {NgxSpinnerService} from 'ngx-spinner';
import {DatePipe} from '@angular/common';

const sortObjectsArray = require('sort-objects-array');

@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.scss']
})
export class AlarmComponent implements OnInit {
  /*testing code starts*/
  pointValue:any|undefined;
  dropDownData: any | undefined;
  pointData: any;
  counter = 0;
  currentCityId: any;
  dropDownSelectedCity: any;
  csvArray: any = [];
  filteredCSVData: any = [];
  @ViewChild('dateDropdown') dateDropdown: MatSelect | any;
  /*testing code ends*/
  selectDateTime: any;
  dateTimeArr: any = [];
  pointNameArr: any = [];
  tableData: any = [];
  handleSelectionData: any;
  handleSelectionType: any;
  selectedAreaData: any;
  isPointSelected = false;
  globalAreaId: any;
  isArrowDown = true;
  globalAreaName: string | null = '';
  @ViewChild(MatTableExporterDirective) matTableExporter?: MatTableExporterDirective;
  @ViewChild('TABLE') table?: ElementRef;
  start = 0;
  limit = 15;
  currentSensorId = 0;
  currentArea = 0;
  end: number = this.limit + this.start;
  searchKey = '';
  areaName = 'Selected Area';
  currentAreaName = '';
  currentPointName = '';
  currentView = 'list';
  clickEVentSubscription?: Subscription;
  selectedArea = false;
  selectedPoint = false;
  loading = false;
  cityChanged = false;
  points: any[] = [];
  areas: any[] = [];
  filterSelectObj: any = [];
  displayedColumns: string[] = ['dateAndTime', 'pointName', 'dataName', 'status'];
  tableColumns: string [] = ['Date And Time', 'Point Name', 'Data Name', 'Status'];
  filterValues: any = {};
  selectedLanguage : any;
  public dataSource = new MatTableDataSource<any>();
  @ViewChild(MatSort) sort?: MatSort;
  dateFormGroup = new FormGroup({});
  selectedSensor: any;

  constructor(private todoService: TodoService, private snotifyService: SnotifyService,
              private translate: TranslateService,
              private cookieService: CookieService,
              private spinner: NgxSpinnerService,
              private datePipe: DatePipe) {
    this.clickEVentSubscription = this.todoService.getClickEvent().subscribe(() => {
      this.callFun();
    });
    // Object to create Filter for
    this.filterSelectObj = [
      {
        name: 'DATETIME',
        columnProp: 'dated',
        options: []
      }, {
        name: 'POINTNAME',
        columnProp: 'pointName',
        options: []
      },
    ];

    this.dateFormGroup = new FormGroup({
      dateTimeSelected: new FormControl()
    });
    this.selectedDatelang();
  }

  selectedDatelang(){
     
    const lang = sessionStorage.getItem("lang")
  
    this.todoService.languageData.subscribe(
      (data: any) => {
       
        if(data == 'jp'){
          this.selectedLanguage = data
        }else if(data == 'en'){
          this.selectedLanguage = data
        }else{
          if(lang){
            if( lang == 'en'){
              this.selectedLanguage = lang;
            }if( lang == 'jp'){
              this.selectedLanguage = lang;
            }
          }
        }
      });
   }

  pointDetail: any = {
    areaSensor: 0,
    cityArea: 0
  };
newDAta :any
  ngOnInit(): void {
    this.currentCityId = this.todoService.getCityId();
    /*testing code starts*/
    this.areas = [];
    if (this.currentCityId === 0) {
      return;
    } else {
      this.todoService.getAreaByCity(this.currentCityId).subscribe((response: any) => {

        for (let i = 0; i < response.length; i++) {
          this.areas.push(response[i]);
        }
      });
    }

    /*testing code ends*/
    
    this.globalAreaId = this.todoService.getSelectedAreaId();
    this.selectedAreaData = this.todoService.getSelectedAreaData(); // testing code
    /*TESTING CODE STARTS*/
    if (this.selectedAreaData[0] === undefined && this.selectedAreaData[1] === undefined) {
      return;
    }
    if (this.selectedAreaData !== '') {
      this.handleSelection(this.selectedAreaData[0], this.selectedAreaData[1]);
    }
    /*TESTING CODE ENDS*/
    this.globalAreaName = this.todoService.getSelectedAreaName();
    this.pointDetail.cityArea = this.globalAreaId;
    this.dataSource.filterPredicate = this.createFilter();
    const selectedCity = this.todoService.getSelectedCity();
    this.dropDownSelectedCity = this.todoService.getSelectedCity(); /*testing code*/
    if (selectedCity != '') {
      const data: any = sessionStorage.getItem('allAreas');
      const areaData = JSON.parse(data);
      /*this.areas = areaData.filter((x: { cityid: any; }) => x.cityid == this.cityId);*/ /*commented for testing purpose*/
    }
    if (this.globalAreaId) {
      this.selectedPoint = true;
      this.pointDetail.areaSensor = '';
      this.isPointSelected = false;
      this.currentSensorId = 0;
    }

    this.newDAta =   localStorage.getItem("selectedPointName")
  }
  pointName:any;
  callFun(): void {
    this.resetFilters();
    this.cityChanged = true;
    const data: any = sessionStorage.getItem('allAreas');
    const areaData = JSON.parse(data);
    this.points = [];
    this.selectedPoint = false;
    this.currentSensorId = 0;
    this.currentSensorId = 0;
    this.pointDetail.areaSensor = 0;
    this.pointDetail.cityArea = 0;
    this.dataSource.data = [];
    this.searchKey = '';
  }


  importAsXlsx(): void {

    this.csvArray = [];
    this.filteredCSVData = [];
    const options = {
      filename: this.cookieService.get('language') === 'en' ? 'Alert History_' + this.currentAreaName : 'アラート履歴_' + this.currentAreaName,
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      // tslint:disable-next-line:max-line-length
      title: this.cookieService.get('language') === 'en' ? 'Alert History_' + this.currentPointName : '報告書_' + this.currentPointName, /*title: this.cookieService.get('language') === 'en' ? 'Report_' + this.currentPointName : '報告書_' + this.currentPointName,*/
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
    };
    for (let i = 0; i < this.tableData.length; i++) {
      this.filteredCSVData.push({
        'Date And Time': this.datePipe.transform(this.tableData[i].dated, 'yyyy/MM/dd hh:MM:ss') + ',',
        'Point Name': this.currentPointName,
        'Data Name': this.tableData[i].dataNameToDisplay,
        Status: this.tableData[i].status
      });
    }
    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(this.filteredCSVData);
    this.snotifyService.success(this.translate.instant('Data exported successfully'), '');
  }


  handleSelection(data: any, type: string): void {
    
    this.tableData = [];
    /*this.tableColumns = [];*/
    this.isPointSelected = true;
    if (type === 'Area') {
      this.handleSelectionData = data;
      this.handleSelectionType = type;
      this.todoService.setSelectedAreaData(data, type);
    }
    if (type === 'Point') {
      this.pointValue = data.sensorname;
      this.selectedSensor = data.mainSensorid;
    
      this.todoService.setDropDownSelectedPoint(data);     
    }

    if (data.areaname === this.currentAreaName && this.cityChanged == false) {
      return;
    } else {
      switch (type) {
        
        case 'Area':
          this.currentArea = data.areaid;
          this.currentAreaName = data.areaname;
          this.todoService.setAreaName(data.areaname);
          this.todoService.setAreaId(data.areaid);

          this.getSensorsByArea(data.areaid);
          this.cityChanged = false;
          this.selectedPoint = true;

       this.dropDownData = this.todoService.getDropDownSelectedPoint();
          if (this.dropDownData !== undefined) {
            this.currentSensorId = this.dropDownData.mainSensorid;
          }
          break;
        case 'Point':
          this.currentSensorId = data.mainSensorid;
          this.currentPointName = data.sensorname;
          this.todoService.setPointId(data.mainSensorid);
          this.todoService.setPointName(data.sensorname);
          this.pointData = data;
          break;
      }
    }
  }

  getSensorsByArea(areaId: any): void {
    
    this.loading = true;
    this.todoService.getSensorsByAreaId(areaId).subscribe((response: any) => {
        this.points = response;
        this.loading = false;
        this.currentSensorId = 0;
        this.dataSource.data = [];
        this.searchKey = '';
      },
      error => {
        this.loading = false;
      });
  }

  getAlertsHistory(): void {
    this.loading = true;
    this.todoService.getAlarmsHistory().subscribe((response: any) => {
        this.dataSource = new MatTableDataSource(response.alertResponses);
        if (this.sort && this.sort.sortChange) {
          this.dataSource.sort = this.sort;
        }
        this.loading = false;
      },
      (error: any) => {
        this.loading = false;
      });
  }

  getAlertsHistoryBySensorId(): void {
    this.resetFilters();
    this.searchKey = '';
    this.loading = true;
    this.todoService.getAlertsBySensorId(this.currentSensorId).subscribe((response: any) => {

        this.dateTimeArr = [];
        this.tableData = [];
        this.tableData = response.alertResponses
        for (let i = 0; i < response.alertResponses.length; i++) {
         
          this.dateTimeArr.push(moment(response.alertResponses[i].dated).format('YYYY-MM-DD'));
          this.dateTimeArr = [...new Set(this.dateTimeArr)];
          this.pointNameArr.push(response.alertResponses[i].pointName);
          this.pointNameArr = [...new Set(this.pointNameArr)];
        }

        this.loading = false;
      }, (error: any) => {
        
        this.loading = false;
      });
  }

  // Get Uniqu values from columns to build filter
  getFilterObject(fullObj: any, key: any) {

    const uniqChk: any = [];
    fullObj.filter((obj: { [x: string]: any; }) => {
      if (!uniqChk.includes(obj[key])) {
        uniqChk.push(obj[key]);
      }
      return obj;
    });
    return uniqChk;
  }

  applyFilter(): void {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  get city() {
    return this.todoService.getSelectedCity();
  }

  get cityId() {
    return this.todoService.getCityId();
  }


  /*Called on Filter change*/

// Custom filter method fot Angular Material Datatable
  createFilter() {

    const filterFunction = function(data: any, filter: string): boolean {
      const searchTerms = JSON.parse(filter);
      let isFilterSet = false;
      for (const col in searchTerms) {
        if (searchTerms[col].toString() !== '') {
          isFilterSet = true;
        } else {
          delete searchTerms[col];
        }
      }
  const nameSearch = () => {
        let found = false;
        if (isFilterSet) {
          for (const col in searchTerms) {
            searchTerms[col].trim().toLowerCase().split(' ').forEach((word: any) => {
              if (data[col].toString().toLowerCase().indexOf(word) != -1 && isFilterSet) {
                found = true;
              }
            });
          }
          return found;
        } else {
          return true;
        }
      };
      return nameSearch();
    };
    return filterFunction;
  }


  // Reset table filters
  resetFilters(): any {
    
    this.counter = this.counter + 1;
    /*testing code starts*/
    if (this.counter >= 1) {/*this.counter > 2*/
      this.spinner.show();
    }
    /*testing code starts*/
    this.dateFormGroup.value.dateTimeSelected = null;
    this.selectDateTime = '';
    this.filterValues = {};
    this.filterSelectObj.forEach((value: any, key: any) => {
      value.modelValue = undefined;
    });
    this.dataSource.filter = '';
    if (this.currentCityId === this.todoService.cityId) {
      this.todoService.getAlertsBySensorId(this.currentSensorId).subscribe((response: any) => {
        
        if (response.alertResponses.length > 0) {
          this.spinner.hide();
        }
  
        this.tableData = [];
        // for (let i = 0; i < response.alertResponses.length; i++) {
        //   this.tableData.push(response.alertResponses[i]);
        // }
        this.tableData = response.alertResponses
        this.spinner.hide();
      });

    } else {
      this.tableData = [];
      this.currentCityId = this.todoService.getCityId();
      this.todoService.getAreaByCity(this.currentCityId).subscribe((response: any) => {
        this.areas = [];
        for (let i = 0; i < response.length; i++) {
          this.areas.push(response[i]);
        }
        this.spinner.hide();
      });
    }

  }

  over(): void {
  }

  dateTimeFilter(selectedDate: any): any {  
    this.spinner.show();
    if (this.dropDownData !== undefined) {
      this.currentSensorId = this.dropDownData.mainSensorid;
    }
    this.todoService.getAlertsByFilterDate(this.currentSensorId , selectedDate).subscribe((response: any) => {
      
      this.tableData = [];     
      this.tableData = response.alertResponses
      this.spinner.hide();
    });
  }

 
}


