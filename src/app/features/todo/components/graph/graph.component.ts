import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { TodoService } from 'src/app/services/todo.service';
import { HttpClient } from '@angular/common/http';
import { filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import * as signalR from '@microsoft/signalr';
// @ts-ignore
import { SnotifyService, SnotifyToast } from 'ng-snotify';
import { MatSort } from '@angular/material/sort';
import { BaseChartDirective } from 'ng2-charts';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { DateTimeAdapter } from 'ng-pick-datetime';


const sortObjectsArray = require('sort-objects-array');

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
  
})



export class GraphComponent implements OnInit {
  /*testing code starts*/
  pointValue: any | undefined;
  dropDownData: any | undefined;
  sensorMeasurementValue = 0; /*testing*/
  rateOfChangeValue = 0; /*testing*/
  alarmDeadZoneValue = 0; /*testing*/
  displayValue = 0; /*testing*/
  alarmSetValueUpper = 0; /*testing*/
  alarmSetValueLower = 0; /*testing*/
  rc = 0;
  charCode: any;
  statusBoolean = true;
  thresholdRateOfChange: any = 0;
  thresholdDeadZone: any = 0;
  thresholdCorrectionWidth: any = 0;
  dataPropertyGridArray: any = [];
  updateToggle = false;
  addToggle = false;
  selectedPropertyValue = '';
  thresholdAPIResponse: any;
  selectedSensorPropertyArray: any = [];
  /*testing code ends*/
  tabIndex: any;
  dataFormGroup = new FormGroup({});
  fdtime: any = [];
  tdtime: any = [];
  currentTime = new Date();
  currentCityId: any;
  selectedSensor: any = '';
  handleSelectionData: any;
  handleSelectionType: any;
  selectedAreaData: any;
  isPointSelected = false;
  globalAreaId: any;
  isArrowDown = true;
  globalAreaName: string | null = '';
  currentLang = ''; // SAMPLE TEST CODE
  @ViewChild(MatSort) sort?: MatSort;
  /* View child properties */
  @ViewChild(BaseChartDirective)
  chart!: BaseChartDirective;
  /*Settings properties initialised */
  presentMin = 0;
  presentMax = 0;
  dataPointName: any;
  flag = true;
  upperUpper = 0;
  upper = 0;
  lower = 0;
  lowerLower = 0;
  changeOfRate = 0;
  alarmDeadMin = 0;
  alarmDeadMax = 0;
  upperLower = 0;
  upperLowerMax = 0;
  presentValueArray: any;
  deadZoneArray: any;
  updateThresholdArray: any = [];
  updateThresholdArray1: any = [];
  /*Table properties and initialisations */

  displayedColumns = ['Time Stamp', 'Battery Voltage', 'Freshwater Electrical Conductivity', 'Water Quantity', 'Water Level', 'Turbidity', 'Seawater Electrical Conductivity', 'Water Temperature'];
  dataSource?: any;
  start = 0;
  limit = 10;
  end: number = this.limit + this.start;
  sensorPrimaryId = '';
  pointName: any = '';
  currentMaintenaceid: any = '';
  recordingCycle = 0;
  recordingCycleInitial = 0;
  transmissionCycle = 0;
  transmissionCycleInitial = 0;
  alertLevel = 0;
  upperUpperLimit = '';
  upperLimit = '';
  lowerLowerLimit = '';
  lowerLimit = '';
  rateOfChange = '';
  deadZone = '';
  upperLowerLimitCorrectionWidth = '';
  sensorSettingsArray: any = [];
  clickEVentSubscription?: Subscription;
  langEVentSubscription?: Subscription;
  dt: any;
  selectedHour = '1 Day';
  batteryVoltageAverage = 0;
  freshwaterConductivityAverage = 0;
  waterQuantityAverage = 0;
  waterLevelAverage = 0;
  turbidityAverage = 0;
  currentSensorId = 0;
  currentArea = 0;
  seaWaterElectricalConductivityAverage = 0; /*testing*/
  seaWaterElectricalConductivityArray: any = []; /*testing*/
  waterTemperatureAvearage = 0; /*testing*/
  waterTemperatureArray: any = []; /*testing*/
  mainArray: any = [];
  turbidityArray: any = [];
  waterLevelArray: any = [];
  waterQuantityArray: any = [];
  freshwaterConductivityArray: any = [];
  batteryVoltageArray: any = [];
  batteryVoltageDataArray: any = [];
  freshwaterConductivityDataArray: any = [];
  waterQuantityDataArray: any = [];
  waterLevelDataArray: any = [];
  turbidityDataArray: any = [];
  sensorsFilteredData: any[] = [];
  widgetsData: any = [];
  alertsArray: any = [];
  points: any[] = [];
  areas: any[] = [];
  filterationObject: any = {
    dateFilter: null
  };
  filteredDate: any;

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  options: any;
  /*viewType = 'list';*/
  viewType = 'graph';
  areaName = 'Selected Area';
  currentAreaName = '';
  currentPointName = '';
  /*currentView = 'list';*/
  currentView = 'graph'; /*testing code*/
  selectedArea = false;
  selectedPoint = false;
  loading = false;
  loadingSetting = false;
  cityChanged = false;
  browserLang: any;


  lineChartData: any[] = [
    { data: this.waterQuantityDataArray, label: 'Water Quantity(m3/sec)' },
    { data: this.waterLevelDataArray, label: 'Water Level(m)' },

    { data: this.freshwaterConductivityDataArray, label: 'Freshwater Electrical Conductivity(μS/cm)' },
    { data: this.seaWaterElectricalConductivityArray, label: 'Seawater Electrical Conductivity(ms/cm)' },
    { data: this.waterTemperatureArray, label: 'Water Temperature(°C)' }, /*testing*/
    { data: this.turbidityDataArray, label: 'Turbidity(度)' },

    { data: this.batteryVoltageDataArray, label: `Battery Voltage(V)` },
  ];


  /*TESTING SAMPLE CODE STARTS*/
  lineChartDataJP: any[] = [
    { data: this.waterQuantityDataArray, label: '流量(m3/sec)' },
    { data: this.waterLevelDataArray, label: '水深(m)' },

    { data: this.freshwaterConductivityDataArray, label: '淡水電気伝導度(μS/cm)' },
    { data: this.seaWaterElectricalConductivityArray, label: '海水電気伝導度(ms/cm)' },
    { data: this.waterTemperatureArray, label: '温度(°C)' },
    { data: this.turbidityDataArray, label: '濁度(度)' },

    { data: this.batteryVoltageDataArray, label: 'バッテリー電圧(V)' },
  ];
  /*TESTING SAMPLE CODE ENDS*/

  lineChartLabels: any[] = [];
  lineChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: this.cookieService.get('language') === 'en' ? 'Time Stamp' : this.translate.instant('Time Stamp')
        }
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: this.cookieService.get('language') === 'en' ? 'Value' : this.translate.instant('Value')
        }
      }]
    }
  };

  lineChartColors: any[] = [
    {
      borderColor: '#7a7afb',
    backgroundColor : '#7a7afb'
    },
    {
      borderColor: '#fc6f8f',
      backgroundColor : '#fc6f8f'
    },
    {
      borderColor: '#40ccbd',
      backgroundColor : '#40ccbd'
    },
    {
      borderColor: '#a12727',
      backgroundColor : '#a12727'
    },
    {
      borderColor: '#bd8432',
      backgroundColor : '#bd8432'
    },
    {
      borderColor: '#4e82ae',
      backgroundColor : '#4e82ae'
    },
    {
      borderColor: 'white',
      backgroundColor : '#7c6efb'
    },



  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  pointDetail: any = {
    areaSensor: 0,
    cityArea: 0
  };
  newArray: any = [];
  widgetsDataArray: any;
  dateFormat = 'y/M/d';
  date: any;


  constructor(public todoService: TodoService,
    private spinner: NgxSpinnerService, public http: HttpClient,
    private router: Router, private toastr: ToastrService,
    private cookieService: CookieService, private snotifyService: SnotifyService,
    private translate: TranslateService,
    private datePipe: DatePipe,private dateTimeAdapter: DateTimeAdapter<any>) {
     
    this.filterBySensor(this.currentSensorId, this.viewType); /**/
    this.clickEVentSubscription = this.todoService.getClickEvent().subscribe(() => {
      this.callFun();
    });
    this.langEVentSubscription = this.todoService.getLangEvent().subscribe(() => {
      this.setChartTranslations();
    });
    this.router.events
      .pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
      .subscribe(event => {
        if (
          event.id === 1 &&
          event.url === event.urlAfterRedirects
        ) {
          this.clearCookies();
        }
      });

    /*TESTING SAMPLE CODE START*/



    translate.onLangChange.subscribe(lang => {
      this.browserLang = lang;
    });

    this.dataFormGroup = new FormGroup({
      fromdatetime: new FormControl(),
      todatetime: new FormControl()
    });

    this.datePickerlang()
  }
 
  datePickerlang(){
       
   const lang = sessionStorage.getItem("lang")
 
   this.todoService.languageData.subscribe(
     (data: any) => {
       
       if(data == 'jp'){
         this.dateTimeAdapter.setLocale('ja-JP');
       }else if(data == 'en'){
         this.dateTimeAdapter.setLocale('en');
       }else{
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


  
  ngOnInit(): void {
    this.pointDetail.cityArea = [];

    this.globalAreaId = this.todoService.getSelectedAreaId();
    this.selectedAreaData = this.todoService.getSelectedAreaData(); // testing code
    /*TESTING CODE STARTS*/
    this.currentCityId = this.todoService.getCityId();
    if (this.currentCityId !== 0) {
      this.todoService.getAreaByCity(this.currentCityId).subscribe((response: any) => {
        this.areas = [];
        for (let i = 0; i < response.length; i++) {
          this.areas.push(response[i]);
        }
      });
    }

    if (this.selectedAreaData !== '' && this.selectedAreaData[0] !== undefined && this.selectedAreaData[1] !== undefined) {
      this.handleSelection(this.selectedAreaData[0], this.selectedAreaData[1]);
    }
    /*TESTING CODE ENDS*/
    this.globalAreaName = this.todoService.getSelectedAreaName();
    this.currentLang = this.cookieService.get('language'); // TESTING CODE
    /*this.currentLang = this.todoService.selectedLanguage; */ // TESTING CODE
    this.updateThresholdArray = [];
    this.startConnection();
    const areas = sessionStorage.getItem('cityAreas'); // session has city areas stored which were previously selected;
    const dataExists = sessionStorage.getItem('lastSelected'); // area , sensor selected last time is stored in this;
    const sensors: any = sessionStorage.getItem('currentSensors'); // session has sensors list stored in this;
    const mainData: any = sessionStorage.getItem('mainData'); // session has sensors data stored in this;
    const selectedCity = this.todoService.getSelectedCity();
    const selectedCityId = this.todoService.getCityId();
    const locationData: any = sessionStorage.getItem('lastSelected');
    const date: any = sessionStorage.getItem('selectedDate');
    const data = JSON.parse(locationData);
    if (data && data.cityId === selectedCityId) {
      if (areas && selectedCity !== '') {
        this.areas = JSON.parse(areas);
        if (sensors) {
          this.points = JSON.parse(sensors);
        } else {
          this.points = [];
        }
        if (mainData) {
          this.mainArray = JSON.parse(mainData);
        } else {
          this.mainArray = [];
          this.filterationObject.dateFilter = null;
        }
        if (date != null) {
          this.filterationObject.dateFilter = date;
        } else {
          this.filterationObject.dateFilter = moment(new Date()).format('YYYY-MM-DD');
        }
        if (dataExists) {
         
          const locationData: any = sessionStorage.getItem('lastSelected');
         
          const data = JSON.parse(locationData);
          this.currentAreaName = data.areaName ? data.areaName : '';
          this.currentPointName = data.pointName ? data.pointName : '';
          this.currentArea = data.areaId ? data.areaId : 0;
          this.pointDetail.cityArea = this.currentArea;
          this.selectedPoint = data.areaId > 0 ? true : false;
          this.currentSensorId = data.sensorId ? data.sensorId : 0;
          if (this.globalAreaId) {
            this.selectedPoint = true;
            this.pointDetail.areaSensor = '';
            this.isPointSelected = false;
            this.currentSensorId = 0;
          }
          if (this.currentSensorId > 0) {
            this.pointDetail.areaSensor = this.currentSensorId;
            this.filterBySensor(this.currentSensorId, this.viewType);
          } else {
            return;
          }
        } else {
          return;
        }
      } else {
        return;
      }

    } else {
      this.getAreaByCity();
    }

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.browserLang = event.lang;
    });
  
    if (this.thresholdAPIResponse[4].dataPointNameToDisplay === 'Turbidity') {

      this.newArray = this.thresholdAPIResponse[4].upperUpperLimit.toFixed(5);
    }


  }

  /* Function for getting real time data */
  startConnection(): void {
    const connection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Information)
      .withUrl(`https://d1rh4b0dx4fns2.cloudfront.net/StartUpLiveDataUrl`)
      .build();
    connection.start().then(function () {
    }).catch(function (err) {
    });

    connection.on('BroadcastLiveData', () => {
      this.getLiveData();
    });
    const connection2 = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Information)
      .withUrl(`https://d1rh4b0dx4fns2.cloudfront.net/StartUpNotificationUrl`)
      .build();

    connection2.start().then(function () {
    }).catch(function (err) {

    });

    connection2.on('BroadcastAlertData', (messageText) => {

      this.getAlertData(messageText);
    });
  }

  bindWidgets(): void {

    this.batteryVoltageArray = this.sensorsFilteredData.map((x: any) => x.batteryVoltage);
    this.batteryVoltageAverage = (this.batteryVoltageArray.reduce((acc: any, cur: any) => acc + cur, 0)) / this.batteryVoltageArray.length;
    this.freshwaterConductivityArray = this.sensorsFilteredData.map((x: any) => x.freshwaterConductivity);
    this.freshwaterConductivityAverage = (this.freshwaterConductivityArray.reduce((acc: any, cur: any) => acc + cur, 0)) / this.freshwaterConductivityArray.length;
    this.waterQuantityArray = this.sensorsFilteredData.map((x: any) => x.waterQuantity);
    this.waterQuantityArray = this.waterQuantityArray.map((i: any) => Number(i));
    this.waterQuantityAverage = (this.waterQuantityArray.reduce((acc: any, cur: any) => acc + cur, 0)) / this.waterQuantityArray.length;

    this.waterLevelArray = this.sensorsFilteredData.map((x: any) => x.waterLevel);
    this.waterLevelArray = this.waterLevelArray.map((i: any) => Number(i));
    this.waterLevelAverage = (this.waterLevelArray.reduce((acc: any, cur: any) => acc + cur, 0)) / this.waterLevelArray.length;
    this.turbidityArray = this.sensorsFilteredData.map((x: any) => x.turbidity);
    this.turbidityArray = this.turbidityArray.map((i: any) => Number(i));
    this.turbidityAverage = (this.turbidityArray.reduce((acc: any, cur: any) => acc + cur, 0)) / this.turbidityArray.length;
    // this.turbidityAverage  = this.turbidityAverage.toFixed(1)
    
    /*TESTING SAMPLE CODE STARTS*/
    this.seaWaterElectricalConductivityArray = this.sensorsFilteredData.map((x: any) => x.saltwaterConductivity);
    this.seaWaterElectricalConductivityAverage = (this.seaWaterElectricalConductivityArray.reduce((acc: any, cur: any) => acc + cur, 0)) / this.seaWaterElectricalConductivityArray.length;
    this.waterTemperatureArray = this.sensorsFilteredData.map((x: any) => x.waterTemprature);
    this.waterTemperatureAvearage = (this.waterTemperatureArray.reduce((acc: any, cur: any) => acc + cur, 0)) / this.waterTemperatureArray.length;
    /*TESTING SAMPLE CODE ENDS*/

    this.widgetsData = [
      { name: 'Water Quantity', value: this.waterQuantityAverage.toFixed(3), unit: 'gpm' },
      { name: 'Water Level', value: this.waterLevelAverage.toFixed(3), unit: 'm' },
      { name: 'Freshwater Electrical Conductivity', value: this.freshwaterConductivityAverage.toFixed(3), unit: 'μS/cm' },
      { name: 'Seawater Electrical Conductivity', value: this.seaWaterElectricalConductivityAverage.toFixed(3), unit: 'ms/cm' },
      { name: 'Water Temperature', value: this.waterTemperatureAvearage.toFixed(3), unit: '°C' },
      { name: 'Turbidity', value: this.turbidityAverage.toFixed(1), unit: 'degree' },
      { name: 'Battery Voltage',value: this.batteryVoltageAverage.toFixed(3),unit: 'V'},
    ];
  }

 
  setChartTranslations(): void {
    if (this.chart && this.chart.chart && this.chart.chart.config) {
      this.chart.chart.options.scales = {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: this.cookieService.get('language') === 'en' ? 'Value' : '値'
          }
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: this.cookieService.get('language') === 'en' ? 'Time Stamp' : 'タイムスタンプ'
          }
        }]
      };
      this.chart.chart.update();
    }
  }

 
  filterBySensor(sensorId: any, viewType: string): void {

    if (sensorId === 0) {
      return;
    }
    this.todoService.getAllSensorTypes().subscribe((response: any) => { 
      this.selectedSensorPropertyArray = response.sensorTypeResponses;
    });

    this.currentSensorId = sensorId;
    this.todoService.getThresholdValuesByMainSensorId(sensorId).subscribe((response: any) => {
    
      this.thresholdAPIResponse = response;

      if (this.thresholdAPIResponse[4].dataPointNameToDisplay === 'Turbidity') {
        this.newArray = this.thresholdAPIResponse[4].upperUpperLimit.toFixed(5);
      }
      this.thresholdAPIResponse.forEach((item: any) => {
        const data = this.selectedSensorPropertyArray.filter((x: any) => x.sensorTypeId === item.dataPointName);
        if (data.length > 0) {
          item.dataPointNameToDisplay = data[0].dataPointNameToDisplay;
        } else {
          item.dataPointNameToDisplay = '';
        }
      });

      if (this.thresholdAPIResponse.length > 0) {
        this.thresholdCorrectionWidth = this.thresholdAPIResponse[0].upperAndLowerLimitCorrectionWidth;
        this.thresholdDeadZone = this.thresholdAPIResponse[0].deadZone;
        this.thresholdRateOfChange = this.thresholdAPIResponse[0].rateOfChange;
        this.sensorMeasurementValue = this.thresholdAPIResponse[0].sensorMeasurementValue; /*testing code*/
        this.rateOfChangeValue = this.thresholdAPIResponse[0].rateOfChangeValue; /*testing code*/
        this.alarmDeadZoneValue = this.thresholdAPIResponse[0].deadZoneValue; /*testing code*/
      }

      if (sensorId === 0) {
        return;
      }

      this.todoService.setSelectedAreaData(this.handleSelectionData, this.handleSelectionType);
      this.selectedAreaData = this.todoService.getSelectedAreaData(); // testing code
      this.upperLower = 0;
      this.upperLowerMax = 0;
      this.upper = 0;
      this.presentMin = 0;
      this.presentMax = 0;
      this.upperUpper = 0;
      this.lowerLower = 0;
      this.lower = 0;
      this.changeOfRate = 0;
      this.alarmDeadMin = 0;
      this.recordingCycle = 0;
      this.transmissionCycle = 0;
      this.alertLevel = 0;
      this.recordingCycleInitial = 0;
      this.transmissionCycleInitial = 0;
      this.setChartTranslations();
      this.start = 0;
      this.limit = 15;
      this.end = this.limit + this.start;
      this.currentSensorId = Number(sensorId);
      if (this.filteredDate) {
        this.filterationObject.dateFilter = moment(this.filteredDate).format('YYYY-MM-DD');
      } else {
        this.filterationObject.dateFilter = this.filterationObject.dateFilter;
      }

      const index = this.mainArray.findIndex((x: { id: any; }) => x.id === String(sensorId));

      if (index === -1) {
        return;
      }
      /*test code ends*/
      const waterFlowRespons = this.mainArray[index].data.waterFlowResponse;
      if (waterFlowRespons != null) {
        this.sensorsFilteredData = waterFlowRespons;
        this.dataSource = this.getTableData(this.start, this.end);
        this.updateIndex();
        this.bindWidgets();
        if (viewType === 'list') {
          this.viewType = viewType;
          this.batteryVoltageDataArray = this.sensorsFilteredData.map(x => x.batteryVoltage);
          this.freshwaterConductivityDataArray = this.sensorsFilteredData.map(x => x.freshwaterConductivity);
          this.waterQuantityDataArray = this.sensorsFilteredData.map(x => x.waterQuantity);
          this.waterLevelDataArray = this.sensorsFilteredData.map(x => x.waterLevel);
          this.turbidityDataArray = this.sensorsFilteredData.map(x => x.turbidity);
          this.lineChartLabels = this.sensorsFilteredData.map(x => this.datePipe.transform(x, 'yyyy/MM/dd/ hh:MM'));
          // this.lineChartLabels = this.sensorsFilteredData.map(x => x.dateTime);
        } else if (this.viewType === 'graph') {
          this.viewType = viewType;
          if (this.currentSensorId === 0) {
            return;
          } else {

            this.resetLabelsData();
            this.batteryVoltageDataArray = this.sensorsFilteredData.map(x => x.batteryVoltage);
            this.freshwaterConductivityDataArray = this.sensorsFilteredData.map(x => x.freshwaterConductivity);
            this.waterQuantityDataArray = this.sensorsFilteredData.map(x => x.waterQuantity);
            this.waterLevelDataArray = this.sensorsFilteredData.map(x => x.waterLevel);
            this.turbidityDataArray = this.sensorsFilteredData.map(x => x.turbidity);
            this.seaWaterElectricalConductivityArray = this.sensorsFilteredData.map(x => x.saltwaterConductivity); /*testing*/
            this.waterTemperatureArray = this.sensorsFilteredData.map(x => x.waterTemprature); /*testing*/
            this.lineChartLabels = [];
            // tslint:disable-next-line:no-shadowed-variable

            this.sensorsFilteredData.map(element => {

              this.lineChartLabels.push(element.dateTime);
              this.widgetsDataArray = element




            });
            this.lineChartData[0].data = this.batteryVoltageDataArray;
            this.lineChartData[1].data = this.freshwaterConductivityDataArray;
            this.lineChartData[2].data = this.waterQuantityDataArray;
            this.lineChartData[3].data = this.waterLevelDataArray;
            this.lineChartData[4].data = this.turbidityDataArray;
            this.lineChartData[5].data = this.seaWaterElectricalConductivityArray; /*testing*/
            this.lineChartData[6].data = this.waterTemperatureArray; /*testing*/


            this.lineChartDataJP[0].data = this.batteryVoltageDataArray;
            this.lineChartDataJP[1].data = this.freshwaterConductivityDataArray;
            this.lineChartDataJP[2].data = this.waterQuantityDataArray;
            this.lineChartDataJP[3].data = this.waterLevelDataArray;
            this.lineChartDataJP[4].data = this.turbidityDataArray;
            this.lineChartDataJP[5].data = this.seaWaterElectricalConductivityArray; /*testing*/
            this.lineChartDataJP[6].data = this.waterTemperatureArray; /*testing*/

          }
        } else if (this.viewType === 'settings') {
          this.viewType = viewType;
          this.callThresholdFunc();
        } else if (this.viewType === 'maintenance') {
          this.viewType = viewType;
          this.callMaintenanceFunc();
        } else {
          return;
        }
      } else {
        this.sensorsFilteredData = [];
        this.widgetsData = [];
      }
      // tslint:disable-next-line:no-shadowed-variable
      this.loadingSetting = true;
      this.upperLower = 0;
      if (response.length > 0) {
        /*testing code starts*/
        this.selectedPropertyValue = '';
        for (let i = 0; i < this.selectedSensorPropertyArray.length; i++) {
          if (this.dataPointName === this.selectedSensorPropertyArray[i].sensorTypeId) {
            this.selectedPropertyValue = this.selectedSensorPropertyArray[i].dataPointNameToDisplay;
            this.updateToggle = true; /*testing code for update toggle*/
            this.addToggle = false; /*testing code for */
            break;
          }
        }
        /*testing code ends*/




        this.loadingSetting = false;
        this.updateThresholdArray = response[0];
        this.presentValueArray = (response[0].presentValue.toString()).split('-');
        this.deadZoneArray = (response[0].deadZone.toString()).split('-');
        this.upperUpper = response[0].upperUpperLimit;
        this.upper = 0;
        this.upper = response[0].upperLimit;
        this.lower = response[0].lowerLimit;
        this.lowerLower = response[0].lowerLowerLimit;
        this.changeOfRate = response[0].rateOfChange;
        this.presentMin = this.presentValueArray[0];
        this.presentMax = this.presentValueArray[1];
        this.alarmDeadMin = this.deadZoneArray[0];
        this.alarmDeadMax = this.deadZoneArray[1];
        this.upperLower = response[0].upperAndLowerLimitCorrectionWidth;
        this.dataPointName = response[0].dataPointName;

      } else {
        this.loading = false;
      }
    }, error => {
      this.loadingSetting = false;
      /*DO NOTHING*/
    });

    this.todoService.getMaintenanceByMainSensorId(sensorId).subscribe((response: any) => {

      this.loadingSetting = false;
      this.recordingCycleInitial = response[0].recordingCycleInitial;
      this.currentMaintenaceid = response[0].id;
      this.transmissionCycleInitial = response[0].transmissionCycleInitial;
      this.recordingCycle = response[0].recordingCycle;
      this.transmissionCycle = response[0].transmissionCycle;
      this.alertLevel = response[0].alertLevel;
      this.pointName = response[0].name;
      const request = {
        initialRecording: this.recordingCycleInitial,
        initialTransmission: this.transmissionCycleInitial
      };

      sessionStorage.setItem('initialValues', JSON.stringify(request));
    }, error => {
      this.loadingSetting = false;
    });


  }

  /* Functions for virtual scroll starts */
  getTableData(start: any, end: any): any {
    /*return this.sensorsFilteredData.filter((value, index) => index >= start && index < end);*/
    return this.sensorsFilteredData.filter((value: any, index: number) => index >= start && index < end);
  }

  updateIndex(): void {
    this.start = this.end;
    this.end = this.limit + this.start;
  }

  onTableScroll(e: any): void {
     const tableViewHeight = e.target.offsetHeight; // viewport
    const tableScrollHeight = e.target.scrollHeight; // length of all table
    const scrollLocation = e.target.scrollTop; // how far user scrolled
    const buffer = 200;
    const limit = tableScrollHeight - tableViewHeight - buffer;
    if (scrollLocation > limit) {
      const data = this.getTableData(this.start, this.end);
      this.dataSource = this.dataSource?.concat(data);
      this.updateIndex();
    }
  }

  /* api call for getting settings tab data */
  getSensorSettings(sensorId: any): void {
    this.todoService.getMaintenanceByMainSensorId(sensorId).subscribe((response: any) => {
      if (response.length > 0) {
        for (let i = 0; i < response.length; i++) {
          this.pointName = this.currentPointName; // response[i].name
          this.recordingCycle = response[i].recordingCycle;
          this.currentMaintenaceid = response[i].id;
          this.recordingCycleInitial = response[i].recordingCycleInitial;
          this.transmissionCycle = response[i].transmissionCycle;
          this.transmissionCycleInitial = response[i].transmissionCycleInitial;
          this.alertLevel = response[i].alertLevel;
          this.sensorPrimaryId = response[i].id;
        }
      } else if (response.length === 0) {
        this.snotifyService.error(this.translate.instant('Maintenance Setting not available'), '', {
          timeout: 2000,
          showProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true
        });
      }
    }, error => {
      this.loadingSetting = false;
    });
    this.todoService.getThresholdValuesByMainSensorId(sensorId).subscribe((response: any) => {
      this.loadingSetting = false;

      if (response.length > 0) {
        this.sensorSettingsArray = response;
        // tslint:disable-next-line:prefer-for-of
        for (let j = 0; j < response.length; j++) {
          this.upperUpper = response[j].upperUpperLimit;
          this.upper = response[j].upperLimit;
          this.lower = response[j].lowerLimit;
          this.lowerLower = response[j].lowerLowerLimit;
          this.rateOfChange = response[j].rateOfChange;
          this.deadZone = response[j].deadZone;
          this.upperLowerLimitCorrectionWidth = '4';
          this.dataPointName = response[j].dataPointName;
        }

      } else {
        this.upperUpperLimit = '';
        this.upperLimit = '';
        this.lowerLowerLimit = '';
        this.lowerLimit = '';
        this.rateOfChange = '';
        this.deadZone = '';
        this.upperLowerLimitCorrectionWidth = '';

        this.recordingCycle = 0;
        this.recordingCycleInitial = 0;
        this.transmissionCycle = 0;
        this.transmissionCycleInitial = 0;
        this.alertLevel = 0;
        this.snotifyService.error(this.translate.instant('No settings available for selected sensor'), '', {
          timeout: 2000,
          showProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true
        });
        this.loadingSetting = false;
      }
    }, error => {
      this.loadingSetting = false;
    });
  }

  /*reset the labels of linechart*/
  resetLabelsData(): void {
    this.lineChartData[0].data = [];
    this.lineChartData[1].data = [];
    this.lineChartData[2].data = [];
    this.lineChartData[3].data = [];
    this.lineChartData[4].data = [];
    this.lineChartData[5].data = this.seaWaterElectricalConductivityArray; /*testing*/
    this.lineChartData[6].data = this.waterTemperatureArray; /*testing*/

    /*TESTING SAMPLE CODE STARTS*/
    this.lineChartDataJP[0].data = [];
    this.lineChartDataJP[1].data = [];
    this.lineChartDataJP[2].data = [];
    this.lineChartDataJP[3].data = [];
    this.lineChartDataJP[4].data = [];
    this.lineChartDataJP[5].data = this.seaWaterElectricalConductivityArray; /*testing*/
    this.lineChartDataJP[6].data = this.waterTemperatureArray; /*testing*/
    /*TESTING SAMPLE CODE ENDS*/
  }

  // gets called when we change city from dropdown
  callFun(): void {

    /*-------------------*/
    this.currentPointName = '';
    this.upperLower = 0;
    this.upper = 0;
    this.presentMin = 0;
    this.presentMax = 0;
    this.upperUpper = 0;
    this.lowerLower = 0;
    this.lower = 0;
    this.changeOfRate = 0;
    this.alarmDeadMin = 0;
    this.recordingCycle = 0;
    this.transmissionCycle = 0;
    this.alertLevel = 0;
    this.recordingCycleInitial = 0;
    this.transmissionCycleInitial = 0;
    /*-------------------*/


    this.cityChanged = true;
    const data: any = sessionStorage.getItem('allAreas');
    const areaData = JSON.parse(data);
    this.areas = areaData.filter((x: { cityid: any; }) => x.cityid == this.cityId);
    sessionStorage.setItem('cityAreas', JSON.stringify(this.areas));
    this.points = [];
    this.selectedPoint = false;
    this.currentSensorId = 0;
    this.currentSensorId = 0;
    this.widgetsData = [];
    this.filterationObject.dateFilter = null;
    this.pointDetail.areaSensor = 0;
    this.pointDetail.cityArea = 0;
    this.sensorsFilteredData = [];
    this.resetSensorSettings();
  }

  clearCookies(): void {
    //sessionStorage.clear();
  }


  handleSelection(data: any, type: string): void {
    if (type === 'Point') {
      
      this.pointValue = data.sensorname;
      this.selectedSensor = data.mainSensorid;
 if( this.fdtime == '' && this.tdtime ==  ''){
  this.fdtime = new Date(Date.now() - 86400 * 1000).toISOString()
  this.tdtime =  new Date()
 }
      
      this.todoService.setDropDownSelectedPoint(data);
     }
    /*testing code ends*/
    if (type === 'Area') {
      this.fdtime = '';
      this.tdtime =  '';
      this.handleSelectionData = data;
      this.handleSelectionType = type;
      /*this.pointValue = this.todoService.getDropDownSelectedPoint(); */
      this.todoService.setSelectedAreaData(data, type);
    }

    this.isPointSelected = true;
    /*TESTING SAMPLE CODE STARTS*/
    this.pointName = '';
    this.dataPointName = '';
    this.currentPointName = '';
    if (data === undefined || data === null || data === '') {
      return;
    } else {
      if (data.areaname === this.currentAreaName && this.cityChanged === false) {
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
          
            }
            break;
          case 'Point':
            this.currentSensorId = data.mainSensorid;
            this.currentPointName = data.sensorname;
            this.todoService.setPointId(data.mainSensorid);
            this.todoService.setPointName(data.sensorname);
            break;
          case 'Hour':
            this.selectedHour = data.name;
            break;
        }
        const requestData = {
          areaName: this.currentAreaName,
          pointName: this.currentPointName,
          areaId: this.currentArea,
          cityId: this.cityId,
          sensorId: this.currentSensorId,
          boolean: this.selectedPoint,
        };
        sessionStorage.setItem('lastSelected', JSON.stringify(requestData));
      }
    }
  }

  tabChanged($event: any): void {

    if ((this.dataFormGroup.value.fromdatetime === undefined || this.dataFormGroup.value.todatetime === undefined) || (this.dataFormGroup.value.fromdatetime === '' || this.dataFormGroup.value.todatetime === '')) {

    } else {
      this.dateFilter()
    }
    this.tabIndex = $event.index;

    if ($event.index === 1) { 
      this.spinner.show();
      setTimeout(() => {
        this.spinner.hide();
      }, 1000);
      this.currentView = 'list';
      this.viewType = 'list';
    }


    else if ($event.index === 0) { 
      this.spinner.show();
      setTimeout(() => {
        this.spinner.hide();
      }, 1000);

      if (this.selectedSensor !== '') {
        this.lineChartLabels = [];
       if (this.dataFormGroup.value.fromdatetime !== undefined && this.dataFormGroup.value.todatetime !== undefined) {
            const data = {
            mainSensorID: this.currentSensorId,
            fromDate: moment(new Date(this.dataFormGroup.value.fromdatetime)).format('YYYY-MM-DD'),
            toDate: moment(new Date(this.dataFormGroup.value.todatetime)).format('YYYY-MM-DD')
          };

          this.todoService.getAllByMainSensorIdAndMultipleDates(data).subscribe((response: any) => {
                       this.dataSource.length = 0;
            this.sensorsFilteredData.length = 0; 
                     this.dataSource = response.waterFlowResponse;
            this.sensorsFilteredData = response.waterFlowResponse; 

          });
        }
             this.batteryVoltageDataArray = this.sensorsFilteredData.map(x => x.batteryVoltage);
        this.freshwaterConductivityDataArray = this.sensorsFilteredData.map(x => x.freshwaterConductivity);
        this.waterQuantityDataArray = this.sensorsFilteredData.map(x => x.waterQuantity);
        this.waterLevelDataArray = this.sensorsFilteredData.map(x => x.waterLevel);
        this.turbidityDataArray = this.sensorsFilteredData.map(x => x.turbidity);
        this.sensorsFilteredData.map(element => {
          this.lineChartLabels.push(element.dateTime);
               });
      }

      this.currentView = 'graph';
      this.viewType = 'graph';
      this.lineChartData[0].data = this.batteryVoltageDataArray;
      this.lineChartData[1].data = this.freshwaterConductivityDataArray;
      this.lineChartData[2].data = this.waterQuantityDataArray;
      this.lineChartData[3].data = this.waterLevelDataArray;
      this.lineChartData[4].data = this.turbidityDataArray;
      this.lineChartData[5].data = this.seaWaterElectricalConductivityArray; /*testing*/
      this.lineChartData[6].data = this.waterTemperatureArray; /*testing*/

      this.lineChartDataJP[0].data = this.batteryVoltageDataArray;
      this.lineChartDataJP[1].data = this.freshwaterConductivityDataArray;
      this.lineChartDataJP[2].data = this.waterQuantityDataArray;
      this.lineChartDataJP[3].data = this.waterLevelDataArray;
      this.lineChartDataJP[4].data = this.turbidityDataArray;
      this.lineChartDataJP[5].data = this.seaWaterElectricalConductivityArray; /*testing*/
      this.lineChartDataJP[6].data = this.waterTemperatureArray; /*testing*/

    }


    else if ($event.index === 2) {
      this.spinner.show();
      setTimeout(() => {
              this.spinner.hide();
      }, 1000);
      this.loadingSetting = false;
      this.currentView = 'settings';
      this.viewType = 'settings';
      this.callThresholdFunc();
 
      this.selectedPropertyValue = '';
      for (let i = 0; i < this.selectedSensorPropertyArray.length; i++) {
        this.dataPropertyGridArray.push({
          id: this.selectedSensorPropertyArray[i].id,
          dataPointNameToDisplay: this.selectedSensorPropertyArray[i].dataPointNameToDisplay
        });
        if (this.dataPointName === this.selectedSensorPropertyArray[i].sensorTypeId) {
          this.selectedPropertyValue = this.selectedSensorPropertyArray[i].dataPointNameToDisplay;
          this.updateToggle = true; /*testing code for update toggle*/
          this.addToggle = false; /*testing code for */
          break;
        }

      }

    } else {
      this.currentView = 'maintenance';
      this.viewType = 'maintenance';
      this.spinner.show();
      setTimeout(() => {
        /*spinner ends after 1.5 seconds*/
        this.spinner.hide();
      }, 1000);
      this.callMaintenanceFunc();
    }
    this.filterBySensor(this.currentSensorId, this.viewType);
  }

  get city(): any {
    return this.todoService.getSelectedCity();
  }

  get cityId(): any {
    return this.todoService.getCityId();
  }

  getAreaByCity(): void {
    const cityId = this.todoService.getCityId();
    if (cityId > 0) {
      this.todoService.getAreaByCity(cityId).subscribe((response: any) => {
        this.areas = response;
      });
    } else {
      return;
    }
  }

  getSensorsByArea(areaId: any): void {

    /*-------------------*/
    this.upperLower = 0;
    this.upper = 0;
    this.presentMin = 0;
    this.presentMax = 0;
    this.upperUpper = 0;
    this.lowerLower = 0;
    this.lower = 0;
    this.changeOfRate = 0;
    this.alarmDeadMin = 0;
    this.recordingCycle = 0;
    this.transmissionCycle = 0;
    this.alertLevel = 0;
    this.recordingCycleInitial = 0;
    this.transmissionCycleInitial = 0;

    /*-------------------*/
    this.todoService.getSensorsByAreaId(areaId).subscribe((response: any) => {
      this.points = response;
      this.getAllSensorsData(this.points);
      sessionStorage.setItem('currentSensors', JSON.stringify(this.points));
      this.sensorsFilteredData = [];
      this.filterationObject.dateFilter = null;
      this.currentSensorId = 0;
      this.widgetsData = [];
      this.resetSensorSettings();
    },
      error => {
        /*DO NOTHING*/
      });
  }

  fromDate:  any;
  toDate : any;
  getAllSensorsData(sensorsArr: any): void {
    
  
    
    
    if (sensorsArr.length > 0) {
      this.loading = true;
      this.mainArray = [];
      let date: any;
      let arr: any = [];
      if (this.filterationObject.dateFilter == null) {
        date = moment(new Date()).format('MM/DD/YYYY 00:00:00');
        this.filteredDate = date;
      } else {
        date = new Date();
        this.filteredDate = date;
      }
      let itemsProcessed = 0;
      sensorsArr.map(async (element: any) => {
      const dataArr ={
        mainSensorID: element.mainSensorid,
      fromDate : moment().subtract(1, "days").format("MM-DD-YYYY HH:mm"),
      toDate : moment(new Date()).format('MM-DD-YYYY HH:mm')
      }
    
       this.todoService.getAllByMainSensorIdAndMultipleDates(dataArr).subscribe((response: any) => {
         arr = response
         this.mainArray.push({ data: arr, id: element.mainSensorid });
       })
        if (arr) {
          itemsProcessed++;
        }
        if (itemsProcessed === sensorsArr.length) {
          this.loading = false;
          sessionStorage.setItem('mainData', JSON.stringify(this.mainArray));
        }
        if (itemsProcessed === sensorsArr.length && this.currentSensorId > 0) {
          this.loading = false;
          this.filterBySensor(this.currentSensorId, this.viewType);
        }
      });
    } else {
      return;
    }
  }

  resetSensorSettings(): void {
    this.upperUpper = 0;
    this.upper = 0;
    this.lower = 0;
    this.lowerLower = 0;
    this.changeOfRate = 0;
    this.alarmDeadMin = 0;
    this.alarmDeadMax = 0;
    this.upperLower = 0;
    this.presentMin = 0;
  }

  onChange(dateValue: string): void {

    this.fdtime = '';
    this.tdtime = '';
    if (this.currentSensorId === 0) {
      this.sensorsFilteredData = [];
      this.snotifyService.warning(this.translate.instant('Choose a sensor to filter data'), '', {
        timeout: 2000,
        showProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true
      });
    } else {
      // this.filterationObject.dateFilter = new Date(); 

      this.todoService.getAllByMainSensorId(`${this.currentSensorId}`, this.filterationObject.dateFilter).subscribe((response: any) => {
            
        this.sensorsFilteredData = [];
                if (response.waterFlowResponse == null) {
          this.sensorsFilteredData = [];

          this.filterationObject.dateFilter = new Date(dateValue);
        } else {
          this.lineChartLabels = []; /*testing new code*/
          this.batteryVoltageDataArray = []; /*testing new code*/
          this.freshwaterConductivityDataArray = []; /*testing new code*/
          this.waterQuantityDataArray = []; /*testing new code*/
          this.turbidityDataArray = []; /*testing new code*/

          // this.dataSource = response.waterFlowResponse;
          this.dataSource = response.waterFlowResponse; /*testing new code*/
          this.sensorsFilteredData = response.waterFlowResponse;
          this.filterationObject.dateFilter = new Date(dateValue);
          this.batteryVoltageDataArray = this.sensorsFilteredData.map(x => x.batteryVoltage);
          this.freshwaterConductivityDataArray = this.sensorsFilteredData.map(x => x.freshwaterConductivity);
          this.waterQuantityDataArray = this.sensorsFilteredData.map(x => x.waterQuantity);
          this.waterLevelDataArray = this.sensorsFilteredData.map(x => x.waterLevel);
          this.turbidityDataArray = this.sensorsFilteredData.map(x => x.turbidity);
          this.sensorsFilteredData.map(element => {
                 this.lineChartLabels.push(element.dateTime);
          });
        }
      });
    }
  }

  updateThreshold(presentValue: string, upperUpperLimit: string, upperLimit: string, lowerLimit: string, lowerLowerLimit: string, changeRate: string, alarmDeadZone: string, upperLowerLimitCorrectionWidth: string): void {
    /*TESTING SAMPLE CODE STARTS*/

    if (Number(lowerLimit) == null || lowerLimit === '') {
      this.snotifyService.error(this.translate.instant('Lower Limit required'), '', {
        timeout: 2000,
        showProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true
      });
    }

    if (Number(lowerLowerLimit) == null || lowerLowerLimit === '') {
      this.snotifyService.error(this.translate.instant('Lower Lower Limit required'), '', {
        timeout: 2000,
        showProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true
      });
    }

    if (Number(upperLimit) == null || upperLimit === '') {
      this.snotifyService.error(this.translate.instant('Upper Limit required'), '', {
        timeout: 2000,
        showProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true
      });
    }
    if (Number(upperUpperLimit) == null || upperUpperLimit === '') {
      this.snotifyService.error(this.translate.instant('Upper Upper Limit required'), '', {
        timeout: 2000,
        showProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true
      });
    }
    if (Number(presentValue) == null || presentValue === '') {
      this.snotifyService.error(this.translate.instant('Present Value required'), '', {
        timeout: 2000,
        showProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true
      });
    }
    if (Number(alarmDeadZone) == null || alarmDeadZone === '') {
      this.snotifyService.error(this.translate.instant('Alarm Dead Zone required'), '', {
        timeout: 2000,
        showProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true
      });
    }
    if (Number(changeRate) == null || changeRate === '') {
      this.snotifyService.error(this.translate.instant('Rate of change required'), '', {
        timeout: 2000,
        showProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true
      });
    }
    if (Number(upperLowerLimitCorrectionWidth) == null || upperLowerLimitCorrectionWidth === '') {
      this.snotifyService.error(this.translate.instant('Upper Lower Limit Correction Width required'), '', {
        timeout: 2000,
        showProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true
      });
    }

    if (Number(upperLimit) === Number(lowerLimit)) {
      this.snotifyService.error(this.translate.instant('Upper Limit cannot be equal to Lower Limit'), '', {
        timeout: 2000,
        showProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true
      });
    }

    if (Number(lowerLowerLimit) > 10 || Number(lowerLowerLimit) < 1) {
      this.snotifyService.error(this.translate.instant('Please Enter Lower Lower Limit from 1 to 10'), '', {
        timeout: 2000,
        showProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true
      });
    }
    if (Number(upperLimit) > 10 || Number(upperLimit) < 1) {
      this.snotifyService.error(this.translate.instant('Please Enter Lower Lower Limit from 1 to 10'), '', {
        timeout: 2000,
        showProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true
      });
    }
    if (Number(lowerLimit) > 10 || Number(lowerLimit) < 1) {
      this.snotifyService.error(this.translate.instant('Please Enter Lower Limit from 1 to 10'), '', {
        timeout: 2000,
        showProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true
      });
    }
    if (Number(upperUpperLimit) > 10 || Number(upperUpperLimit) < 1) {
      this.snotifyService.error(this.translate.instant('Please Enter Upper Upper Limit from 1 to 10'), '', {
        timeout: 2000,
        showProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true
      });
    }
    if (Number(presentValue) > 10 || Number(presentValue) < 1) {
      this.snotifyService.error(this.translate.instant('Present value should be from 1 to 10'), '', {
        timeout: 2000,
        showProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true
      });
    }
    if (Number(alarmDeadZone) > 10 || Number(alarmDeadZone) < 0) {
      this.snotifyService.error(this.translate.instant('Please Enter Alarm Dead Zone value from 0 to 10'), '', {
        timeout: 2000,
        showProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true
      });
    }
    if (Number(changeRate) > 100 || Number(changeRate) < 1) {
      this.snotifyService.error(this.translate.instant('Please Enter Rate of change value from 1 to 100'), '', {
        timeout: 2000,
        showProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true
      });
    }
    if (Number(upperLowerLimitCorrectionWidth) < -5 || Number(upperLowerLimitCorrectionWidth) > 5) {
      this.snotifyService.error(this.translate.instant('Please Enter Correction Width from -5 to 5'), '', {
        timeout: 2000,
        showProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true
      });
    }
    // tslint:disable-next-line:max-line-length
    if ((Number(presentValue) >= 1 && Number(presentValue) <= 10) &&
      (Number(alarmDeadZone) >= 0 && Number(alarmDeadZone) <= 10) &&
      (Number(changeRate) >= 1 && Number(changeRate) <= 100) &&
      (Number(upperLowerLimitCorrectionWidth) >= -5 && Number(upperLowerLimitCorrectionWidth) <= 5) &&
      (Number(lowerLimit) >= 1 && Number(lowerLimit) <= 10) &&
      (Number(lowerLowerLimit) >= 1 && Number(lowerLowerLimit) <= 10) &&
      (Number(upperLimit) >= 1 && Number(upperLimit) <= 10) &&
      (Number(upperUpperLimit) >= 1 && Number(upperUpperLimit) <= 10)) {

      /*TESTING*/
      if (Number(upperUpperLimit) < Number(upperLimit)) {
        this.snotifyService.error(this.translate.instant('Upper Limit cannot be greater than Upper Upper Limit'), '', {
          timeout: 2000,
          showProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true
        });
      }
      if (Number(upperUpperLimit) < Number(lowerLowerLimit)) {
        this.snotifyService.error(this.translate.instant('Upper Upper Limit should be greater than Lower Lower Limit'), '', {
          timeout: 2000,
          showProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true
        });
      }
      if (Number(upperLimit) < Number(lowerLimit)) {
        this.snotifyService.error(this.translate.instant('Upper Limit should be greater than Lower Limit'), '', {
          timeout: 2000,
          showProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true
        });
      }
      if (Number(lowerLimit) < Number(lowerLowerLimit)) {
        this.snotifyService.error(this.translate.instant('Lower Limit Should be greater than or equal to Lower Lower Limit'), '', {
          timeout: 2000,
          showProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true
        });

      }
      // tslint:disable-next-line:max-line-length
      if ((Number(upperUpperLimit) >= Number(upperLimit)) && (Number(upperLimit) > Number(lowerLimit)) && (Number(lowerLowerLimit) <= Number(lowerLimit)) && (Number(lowerLowerLimit) < Number(upperUpperLimit)) && (Number(changeRate) >= 1 && Number(changeRate) <= 100)) {
        const updateData = {
          mainSensorId: this.currentSensorId.toString(),
          dataPointName: this.dataPointName,
          presentValue,
          unit: 'NA',
          monitoringLevel: '10',
          upperUpperLimit,
          upperLimit,
          lowerLowerLimit,
          lowerLimit,
          rateOfChange: changeRate,
          upperAndLowerLimitCorrectionWidth: upperLowerLimitCorrectionWidth,
          deadZone: alarmDeadZone,
          location: 'Delhi'
        };


        this.todoService.updateThresholdValues(this.sensorPrimaryId, updateData).subscribe((response: any) => {

          this.snotifyService.success(this.translate.instant('Settings updated successfully'), '', {
            timeout: 2000,
            showProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true
          });
        }, (error: any) => {

        });
      } else {
        /*DO NOTHING*/
      }
    }
    /*TESTING SAMPLE CODE ENDS*/
  }

  /* Functions for live data api call and alert function */
  getLiveData(): void {
    if (this.points.length > 0) {
      this.getAllSensorsData(this.points);
  // const confirmation = confirm(this.translate.instant('New Data Updated,Are you sure you want to refresh the window?'));
  //    if (confirmation) {
  //       
  //   } else {
  //     return;
  //  }
    } else {
      return;
    }
  }

  getAlertData(messageText: any): void {
    if (messageText === 'AlertData') {
      this.todoService.getUnreadAlerts(false).subscribe((response: any) => {
        this.alertsArray = response.alertResponses;
        if (this.alertsArray.length > 0) {
          this.snotifyService.confirm(this.translate.instant('Mark this notification as read?'), this.translate.instant('Threshold exceeded'), {
            buttons: [
              {
                text: this.cookieService.get('language') === 'en' ? 'Yes' : 'はい', action: toast => {
                  this.markRead(toast);
                },
              },
              {
                text: this.cookieService.get('language') === 'en' ? 'No' : '番号', action: toast => {

                  this.snotifyService.remove(toast.id);
                },
              },
              {
                text: this.cookieService.get('language') === 'en' ? 'Close' : '閉じる',
                action: toast => {
                  this.snotifyService.remove(toast.id);
                },
                bold: true
              }
            ],
            timeout: 10000,
            showProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            titleMaxLength: 50
          });
        }

      },
        (error: any) => {
          /*DO NOTHING*/
        });
    }
    if (messageText === 'IncorrectData') {
      this.todoService.getUnreadAlerts(false).subscribe((response: any) => {
        this.alertsArray = response.alertResponses;
        if (this.alertsArray.length > 0) {
          this.snotifyService.confirm(this.translate.instant('Mark this notification as read?'), this.translate.instant('Incorrect Data Format'), {
            buttons: [
              {
                text: this.cookieService.get('language') === 'en' ? 'Yes' : 'はい', action: toast => {
                  this.markRead(toast);
                },
              },
              {
                text: this.cookieService.get('language') === 'en' ? 'No' : '番号', action: toast => {

                  this.snotifyService.remove(toast.id);
                },
              },
              {
                text: this.cookieService.get('language') === 'en' ? 'Close' : '閉じる',
                action: toast => {
                  this.snotifyService.remove(toast.id);
                },
                bold: true
              }
            ],
            timeout: 10000,
            showProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            titleMaxLength: 50
          });
        }
      },
        (error: any) => {
          /*DO NOTHING*/
        });
    }
  }

  markRead(toast: SnotifyToast): void {
    let id: any;
    let request: any;
    this.alertsArray.map((element: any) => {
      id = element.id;
      request =
      {
        mainSensorId: element.mainSensorId,
        dated: element.dated,
        dataTimeStamp: element.dataTimeStamp,
        pointName: element.pointName,
        dataName: element.dataName,
        dataNameToDisplay: element.dataNameToDisplay,
        isRead: true,
        status: element.status
      };
    });

    this.todoService.updateAlert(request, id).subscribe((response: any) => {
      this.snotifyService.remove(toast.id);
    },
      (error: any) => {
      });
  }

  // tslint:disable-next-line:typedef
  get isSensor() {
    return this.currentSensorId > 0 ? false : true;
  }

  updateMaintenance(recordingCycle: string, transmissionCycle: string, alertLevel: string): void {
    this.loadingSetting = true;
    if (Number(recordingCycle) == null) {
      this.snotifyService.success(this.translate.instant('Recording Cycle cannot be empty'), '', {
        timeout: 7000,
        showProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true
      });
    }
    if (Number(transmissionCycle) == null) {
      this.snotifyService.success(this.translate.instant('Transmission Cycle cannot be empty'), '', {
        timeout: 7000,
        showProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true
      });
    }
    if (Number(transmissionCycle) == null) {
      this.snotifyService.error(this.translate.instant('Alert Level cannot be empty'), '', {
        timeout: 7000,
        showProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true
      });
    }
    if (Number(transmissionCycle) !== null && Number(recordingCycle) !== null && Number(alertLevel) !== null) {
      if (Number(alertLevel) < 1 || Number(alertLevel) > 10) {
        this.snotifyService.error(this.translate.instant('Please enter Alert Level from 1 to 10'), '', {
          timeout: 7000,
          showProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true
        });
      }
      if (Number(transmissionCycle) < 1 || Number(transmissionCycle) > 1440) {
        this.snotifyService.error(this.translate.instant('Please enter Transmission Cycle minutes from 1 to 1440'), '', {
          timeout: 7000,
          showProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true
        });
      }
      if (Number(recordingCycle) < 1 || Number(recordingCycle) > 1440) {
        this.snotifyService.error(this.translate.instant('Please enter Recording Cycle minutes from 1 to 1440'), '', {
          timeout: 7000,
          showProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true
        });
      }
      // tslint:disable-next-line:max-line-length
      if ((Number(transmissionCycle) >= 1 && Number(transmissionCycle) <= 1440) && (Number(recordingCycle) >= 1 && Number(recordingCycle) <= 1440) && (Number(alertLevel) >= 1 && Number(alertLevel) <= 10)) {
        const maintenanceData = {
        
          id: this.currentMaintenaceid,
          mainSensorId: this.currentSensorId.toString(),
          number: 0,
          name: this.pointName,
          recordingCycle,
          transmissionCycle,
          recordingCycleInitial: this.recordingCycleInitial,
          transmissionCycleInitial: this.transmissionCycleInitial,
          mode: 'auto',
          // updatedDate: moment(new Date()).format('MM/DD/YYYY , h:mm:ss '),
          updatedDate: new Date(),
          alertLevel
        };
             this.todoService.updateMaintenance(this.currentMaintenaceid, maintenanceData).subscribe((response: any) => {

          this.loadingSetting = false;
          this.snotifyService.success(this.translate.instant('Data updated successfully'), '', {
            timeout: 7000,
            showProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true
          });
           this.todoService.getMaintenanceByMainSensorId(this.currentSensorId).subscribe((response: any) => {
             this.recordingCycleInitial = response[0].recordingCycleInitial;
            this.currentMaintenaceid = response[0].id;
            this.transmissionCycleInitial = response[0].transmissionCycleInitial;
            this.recordingCycle = response[0].recordingCycle;
            this.transmissionCycle = response[0].transmissionCycle;
            this.alertLevel = response[0].alertLevel;
            this.pointName = response[0].name;
          }, error => {
            this.loadingSetting = false;
          });
        },
          error => {
            this.loadingSetting = false;

          });
      }
    }
  }

  
  returnInitial(recordingCycle: string, transmissionCycle: string, alertLevel: string): void {

   
    if ((Number(this.recordingCycleInitial) === Number(recordingCycle)) && (Number(this.transmissionCycleInitial) === Number(transmissionCycle))) {

    } else {
      const data: any = sessionStorage.getItem('initialValues');
      const initialValues = JSON.parse(data);
      this.recordingCycle = initialValues.initialRecording;
      this.transmissionCycle = initialValues.initialTransmission;

      const maintenanceData = {
        id: this.sensorPrimaryId,
        mainSensorId: this.currentSensorId.toString(),
        number: 0,
        name: this.pointName,
        recordingCycle: this.recordingCycleInitial,
        transmissionCycle: this.transmissionCycleInitial,
        recordingCycleInitial: this.recordingCycleInitial,
        transmissionCycleInitial: this.transmissionCycleInitial,
        mode: 'auto',
        updatedDate: moment(new Date()).format('dd-mm-YYYY'),
        alertLevel
      };

      this.todoService.getMaintenanceByMainSensorId(this.currentSensorId.toString()).subscribe((response: any) => {

        this.recordingCycle = Number(response[0].recordingCycleInitial);
        this.transmissionCycle = Number(response[0].transmissionCycleInitial);
        this.currentMaintenaceid = response[0].id;
             const maintenanceData = {
          id: this.currentMaintenaceid,
          mainSensorId: this.currentSensorId.toString(),
          number: 0,
          name: this.pointName,
          recordingCycle: this.recordingCycleInitial,
          transmissionCycle: this.transmissionCycleInitial,
          recordingCycleInitial: this.recordingCycleInitial,
          transmissionCycleInitial: this.transmissionCycleInitial,
          mode: 'auto',
          updatedDate: moment(new Date()).format('dd-mm-YYYY'),
          alertLevel
        };  
        this.todoService.updateMaintenance(this.currentMaintenaceid, maintenanceData).subscribe((response: any) => {
          this.snotifyService.success(this.translate.instant('Values set to initial successfully'), '', {
            timeout: 7000,
            showProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true
          });
        });
            });

    }

  }

  callThresholdFunc(): void {
    this.todoService.getThresholdValuesByMainSensorId(this.currentSensorId).subscribe((response: any) => {

      this.upperLower = 0;
           if (response.length > 0) {
        this.loading = false;
        this.updateThresholdArray = response[0];
        this.updateThresholdArray1 = response;
        this.presentValueArray = (response[0].presentValue.toString()).split('-');
        this.deadZoneArray = (response[0].deadZone.toString()).split('-');
        this.upperUpper = response[0].upperUpperLimit;
        this.upper = 0;
        this.upper = response[0].upperLimit;
        this.lower = response[0].lowerLimit;
        this.lowerLower = response[0].lowerLowerLimit;
        this.changeOfRate = response[0].rateOfChange;
        this.presentMin = this.presentValueArray[0];
        this.presentMax = this.presentValueArray[1];
        this.alarmDeadMin = this.deadZoneArray[0];
        this.alarmDeadMax = this.deadZoneArray[1];
        this.upperLower = response[0].upperAndLowerLimitCorrectionWidth;
        this.dataPointName = response[0].dataPointName;
        this.sensorPrimaryId = response[0].id;
      } else if (response.length === 0) {

      }
    }, error => {

      this.snotifyService.error(this.translate.instant('Threshold Settings not available'), '', {
        timeout: 7000,
        showProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true
      });
    });
  }

  callMaintenanceFunc(): void {
    if (this.currentSensorId === 0) {
      return;
    }
    this.todoService.getMaintenanceByMainSensorId(this.currentSensorId).subscribe((response: any) => {

      if (response.length > 0 && this.currentPointName !== '') {

        this.recordingCycleInitial = response[0].recordingCycleInitial;
        this.currentMaintenaceid = response[0].id;
        this.transmissionCycleInitial = response[0].transmissionCycleInitial;
        this.recordingCycle = response[0].recordingCycle;
        this.transmissionCycle = response[0].transmissionCycle;
        this.alertLevel = response[0].alertLevel;
        this.pointName = response[0].name;
        const request = {
          initialRecording: this.recordingCycleInitial,
          initialTransmission: this.transmissionCycleInitial
        };

        sessionStorage.setItem('initialValues', JSON.stringify(request));
      } else if (response.length === 0) {

        this.recordingCycleInitial = 0;
        this.transmissionCycleInitial = 0;
        this.recordingCycle = 0;
        this.transmissionCycle = 0;
        this.alertLevel = 0;
      }
    });
  }

  sorting(propertyName: string): void {
    if (propertyName === 'Time Stamp') {
      if (this.isArrowDown === true) {
        this.dataSource = sortObjectsArray(this.dataSource, 'timeStamp');
        this.isArrowDown = !this.isArrowDown;
      } else {
        this.dataSource = sortObjectsArray(this.dataSource, 'timeStamp', 'desc');
        this.isArrowDown = !this.isArrowDown;
      }
    }
    if (propertyName === 'Battery Voltage') {
      if (this.isArrowDown === true) {
        this.dataSource = sortObjectsArray(this.dataSource, 'batteryVoltage');
        this.isArrowDown = !this.isArrowDown;
      } else {
        this.dataSource = sortObjectsArray(this.dataSource, 'batteryVoltage', 'desc');
        this.isArrowDown = !this.isArrowDown;
      }
    }
  }
  dataWidget: any = [];
  dateFilter(): any {
    
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1500);

    const data = {
      mainSensorID: this.currentSensorId,
      fromDate: moment(new Date(this.dataFormGroup.value.fromdatetime)).format('YYYY-MM-DD HH:mm A'),
      toDate: moment(new Date(this.dataFormGroup.value.todatetime)).format('YYYY-MM-DD HH:mm A')
    };
    if ((this.dataFormGroup.value.fromdatetime !== undefined && this.dataFormGroup.value.todatetime !== undefined) && (this.dataFormGroup.value.fromdatetime !== '' && this.dataFormGroup.value.todatetime !== '')) {

if(data.fromDate > data.toDate){
  this.snotifyService.error(this.translate.instant('To Date should be greater than or equal to From Date'), '');
    return;
}   else {
        this.todoService.getAllByMainSensorIdAndMultipleDates(data).subscribe((response: any) => {
                 this.dataSource = [];

                this.sensorsFilteredData.length = 0; /*testing code*/
          this.filterationObject.dateFilter = ''; /*testing code*/
                this.dataSource = response.waterFlowResponse;
          this.sensorsFilteredData = response.waterFlowResponse; /*testing code*/
                 this.batteryVoltageDataArray = this.sensorsFilteredData.map(x => x.batteryVoltage);
          this.freshwaterConductivityDataArray = this.sensorsFilteredData.map(x => x.freshwaterConductivity);
          this.waterQuantityDataArray = this.sensorsFilteredData.map(x => x.waterQuantity);
          this.waterLevelDataArray = this.sensorsFilteredData.map(x => x.waterLevel);
          this.turbidityDataArray = this.sensorsFilteredData.map(x => x.turbidity);
          this.seaWaterElectricalConductivityArray = this.sensorsFilteredData.map(x => x.saltwaterConductivity); /*testing*/
          this.waterTemperatureArray = this.sensorsFilteredData.map(x => x.waterTemprature); /*testing*/

          this.lineChartData[0].data = this.batteryVoltageDataArray;
          this.lineChartData[1].data = this.freshwaterConductivityDataArray;
          this.lineChartData[2].data = this.waterQuantityDataArray;
          this.lineChartData[3].data = this.waterLevelDataArray;
          this.lineChartData[4].data = this.turbidityDataArray;
          this.lineChartData[5].data = this.seaWaterElectricalConductivityArray; /*testing*/
          this.lineChartData[6].data = this.waterTemperatureArray; /*testing*/

          this.lineChartDataJP[0].data = this.batteryVoltageDataArray;
          this.lineChartDataJP[1].data = this.freshwaterConductivityDataArray;
          this.lineChartDataJP[2].data = this.waterQuantityDataArray;
          this.lineChartDataJP[3].data = this.waterLevelDataArray;
          this.lineChartDataJP[4].data = this.turbidityDataArray;
          this.lineChartDataJP[5].data = this.seaWaterElectricalConductivityArray; /*testing*/
          this.lineChartDataJP[6].data = this.waterTemperatureArray; /*testing*/
          this.lineChartLabels = this.sensorsFilteredData.map(x => x.dateTime);
          if (response != null) {
        
            this.sensorsFilteredData = response.waterFlowResponse



            this.bindWidgets();


          } else {
            return
          }
        });
      }
    }
    if ((this.dataFormGroup.value.fromdatetime === undefined || this.dataFormGroup.value.todatetime === undefined) || (this.dataFormGroup.value.fromdatetime === '' || this.dataFormGroup.value.todatetime === '')) {
      this.snotifyService.error(this.translate.instant('Please enter both dates'), '', {
        timeout: 2000,
        showProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true
      });
    }
  }
  orderData : number = 0
    onSubmit(): any {
      
    let statusCode = 0;
    for (let i = 0; i < this.thresholdAPIResponse.length; i++) {
      if ((document.getElementById(`upperUpperLimit-${i}`) as HTMLInputElement).value === null ||
        (document.getElementById(`upperUpperLimit-${i}`) as HTMLInputElement).value === undefined ||
        (document.getElementById(`upperLimit-${i}`) as HTMLInputElement).value === null ||
        (document.getElementById(`upperLimit-${i}`) as HTMLInputElement).value === undefined ||
        (document.getElementById(`lowerLowerLimit-${i}`) as HTMLInputElement).value === null ||
        (document.getElementById(`lowerLowerLimit-${i}`) as HTMLInputElement).value === undefined ||
        (document.getElementById(`lowerLimit-${i}`) as HTMLInputElement).value === null ||
        (document.getElementById(`lowerLimit-${i}`) as HTMLInputElement).value === undefined) {
        this.snotifyService.error(this.translate.instant('Input cannot be empty'), '', {
          timeout: 2000,
          showProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true
        });
      } 
    
      else {
       
        this.rateOfChangeValue = 0;
        this.displayValue = 0;
        this.alarmSetValueUpper = 0;
        this.alarmSetValueUpper = 0;
        this.alarmSetValueLower = 0;
  
        this.rateOfChangeValue = ((this.thresholdAPIResponse[i].upperLimit - this.thresholdAPIResponse[i].lowerLimit) / 100) * (this.thresholdAPIResponse[i].rateOfChange / 100);
        this.displayValue = this.thresholdAPIResponse[i].ullcwDisplayValue + (this.thresholdAPIResponse[i].rateOfChange * ((this.thresholdAPIResponse[i].upperAndLowerLimitCorrectionWidth / 100) * 100));
        this.alarmSetValueUpper = this.thresholdAPIResponse[i].upperUpperLimit + (this.thresholdAPIResponse[i].rateOfChange * ((this.thresholdAPIResponse[i].deadZone / 100) * 100));
        this.alarmSetValueLower = this.thresholdAPIResponse[i].upperUpperLimit - (this.thresholdAPIResponse[i].rateOfChange * ((this.thresholdAPIResponse[i].deadZone / 100) * 100));

        const data = {
       
          mainSensorId: this.thresholdAPIResponse[i].mainSensorId,
          dataPointName: this.thresholdAPIResponse[i].dataPointName,
          presentValue: this.thresholdAPIResponse[i].presentValue,
          unit: 'NA',
          monitoringLevel: this.thresholdAPIResponse[i].monitoringLevel,
          upperUpperLimit: (document.getElementById(`upperUpperLimit-${i}`) as HTMLInputElement).value,
          upperLimit: (document.getElementById(`upperLimit-${i}`) as HTMLInputElement).value,
          lowerLowerLimit: (document.getElementById(`lowerLowerLimit-${i}`) as HTMLInputElement).value,
          lowerLimit: (document.getElementById(`lowerLimit-${i}`) as HTMLInputElement).value,
          rateOfChange: (document.getElementById(`rateofchange`) as HTMLInputElement).value,
          rateOfChangeValue: this.rateOfChangeValue,
          ullcwDisplayValue: this.displayValue,
          deadZoneUpperValue: this.alarmSetValueUpper,
          deadZoneLowerValue: this.alarmSetValueLower,
          upperAndLowerLimitCorrectionWidth: (document.getElementById(`upperlowercorrectionwidth`) as HTMLInputElement).value,
          deadZone: (document.getElementById(`thresholddeadzone`) as HTMLInputElement).value,
          location: 'Tokyo'
        };
        this.todoService.addOrUpdateThresholdValues(this.thresholdAPIResponse[i].id, data).subscribe((response: any) => {
          
   response.httpStatusCode;
          if (statusCode === 200) {
            this.statusBoolean = true;
          }
        }, (error: any) => {
          this.statusBoolean = false;
        });
      }
    }

    if (this.statusBoolean) {
      this.snotifyService.success(this.translate.instant('Data saved successfully'), '', {
        timeout: 2000,
        showProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true
      });
    } else {

    }

      this.todoService.getThresholdValuesByMainSensorId(this.currentSensorId).subscribe((response: any) => {
      this.thresholdRateOfChange = response[0].rateOfChange;
      this.thresholdDeadZone = response[0].deadZone;
      this.thresholdCorrectionWidth = response[0].upperAndLowerLimitCorrectionWidth;
    });
  }

  onSettingRateChange($event: any, propertyName: string): any {
    this.charCode = '';
    switch (propertyName) {
      case 'rateOfChange':
        this.charCode = ($event.which) ? $event.which : $event.keyCode;
        if (this.charCode > 31 && (this.charCode < 48 || this.charCode > 57)) {
          this.snotifyService.error(this.translate.instant('Please enter numbers only'), '', {
            timeout: 2000,
            showProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true
          });
          return false;
        } else {
          this.thresholdAPIResponse.forEach((item: any) => {
            item.rateOfChange = $event.target.value;
          });
        }
        break;
      case 'alarmDeadZone':
        this.charCode = ($event.which) ? $event.which : $event.keyCode;
        if (this.charCode > 31 && (this.charCode < 48 || this.charCode > 57)) {
          this.snotifyService.error(this.translate.instant('Please enter numbers only'), '', {
            timeout: 2000,
            showProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true
          });
          return false;
        } else {
          this.thresholdAPIResponse.forEach((item: any) => {
            item.alarmDeadZone = $event.target.value;
          });
        }

        break;
      case 'correctionWidth':
        this.charCode = ($event.which) ? $event.which : $event.keyCode;
        if (this.charCode > 31 && (this.charCode < 48 || this.charCode > 57)) {
          this.snotifyService.error(this.translate.instant('Please enter numbers only'), '', {
            timeout: 2000,
            showProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true
          });
          return false;
        } else {
          this.thresholdAPIResponse.forEach((item: any) => {
            item.correctionWidth = $event.target.value;
          });
        }
        break;
    }
  }

  dropDownPointFunctions(mainSensorId: any): any {
    this.getSensorsByArea(this.dropDownData.areaid);
    this.filterBySensor(mainSensorId, this.viewType);
  }
}
