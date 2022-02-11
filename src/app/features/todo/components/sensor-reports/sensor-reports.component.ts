import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {TranslateService} from '@ngx-translate/core';
import {MatTableExporterDirective} from 'mat-table-exporter';
import * as moment from 'moment';
import {IDropdownSettings, MultiSelectComponent} from 'ng-multiselect-dropdown';
import {SnotifyService} from 'ng-snotify';
import {Subscription} from 'rxjs';
import {TodoService} from 'src/app/services/todo.service';
import {CookieService} from 'ngx-cookie-service';
import {FormControl, FormGroup} from '@angular/forms';
import {ExportToCsv} from 'export-to-csv-file';
import {NgxSpinnerService} from 'ngx-spinner';
import {DatePipe} from '@angular/common';
import { DateTimeAdapter } from 'ng-pick-datetime';

@Component({
  selector: 'app-sensor-reports',
  templateUrl: './sensor-reports.component.html',
  styleUrls: ['./sensor-reports.component.scss']
})
export class SensorReportsComponent implements OnInit {

  constructor(public todoService: TodoService, private translate: TranslateService,
              private snotifyService: SnotifyService,
              private cookieService: CookieService,
              private spinner: NgxSpinnerService,
              private datePipe: DatePipe ,private dateTimeAdapter: DateTimeAdapter<any>) {
              
    this.clickEVentSubscription = this.todoService.getClickEvent().subscribe(() => {
      this.callFun();
    });

    this.dataFormGroup = new FormGroup({
      fromdatetime: new FormControl(),
      todatetime: new FormControl(),
      rawConverted: new FormControl()
    });

    this.datePickerlang();
  }

  datePickerlang(){

    this.todoService.languageData.subscribe(
      (data: any) => {
       
        if(data == 'jp'){
          this.dateTimeAdapter.setLocale('ja-JP');
        }else if(data == 'en'){
          this.dateTimeAdapter.setLocale('en');
        }else{
          const lang = sessionStorage.getItem("lang")
          if(lang){
            if( lang == 'en'){
              this.dateTimeAdapter.setLocale('en');
            }if( lang == 'jp'){
              this.dateTimeAdapter.setLocale('ja-JP');
            }
          }
        }
      });
  }

  get city() {
    return this.todoService.getSelectedCity();
  }

  get cityId() {
    return this.todoService.getCityId();
  }

  fromToArray: any = []; /*testing*/
  selectedFromDate: any;
  selectedToDate: any;
  handleSelectionData: any;
  handleSelectionType: any;
  selectedAreaData: any;
  selectedDataFormValue = 'Converted';
  dropDownValue: any;
  currentDate: any;
  tableArray: any;
  selectedDataForm = '';
  isPointSelected = false;
  globalAreaId: any;
  globalAreaName: string | null = '';
  pointDetail: any = {
    areaSensor: 0,
    cityArea: 0
  };
  /* Table properties and initialisations */
  @ViewChild(MatTableExporterDirective) matTableExporter?: MatTableExporterDirective;
  @ViewChild('TABLE') table?: ElementRef;
  @ViewChild(MultiSelectComponent, {static: true}) multiSelectComponent?: MultiSelectComponent;
  @ViewChild(MatSort) sort?: MatSort;
  clickEVentSubscription?: Subscription;
  displayedColumns: any = [];
  dataColumns: Array<any> = [];
  points: any[] = [];
  areas: any[] = [];
  sensorRows: any = [];
// this array will have response of all sensors in the area
  public mainArray: any = [];
  selectedSensorData: any = [];
  dateArray: any = [];
  reportData: any = [{
    tableHeaders: [],
    tableData: []
  }];

  currentSensorId = 0;
  currentArea = 0;

  currentAreaName = '';
  currentPointName = '';
  pointName = '';
  reportName?: string;

  selectedPoint = false;
  loading = false;

  dateFilter: any = {
    fromDateTime: moment(new Date()).format('MM/DD/YYYY 00:00:00')
  };

  /* properties for multiselect data points */
  dropdownList: any = [];
  selectedItems: any = [];
  hiddenColumns: any = [];
  dropdownSettings?: IDropdownSettings;

  dataFormGroup = new FormGroup({});

  /*new code starts*/
  currentDataForm = 'Converted';
  tableHeaders = [
    {
      ts: 'Time Stamp',
      bv: 'Battery Voltage',
      fwe: 'Freshwater Electrical Conductivity',
      wq: 'Water Quantity',
      wl: 'Water Level',
      tdy: 'Turbidity',
      swc: 'Saltwater Conductivity',
      wt: 'Water Temperature',

      // rts: 'Time Stamp',
      // rbv: 'Raw Battery Voltage',
      // rfwe: 'Raw Freshwater Electrical Conductivity',
      // rwq: 'Raw Water Quantity',
      // rwl: 'Raw Water Level',
      // rtdy: 'Raw Turbidity',
      // rswc: 'Raw Saltwater Conductivity',
      // rwt: 'Raw Water Temperature'
    },
  ];

  dataPropertiesArray: any = [];
  sensornames: any = [];
  removable = true;
  selectable = true;
  arr: any = [];
  currentSelectedCity = '';
  csvArray: any = [];
  deletedSensorArray: any = [];

  /*new code ends*/
  ngOnInit(): void {
    if (this.currentSelectedCity === '') {
      this.currentSelectedCity = this.todoService.getCurrentCity();
    }

    this.sensornames = [];
    this.dataPropertiesArray = [];
    this.selectedAreaData = this.todoService.getSelectedAreaData(); // testing code
    /*TESTING CODE STARTS*/
    if (this.selectedAreaData !== '') {
      this.handleSelection(this.selectedAreaData[0], this.selectedAreaData[1]);
    }
    /*TESTING CODE ENDS*/

    this.initDefaults();
    this.globalAreaId = this.todoService.getSelectedAreaId();

    this.globalAreaName = this.todoService.getSelectedAreaName();
    this.pointDetail.cityArea = this.globalAreaId;
    const selectedCity = this.todoService.getSelectedCity();
    if (selectedCity !== '') {
      // tslint:disable-next-line:no-shadowed-variable
      const data: any = sessionStorage.getItem('allAreas');
      const areaData = JSON.parse(data);
      this.areas = areaData.filter((x: { cityid: any; }) => x.cityid == this.cityId);
      if (this.globalAreaId) {
        this.selectedPoint = true;
        this.pointDetail.areaSensor = '';
        this.isPointSelected = false;
        this.currentSensorId = 0;
      }
    } else {
      return;
    }

    // this.dropdownList = [
    //   {
    //     id: 1,
    //     value: this.cookieService.get('language') === 'en' ? 'Battery Voltage' : this.translate.instant('Battery Voltage'),
    //     key: 'batteryVoltage'
    //   },
    //   {
    //     id: 2,
    //     value: this.cookieService.get('language') === 'en' ? 'Freshwater Electrical Conductivity' : this.translate.instant('Freshwater Electrical Conductivity'),
    //     key: 'freshwaterConductivity'
    //   },
    //   {
    //     id: 3,
    //     value: this.cookieService.get('language') === 'en' ? 'Water Quantity' : this.translate.instant('Water Quantity'),
    //     key: 'waterQuantity'
    //   },
    //   {
    //     id: 4,
    //     value: this.cookieService.get('language') === 'en' ? 'Water Level' : this.translate.instant('Water Level'),
    //     key: 'waterLevel'
    //   },
    //   {id: 5, value: this.cookieService.get('language') === 'en' ? 'Turbidity' : this.translate.instant('Turbidity'), key: 'turbidity'},
    //   {id: 0, value: this.cookieService.get('language') === 'en' ? 'Date Time' : this.translate.instant('Date Time'), key: 'dateTime'},
    //   {
    //     id: 6,
    //     value: this.cookieService.get('language') === 'en' ? 'Raw Water Level' : this.translate.instant('Raw Water Level'),
    //     key: 'rawwaterlevel'
    //   }, /*testing code*/
    //   {
    //     id: 7,
    //     value: this.cookieService.get('language') === 'en' ? 'Raw Water Quantity' : this.translate.instant('Raw Water Quantity'),
    //     key: 'rawwaterquantity'
    //   }, /*testing code*/
    //   {
    //     id: 8,
    //     value: this.cookieService.get('language') === 'en' ? 'Raw Turbidity' : this.translate.instant('Raw Turbidity'),
    //     key: 'rawturbidity'
    //   } /*testing code*/
    // ];
    // this.selectedItems = [
    //   {
    //     id: 1,
    //     value: this.cookieService.get('language') === 'en' ? 'Battery Voltage' : this.translate.instant('Battery Voltage'),
    //     key: 'batteryVoltage'
    //   },
    //   {
    //     id: 2,
    //     value: this.cookieService.get('language') === 'en' ? 'Freshwater Electrical Conductivity' : this.translate.instant('Freshwater Electrical Conductivity'),
    //     key: 'freshwaterConductivity'
    //   },
    //   {
    //     id: 3,
    //     value: this.cookieService.get('language') === 'en' ? 'Water Quantity' : this.translate.instant('Water Quantity'),
    //     key: 'waterQuantity'
    //   },
    //   {
    //     id: 4,
    //     value: this.cookieService.get('language') === 'en' ? 'Water Level' : this.translate.instant('Water Level'),
    //     key: 'waterLevel'
    //   },
    //   {id: 5, value: this.cookieService.get('language') === 'en' ? 'Turbidity' : this.translate.instant('Turbidity'), key: 'turbidity'},
    //   {id: 0, value: this.cookieService.get('language') === 'en' ? 'Date Time' : this.translate.instant('Date Time'), key: 'dateTime'},
    //   {
    //     id: 6,
    //     value: this.cookieService.get('language') === 'en' ? 'Raw Water Level' : this.translate.instant('Raw Water Level'),
    //     key: 'rawwaterlevel'
    //   },
    //   {
    //     id: 7,
    //     value: this.cookieService.get('language') === 'en' ? 'Raw Water Quantity' : this.translate.instant('Raw Water Quantity'),
    //     key: 'rawwaterquantity'
    //   },
    //   {
    //     id: 8,
    //     value: this.cookieService.get('language') === 'en' ? 'Raw Turbidity' : this.translate.instant('Raw Turbidity'),
    //     key: 'rawturbidity'
    //   }
    // ];

    // this.dropdownSettings = {
    //   singleSelection: false,
    //   idField: 'id',
    //   textField: 'value',
    //   /*allowSearchFilter: true,*/
    //   allowSearchFilter: false,
    //   enableCheckAll: false
    // };

  }

  callFun(): void {
    const data: any = sessionStorage.getItem('allAreas');
    const areaData = JSON.parse(data);
    this.areas = areaData.filter((x: { cityid: any; }) => x.cityid === this.cityId);
    this.resetData();
  }

  initDefaults(): void {
    this.reportName = `Report` + '_' + `01`;
    this.displayedColumns = [];
    this.dataColumns = [];
    this.dropdownList = this.dropdownList;
    this.selectedItems = this.selectedItems;
    this.reportData = [];
  }


  /*new code starts*/
  options : any
  importAsXlsx(fromDateTime: string, toDateTime: string): void {

    let allSensors = '';
    if (this.sensornames.length > 1) {
      for (let i = 0; i < this.sensornames.length; i++) {
        allSensors = allSensors + ' ' + this.sensornames[i].data.sensorname;
      }
    } else {
      allSensors = this.sensornames[0].data.sensorname;
    }


    if ((fromDateTime && toDateTime) || !(fromDateTime && toDateTime)) {
      const lang = sessionStorage.getItem("lang")
      
     
      this.csvArray = [];
      if (this.currentDataForm === 'Converted') {
        this.options = {
          filename: this.cookieService.get('language') === 'en' ? 'Converted value' + this.currentAreaName : '測定値（A/D変換値）' + this.currentAreaName,
          fieldSeparator: ',',
          quoteStrings: '"',
          decimalSeparator: '.',
          showLabels: true,
          showTitle: true,
          title: this.cookieService.get('language') === 'en' ? 'Converted value' + allSensors : '測定値（A/D変換値）' + allSensors, 
          useTextFile: false,
          useBom: true,
          useKeysAsHeaders: true,
        };
        if(lang == 'en'){
          for (let i = 0; i < this.dataPropertiesArray.length; i++) {
            this.csvArray.push({
              'Timestamp': this.datePipe.transform(this.dataPropertiesArray[i].dateTime, 'yyyy/MM/dd hh:MM:ss') + ',',
              'Battery Voltage(V)': this.dataPropertiesArray[i].batteryVoltage + ' V',
              'Freshwater Electrical Conductivity(μS/cm)': this.dataPropertiesArray[i].freshwaterConductivity + ' μS/cm',
              'Water Quantity(m3/sec)': this.dataPropertiesArray[i].waterQuantity + ' m3/sec',
              'Water Level(m)': this.dataPropertiesArray[i].waterLevel + ' m',
              'Turbidity(℃)': this.dataPropertiesArray[i].turbidity + ' ℃ ',
              'Saltwater Conductivity(ms/cm)': this.dataPropertiesArray[i].saltwaterConductivity + ' ms/cm',
              'Water Temperature(°C)': this.dataPropertiesArray[i].waterTemprature + ' °C'
            });
          }
        }else{
          for (let i = 0; i < this.dataPropertiesArray.length; i++) {
            this.csvArray.push({
              '日時': this.datePipe.transform(this.dataPropertiesArray[i].dateTime, 'yyyy/MM/dd hh:MM ') + ',',
              'バッテリー電圧(V)': this.dataPropertiesArray[i].batteryVoltage + ' V',
              '淡水電気伝導度(μS/cm)': this.dataPropertiesArray[i].freshwaterConductivity + ' μS/cm',
              '流量(m3/sec)': this.dataPropertiesArray[i].waterQuantity + ' m3/sec',
              '水深(m)': this.dataPropertiesArray[i].waterLevel + ' m',
              '濁度(℃)': this.dataPropertiesArray[i].turbidity + ' ℃ ',
              '海水電気伝導度(ms/cm)': this.dataPropertiesArray[i].saltwaterConductivity + ' ms/cm',
              '温度(°C)': this.dataPropertiesArray[i].waterTemprature + ' °C'
            });
          }
        }
    
      }

      if (this.currentDataForm === 'Raw') {
  this.options = {
          filename: this.cookieService.get('language') === 'en' ? 'Raw value' + this.currentAreaName : '測定値（物理値）' + this.currentAreaName,
          fieldSeparator: ',',
          quoteStrings: '"',
          decimalSeparator: '.',
          showLabels: true,
          showTitle: true,
          title: this.cookieService.get('language') === 'en' ? 'Raw value' + allSensors : '測定値（物理値）' + allSensors, 
          useTextFile: false,
          useBom: true,
          useKeysAsHeaders: true,
        };
        if(lang == 'en'){
          for (let i = 0; i < this.dataPropertiesArray.length; i++) {

            this.csvArray.push({
              'Timestamp': this.datePipe.transform(this.dataPropertiesArray[i].dateTime, 'yyyy/MM/dd hh:MM:ss') + ',',
              'Battery Voltage(V)': this.dataPropertiesArray[i].rawBatteryVoltage + ' V',
              'Freshwater Electrical Conductivity(μS/cm)': this.dataPropertiesArray[i].rawFreshwaterConductivity + ' μS/cm',
              'Water Quantity(m3/sec)': this.dataPropertiesArray[i].rawWaterQuantity + ' m3/sec',
              'Water Level(m)': this.dataPropertiesArray[i].rawWaterLevel + ' m',
              'Turbidity(℃)': this.dataPropertiesArray[i].rawTurbidity + ' ℃ ',
              'Saltwater Conductivity(ms/cm)': this.dataPropertiesArray[i].rawSaltwaterConductivity + ' ms/cm',
              'Water Temperature(°C)': this.dataPropertiesArray[i].rawWaterTemprature + ' °C'
            });
          }
        }else{
          for (let i = 0; i < this.dataPropertiesArray.length; i++) {

            this.csvArray.push({
              '日時': this.datePipe.transform(this.dataPropertiesArray[i].dateTime, 'yyyy/MM/dd hh:MM:ss') + ',',
              'バッテリー電圧(V)': this.dataPropertiesArray[i].rawBatteryVoltage + ' V',
              '淡水電気伝導度(μS/cm)': this.dataPropertiesArray[i].rawFreshwaterConductivity + ' μS/cm',
              '流量(m3/sec)': this.dataPropertiesArray[i].rawWaterQuantity + ' m3/sec',
              '水深(m)': this.dataPropertiesArray[i].rawWaterLevel + ' m',
              '濁度(℃)': this.dataPropertiesArray[i].rawTurbidity + ' ℃ ',
              '海水電気伝導度(ms/cm)': this.dataPropertiesArray[i].rawSaltwaterConductivity + ' ms/cm',
              '温度(°C)': this.dataPropertiesArray[i].rawWaterTemprature + ' °C'
            });
          }
        }
   
      }
      this.csvArray.splice(this.csvArray.length - 1, 1);
      const csvExporter = new ExportToCsv(this.options);
      csvExporter.generateCsv(this.csvArray);
      this.snotifyService.success(this.translate.instant('Data exported successfully'), '');
    }
  }

  /*new code ends*/
  // plotSensorData(sensorId: any): void {
  //   let currentDate: any = [];
  //   const index = this.mainArray.findIndex((x: { id: any; }) => x.id === sensorId);
  //   const response = this.mainArray[index].data.waterFlowResponse;
  //   this.tableArray = response;
  //   if (response != null) {
  //     if (this.reportData.length === 0) {
  //       response.map((element: any, id: any) => {
  //         const index = this.reportData.findIndex((x: any) => x === element.dateTime);
  //         if (index === -1) {
  //           this.dateArray.push({
  //             key: `dateTime`,
  //             value: `Date Time`,
  //             id: 0,
  //             sensorId: this.currentSensorId,
  //             keyName: 'Date Time',
  //             dateTime: element.dateTime
  //           });

  //           currentDate = element.dateTime;
  //         }
  //         this.reportData.push({
  //           [`dateTime` + '_' + this.currentPointName]: currentDate,
  //           [`batteryVoltage` + '_' + this.currentPointName]: element.batteryVoltage,
  //           [`freshwaterConductivity` + '_' + this.currentPointName]: element.freshwaterConductivity,
  //           // tslint:disable-next-line:max-line-length
  //           [`waterQuantity` + '_' + this.currentPointName]: element.waterQuantity,
  //           [`waterLevel` + '_' + this.currentPointName]: element.waterLevel,
  //           [`turbidity` + '_' + this.currentPointName]: element.turbidity,
  //           sensorId: this.currentSensorId
  //         });
  //       });
  //     } else if (this.reportData.length > 0) {
  //       if (response.length <= this.reportData.length) {
  //         // tslint:disable-next-line:no-shadowed-variable
  //         response.map((element: any, id: any) => {
  //           // tslint:disable-next-line:no-shadowed-variable
  //           const index = this.reportData.findIndex((x: any) => x == element.dateTime);
  //           if (index === -1) {
  //             this.dateArray.push({dateTime: element.dateTime});
  //             currentDate = element.dateTime;
  //           }
  //           this.reportData[id][`dateTime` + '_' + this.currentPointName] = currentDate;
  //           this.reportData[id][`batteryVoltage` + '_' + this.currentPointName] = element.batteryVoltage;
  //           this.reportData[id][`freshwaterConductivity` + '_' + this.currentPointName] = element.freshwaterConductivity;
  //           this.reportData[id][`waterQuantity` + '_' + this.currentPointName] = element.waterQuantity;
  //           this.reportData[id][`waterLevel` + '_' + this.currentPointName] = element.waterLevel;
  //           this.reportData[id][`turbidity` + '_' + this.currentPointName] = element.turbidity;
  //           this.reportData[id][`sensorId`] = this.currentSensorId;
  //         });
  //       } else {
  //         response.map((element: any, id: any) => {
  //           const index = this.reportData.findIndex((x: any) => x == element.dateTime);
  //           if (index === -1) {
  //             this.dateArray.push({dateTime: element.dateTime});
  //             currentDate = element.dateTime;
  //           }
  //           if (id < this.reportData.length) {
  //             this.reportData[id][`dateTime` + '_' + this.currentPointName] = currentDate;
  //             this.reportData[id][`batteryVoltage` + '_' + this.currentPointName] = element.batteryVoltage;
  //             this.reportData[id][`freshwaterConductivity` + '_' + this.currentPointName] = element.freshwaterConductivity;
  //             this.reportData[id][`waterQuantity` + '_' + this.currentPointName] = element.waterQuantity;
  //             this.reportData[id][`waterLevel` + '_' + this.currentPointName] = element.waterLevel;
  //             this.reportData[id][`turbidity` + '_' + this.currentPointName] = element.turbidity;
  //             this.reportData[id][`sensorId`] = this.currentSensorId;
  //           } else {
  //             this.reportData.push({
  //               [`dateTime` + '_' + this.currentPointName]: currentDate,
  //               [`batteryVoltage` + '_' + this.currentPointName]: element.batteryVoltage,
  //               [`freshwaterConductivity` + '_' + this.currentPointName]: element.freshwaterConductivity,
  //               [`waterQuantity` + '_' + this.currentPointName]: element.waterQuantity,
  //               [`waterLevel` + '_' + this.currentPointName]: element.waterLevel,
  //               [`turbidity` + '_' + this.currentPointName]: element.turbidity,
  //               sensorId: this.currentSensorId
  //             });
  //           }

  //         });
  //       }

  //     } else {

  //     }
  //   }
  //   if (this.sort && this.sort.sortChange) {
  //     this.reportData.sort = this.sort;
  //   }
  //   this.prepareDataDisplay();
  // }

  // prepareDataDisplay(): void {
  //     this.dataColumns = [];
  //   this.displayedColumns.push(
  //     {
  //       key: `dateTime` + '_' + this.currentPointName,
  //       value: this.cookieService.get('language') === 'en' ? 'Date Time' : this.translate.instant(`Date Time`), // this.
  //       id: 0,
  //       sensorId: this.currentSensorId,
  //       keyName: 'Date Time',
  //             hide: true
  //     },

  //     {
  //       key: `batteryVoltage` + '_' + this.currentPointName,
  //       value: this.cookieService.get('language') === 'en' ? 'Battery Voltage' : this.translate.instant(`Battery Voltage`) + '_' + this.currentPointName, // this.translate.instant(`Battery Voltage`) + '_' + this.currentPointName
  //       id: 1,
  //       keyName: 'Battery Voltage',
  //       sensorId: this.currentSensorId,
  //       hide: true
      
  //     },
  //     {
  //       key: `freshwaterConductivity` + '_' + this.currentPointName,
  //       value: this.cookieService.get('language') === 'en' ? 'Freshwater Conductivity' : this.translate.instant(`Freshwater Conductivity`) + '_' + this.currentPointName, // this.translate.instant(`Freshwater Conductivity`) + '_' + this.currentPointName
  //       id: 2,
  //       keyName: 'Freshwater Electrical Conductivity',
  //       sensorId: this.currentSensorId,
  //       hide: true
  //     },
  //     {
  //       key: `waterQuantity` + '_' + this.currentPointName,
  //       value: this.cookieService.get('language') === 'en' ? 'Water Quantity' : this.translate.instant(`Water Quantity`) + '_' + this.currentPointName,
  //       id: 3,
  //       keyName: 'Water Quantity',
  //       sensorId: this.currentSensorId,
  //       hide: true
  //     },
  //     {
  //       key: `waterLevel` + '_' + this.currentPointName,
  //       value: this.cookieService.get('language') === 'en' ? 'Water Level' : this.translate.instant(`Water Level`) + '_' + this.currentPointName,
  //       id: 4,
  //       keyName: 'Water Level',
  //       sensorId: this.currentSensorId,
  //       hide: true
  //     },
  //     {
  //       key: `turbidity` + '_' + this.currentPointName,
  //       value: this.cookieService.get('language') === 'en' ? 'Turbidity' : this.translate.instant(`Turbidity`) + '_' + this.currentPointName,
  //       id: 5,
  //       keyName: 'Turbidity',
  //       sensorId: this.currentSensorId,
  //       hide: true
  //     },
  //     {
  //       key: `rawwaterlevel` + '_' + this.currentPointName,
  //       value: this.cookieService.get('language') === 'en' ? 'Raw Water Level' : this.translate.instant(`Raw Water Level`) + '_' + this.currentPointName,
  //       id: 6,
  //       keyName: 'Raw Water Level',
  //       sensorId: this.currentSensorId,
  //       hide: true
  //     },
  //     {
  //       key: `rawwaterquantity` + '_' + this.currentPointName,
  //       value: this.cookieService.get('language') === 'en' ? 'Raw Water Quantity' : this.translate.instant(`Raw Water Quantity`) + '_' + this.currentPointName,
  //       id: 7,
  //       keyName: 'Raw Water Quantity',
  //       sensorId: this.currentSensorId,
  //       hide: true
  //     },
  //     {
  //       key: `rawturbidity` + '_' + this.currentPointName,
  //       value: this.cookieService.get('language') === 'en' ? 'Raw Turbidity' : this.translate.instant(`Raw Turbidity`) + '_' + this.currentPointName,
  //       id: 8,
  //       keyName: 'Raw Turbidity',
  //       sensorId: this.currentSensorId,
  //       hide: true
  //     }
  //   );
  //   this.displayedColumns.map((x: any) => {
  //     this.dataColumns.push(x.key);
  //   });
  // }

  
  handleSelection(data: any, type: string): void {
      if (type === 'Area') {
      this.sensornames = [];
      this.dataPropertiesArray = [];
    }
    this.currentSelectedCity = this.todoService.getCurrentCity(); /*new code testing*/
    if (type === 'Point') {
      this.deletedSensorArray.push({data, type});
      if (this.sensornames.indexOf() === -1) {
        this.sensornames.push({data, type});
      }
      this.sensorRows.length = 0; /*testing*/
      this.dataPropertiesArray.length = 0; /*testing*/
      this.selectedFromDate = ''; /*testing*/
      this.selectedToDate = ''; /*testing*/
    }
    if (type === 'Area') {
      this.sensornames = [];
      this.dataPropertiesArray = [];
      this.handleSelectionData = data;
      this.handleSelectionType = type;
      this.todoService.setSelectedAreaData(data, type);
    }
    this.dropDownValue = []; // testing code
    /*    this.todoService.setSelectedAreaData(data, type);*/
    this.isPointSelected = true;
    switch (type) {
      // tslint:disable-next-line:max-line-length
      case 'Area':

        this.currentArea = data.areaid;
        this.currentAreaName = data.areaname;
        this.todoService.setAreaName(data.areaname);
        this.todoService.setAreaId(data.areaid);
        this.selectedPoint = true;
        this.getSensorsByArea(data.areaid);
        break;
      case 'Point':
        this.currentSensorId = data.mainSensorid;
        this.currentPointName = data.sensorname;
        this.todoService.setPointId(data.mainSensorid);
        this.todoService.setPointName(data.sensorname);
        break;
    }
  }

  // checkBoxvalue(checkBoxName: any, propertyName: string): void {
  //   this.dropdownList = [
  //     {id: 0, value: this.cookieService.get('language') === 'en' ? 'Date Time' : this.translate.instant(`Date Time`), key: 'dateTime'},
  //     {
  //       id: 1,
  //       value: this.cookieService.get('language') === 'en' ? 'Battery Voltage' : this.translate.instant(`Battery Voltage`),
  //       key: 'batteryVoltage'
  //     },
  //     {
  //       id: 2,
  //       value: this.cookieService.get('language') === 'en' ? 'Freshwater Electrical Conductivity' : this.translate.instant(`Freshwater Electrical Conductivity`),
  //       key: 'freshwaterConductivity'
  //     },
  //     {
  //       id: 3,
  //       value: this.cookieService.get('language') === 'en' ? 'Water Quantity' : this.translate.instant(`Water Quantity`),
  //       key: 'waterQuantity'
  //     },
  //     {
  //       id: 4,
  //       value: this.cookieService.get('language') === 'en' ? 'Water Level' : this.translate.instant(`Water Level`),
  //       key: 'waterLevel'
  //     },
  //     {id: 5, value: this.cookieService.get('language') === 'en' ? 'Turbidity' : this.translate.instant(`Turbidity`), key: 'turbidity'},
  //     {
  //       id: 6,
  //       value: this.cookieService.get('language') === 'en' ? 'Raw Water Level' : this.translate.instant(`Raw Water Level`),
  //       key: 'rawwaterlevel'
  //     },
  //     {
  //       id: 7,
  //       value: this.cookieService.get('language') === 'en' ? 'Raw Water Quantity' : this.translate.instant(`Raw Water Quantity`),
  //       key: 'rawwaterquantity'
  //     },
  //     {
  //       id: 8,
  //       value: this.cookieService.get('language') === 'en' ? 'Raw Turbidity' : this.translate.instant(`Raw Turbidity`),
  //       key: 'rawturbidity'
  //     }
  //   ];

  //   this.selectedItems = [
  //     {id: 0, value: this.translate.instant('Date Time'), key: 'dateTime'},
  //     {id: 1, value: this.translate.instant('Battery Voltage'), key: 'batteryVoltage'},
  //     {id: 2, value: this.translate.instant('Freshwater Electrical Conductivity'), key: 'freshwaterConductivity'},
  //     {id: 3, value: this.translate.instant('Water Quantity'), key: 'waterQuantity'},
  //     {id: 4, value: this.translate.instant('Water Level'), key: 'waterLevel'},
  //     {id: 5, value: this.translate.instant('Turbidity'), key: 'turbidity'},
  //     {id: 6, value: this.translate.instant('Raw Water Level'), key: 'rawwaterlevel'}, /*testing code*/
  //     {id: 7, value: this.translate.instant('Raw Water Quantity'), key: 'rawwaterquantity'}, /*testing code*/
  //     {id: 8, value: this.translate.instant('Raw Turbidity'), key: 'rawturbidity'} /*testing code*/
  //   ];
  //   this.dropdownSettings = {
  //     singleSelection: false,
  //     idField: 'id',
  //     textField: 'value',
  //     allowSearchFilter: false,
  //     enableCheckAll: false
  //   };
  //   const pointIndex = this.points.findIndex((x: { mainSensorid: any; }) => x.mainSensorid == checkBoxName.mainSensorid);
  //   if (pointIndex != -1) {
  //     this.pointName = checkBoxName.sensorname;
  //     this.selectedSensorData.push({name: checkBoxName.sensorname, id: checkBoxName.mainSensorid});
  //     this.sensorRows.push({
  //       sensorName: checkBoxName.sensorname,
  //       id: checkBoxName.mainSensorid,
  //       propertyArray: this.selectedItems,
  //       dropDown: this.dropdownList
  //     });
  //     this.points.splice(pointIndex, 1);
  //     // this.plotSensorData(this.currentSensorId);
  //   } else {
  //     this.selectedSensorData.pop(checkBoxName.sensorname);
  //     this.selectedSensorData.push({name: checkBoxName.sensorname, id: checkBoxName.mainSensorid});
  //   }
  // }

  getSensorsByArea(areaId: any): void {
        this.todoService.getSensorsByAreaId(areaId).subscribe((response: any) => {
        this.points = response;
        this.getAllSensorsData(this.points);
        // sessionStorage.setItem('currentSensors', JSON.stringify(this.points));
        this.reportData = [];
        this.dataColumns = [];
        this.displayedColumns = [];
        this.sensorRows = [];
      },
      error => {

      });
  }

  /* function that will call api to get all areas sensor data and store in one place */
  getAllSensorsData(sensorsArr: any): void {
    this.loading = true;
    this.mainArray = [];
    let arr: any = [];
    let itemsProcessed = 0;
    sensorsArr.map(async (element: any) => {
      this.dateFilter.fromDateTime = this.dateFilter.fromDateTime;
      arr = await this.todoService.getAllBySensorId(element.mainSensorid, this.dateFilter.fromDateTime).toPromise();
      if (arr) {
        itemsProcessed++;
      }
      this.mainArray.push({data: arr, id: element.mainSensorid});
      if (itemsProcessed === sensorsArr.length) {
        this.loading = false;
      }
      if (itemsProcessed === sensorsArr.length && this.currentSensorId > 0) {
        this.loading = false;
      }
    });

  }

  // prepareTableData(): void {
  //   if (this.displayedColumns.length > 0) {
  //     this.reportData = [];
  //     this.sensorRows.map((array: any, index: any) => {
  //       const dataIndex = this.mainArray.findIndex((x: { id: any; }) => x.id == array.id);
  //       const response = this.mainArray[dataIndex].data.waterFlowResponse;
  //       if (response != null) {
  //         let currentDate: any;
  //         response.map((element: any, id: any) => {
  //           const index = this.reportData.findIndex((x: any) => x == element.dateTime);
  //           if (index == -1) {
  //             this.dateArray.push({dateTime: element.dateTime});
  //             currentDate = element.dateTime;
  //           }
  //           this.reportData.push({
  //             [`dateTime` + '_' + array.sensorName]: currentDate,
  //             [`batteryVoltage` + '_' + array.sensorName]: element.batteryVoltage,
  //             [`freshwaterConductivity` + '_' + array.sensorName]: element.freshwaterConductivity,
  //             [`waterQuantity` + '_' + array.sensorName]: element.waterQuantity,
  //             [`waterLevel` + '_' + array.sensorName]: element.waterLevel,
  //             [`turbidity` + '_' + array.sensorName]: element.turbidity,
  //             [`rawwaterlevel` + '_' + array.sensorName]: element.adc0, /*testing sample code*/
  //             [`rawwaterquantity` + '_' + array.sensorName]: element.waterQuantity, /*testing sample code*/
  //             [`rawturbidity` + '_' + array.sensorName]: element.adc1, /*testing sample code*/
  //             sensorId: array.id
  //             // sensorName: this.currentPointName,
  //           });
  //         });
  //       }
  //     });
  //   } else {
  //     this.reportData = [];
  //     return;
  //   }

  // }

  resetData(): any {
    this.points = [];
    this.selectedPoint = false;
    this.currentSensorId = 0;
    this.reportData = [];
    this.sensorRows = [];
    this.dataColumns = [];
    this.displayedColumns = [];
  }

  showRawConvertedData(fromDateTime: any, toDateTime: any, dataForm: any): void {
    this.reportData = [];
    this.dataPropertiesArray = [];
 
  
    if(fromDateTime == ''){
      this.snotifyService.error(this.translate.instant('Enter From Date & Time'), '');
      return;
    }
    if(toDateTime ==''){
      this.snotifyService.error(this.translate.instant('Enter To Date & Time'), '');
      return;
    }
    if(fromDateTime > toDateTime){
      this.snotifyService.error(this.translate.instant('To Date should be greater than or equal to From Date'), '');
      return;
    }

    this.fromToArray.push(moment(fromDateTime).format('YYYY/MM/DD hh:MM A'));
    this.fromToArray.push(moment(toDateTime).format('YYYY/MM/DD hh:MM A'));

    for (let y = 0; y < this.sensornames.length; y++) {
      const dateTimeData = {
        mainSensorID: this.sensornames[y].data.mainSensorid,
        fromDate: moment(fromDateTime).format('YYYY/MM/DD hh:MM A'),
        toDate: moment(toDateTime).format('YYYY/MM/DD hh:MM A')
      };
      this.spinner.show();
      if ((fromDateTime && toDateTime) || !(fromDateTime && toDateTime)) {
        if (dataForm === 'Converted' && ((fromDateTime && toDateTime))) {
          this.todoService.getAllByMainSensorIdAndMultipleDates(dateTimeData).subscribe((response: any) => {
            
            for (let i = 0; i < response.waterFlowResponse.length; i++) {
              this.dataPropertiesArray.push(response.waterFlowResponse[i]);
            }
            this.spinner.hide();
          });
        }
        if (dataForm === 'Raw' && ((fromDateTime && toDateTime))) {
          this.todoService.getAllByMainSensorIdAndMultipleDates(dateTimeData).subscribe((response: any) => {
                     for (let i = 0; i < response.waterFlowResponse.length; i++) {
              this.dataPropertiesArray.push(response.waterFlowResponse[i]);
            }
              this.spinner.hide();
          });
        }
      }
    }
  }


  // check function working
  onSubmit(): void {
    
    this.dropDownValue = [];
    this.currentDataForm = this.dataFormGroup.value.rawConverted;
    this.showRawConvertedData(this.dataFormGroup.value.fromdatetime, this.dataFormGroup.value.todatetime, this.dataFormGroup.value.rawConverted);
  }
  
  /*new code starts*/
  remove(sensorName: any): any {
    const index = this.sensornames.indexOf(sensorName);
    if (index >= 0) {
      let removedElement: any;
      for (let i = 0; i < this.deletedSensorArray.length; i++) {
        if (sensorName.data.sensorname === this.deletedSensorArray[i].data.sensorname) {
          removedElement = this.deletedSensorArray.splice(index, 1);

          break;
        }
      }
      this.points.push(removedElement[0].data);
      this.sensornames.splice(index, 1);
      this.dataPropertiesArray.splice(index, 1);
    }
  }

  /*new code ends*/
}
