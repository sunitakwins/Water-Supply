import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { ToastrService } from 'ngx-toastr';
import { BaseChartDirective } from 'ng2-charts';
import { ChartDataSets } from 'chart.js';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { SnotifyService, SnotifyToast } from 'ng-snotify';
import * as signalR from '@microsoft/signalr';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from '../../../../shared/EventBroadcast';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-trend',
  templateUrl: './trend.component.html',
  styleUrls: ['./trend.component.scss']
})
export class TrendComponent implements OnInit {

  /*test code starts*/
  @Input() chartData: any = [];
  chartLabels: any = [];
  sensorNamesHelperArray: any = [];
  /*chartOptions: any;*/

  dataArr1: any = [];
  dataArr2: any = [];
  helperArray: any = [];
  helperChipArray: any = [];
  /*test code ends*/
  customDate: any;
  selectedAreaData: any;
  handleSelectionData: any;
  handleSelectionType: any;
  sensornames: any = []; /*test code*/
  selectedDate = 'waterLevel'; /*test code*/
  userSelectedProperty: any; /*test code*/
  constructor(private todoService: TodoService, private toastr: ToastrService,
    private messageService: MessageService,
    private snotifyService: SnotifyService, private translate: TranslateService,
    public cookieService: CookieService,
    private datePipe: DatePipe,
    private spinner: NgxSpinnerService) {

    this.messageService.onMessage().subscribe((res) => {
          if (res !== '') {
        this.serviceLanguage = res;
        this.propertyAccessor;
      }
    });

    this.clickEVentSubscription = this.todoService.getClickEvent().subscribe(() => {
      this.callFun();
    });
    this.langEVentSubscription = this.todoService.getLangEvent().subscribe(() => {
      this.setChartTranslations();
    });
  }

  get city() {
    return this.todoService.getSelectedCity();
  }

  get cityId() {
    return this.todoService.getCityId();
  }

  get isSensor(): any {
    return this.selectedSensorData.length > 0 ? false : true;
  }

  globalAreaId: any;
  globalAreaName: string | null = '';
  serviceLanguage = '';
  flagCurrentPropertyName: any;
  clickEVentSubscription?: Subscription;
  langEVentSubscription?: Subscription;
  public currentTimeValue = '1 Day';
  public dateTime: any;
  dt1: any;
  dt2: any;
  dataArray: any = [];
  /* View child properties */
  @ViewChild(BaseChartDirective)
  chart!: BaseChartDirective;

  /*SAMPLE CODE STARTS*/
  selectedHour = '1 Day';
  moveHour = false;
  hours: any[] = [
    { name: '1 Hour', id: 1 },
    { name: '4 Hours', id: 2 },
    { name: '1 Day', id: 3 }
  ];

  batteryVoltageAverage = 0;
  freshwaterConductivityAverage = 0;
  waterQuantityAverage = 0;
  waterLevelAverage = 0;
  turbidityAverage = 0;

  // color: ThemePalette = 'warn';
  mode: ProgressBarMode = 'determinate';
  value = 50;
  currentSensorId = 0;
  currentArea = 0;
  currentAreaName = '';
  currentPointName = '';
  currentPropertyName = this.cookieService.get('language') === 'en' ? 'Water Level' : '水深';
  propertyAccessor = 'waterLevel';
  areaName = 'Selected Area';
  pointName = '';
  visible = true;
  selectable = true;
  removable = true;
  public barChartLegend = true;
  moveCity = false;
  moveArea = false;
  selectedArea = false;
  selectedPoint = false;
  loading = false;
  cityChanged = false;

  public sensors: any = [{ name: 1 }, { name: 2 }, { name: 3 }];
  accordianArray: any = [];
  public sensorsArray: any = [];
  selectedSensorData: any = [];
  public barChartLabels: any = [];
  public labelsTrack: any = [];
  public propertyArray: any = [];
  public mainArray: any = []; // this array will have response of all sensors in the area
  alertsArray: any = [];

  barChartData: ChartDataSets[] = [
    // { data: [], label: '' },
  ];
  allData: any = [];
  points: any[] = [];
  realSensors: any[] = [];
  areas: any[] = [];
  sensorProperties: any = [
    { name: 'Battery Voltage', key: 'battery_voltage' },
    { name: 'Freshwater Electrical Conductivity', key: 'freshwater_conductivity' },
    { name: 'Water Quantity', key: 'water_quantity'},
    { name: 'Water Level', key: 'water_level' },
    { name: 'Turbidity', key: 'turbidity' },
    { name: 'Saltwater Conductivity', key: 'saltwater_conductivity' }, /*testing*/
    { name: 'Water Temperature', key: 'water_temprature' } /*testing*/
  ];
  selectedDropdownProperty = 'Water Level';
  sensorFinal: any = [];
  titleEnglish = 'Sensor comparison graph';
  titleJapanese = 'センサー比較グラフ';

  labelEnglish = 'Time Stamp';
  labelJapanese = 'タイムスタンプ';
  public barChartOptions = {
    title: {
      // tslint:disable-next-line:max-line-length ,
      text: this.translate.instant(this.cookieService.get('language') === 'en' ? this.titleEnglish : this.titleJapanese),
      display: true
    },
    scaleShowVerticalLines: true,
    responsive: true,
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          min: 8,
          max: 10,
          steps: 1,
          stepValue: 0.2,
          labelString: this.currentPropertyName,

        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: this.translate.instant(this.cookieService.get('language') === 'en' ? this.labelEnglish : this.labelJapanese)
        }
      }]
    }
  };
  public chartOptions = {
    title: {
      // tslint:disable-next-line:max-line-length ,
      text: this.translate.instant(this.cookieService.get('language') === 'en' ? this.titleEnglish : this.titleJapanese),
      display: true
    },
    scaleShowVerticalLines: true,
    responsive: true,
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: this.currentPropertyName,
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: this.translate.instant(this.cookieService.get('language') === 'en' ? this.labelEnglish : this.labelJapanese)
        }
      }]
    }
  };


  public barChartColors: Array<any> = [
    {
      backgroundColor: ['#FF7360', '#6FC8CE', '#FAFFF2', '#FFFCC4', '#B9E8E0']
    }
  ];

  dateFilter: any = {
    fromDateTime: null

  };
  filteredDate: any;
  pointDetail: any = {
    areaSensor: 0,
    cityArea: 0
  };
  comparePoint: any = {
    sensorProperty: 0
  };

  ngOnInit() {
    this.selectedAreaData = this.todoService.getSelectedAreaData(); // testing code
    if (this.selectedAreaData !== '' && this.selectedAreaData[0] !== undefined && this.selectedAreaData[1] !== undefined) {
      this.handleSelection(this.selectedAreaData[0], this.selectedAreaData[1]);
    }
    this.globalAreaName = this.todoService.getSelectedAreaName();
    this.globalAreaId = this.todoService.getSelectedAreaId();
    this.pointDetail.cityArea = this.globalAreaId;
    this.getSensorsByArea(this.globalAreaId);
    this.selectedPoint = true;
    this.startConnection();
    const selectedCity = this.todoService.getSelectedCity();
    const areas = sessionStorage.getItem('currentCompareAreas');
    if (areas && selectedCity != '') {
      this.areas = JSON.parse(areas);
    } else if (selectedCity != '') {
      const data: any = sessionStorage.getItem('allAreas');
      const areaData = JSON.parse(data);
      this.areas = areaData.filter((x: { cityid: any; }) => x.cityid == this.cityId);
    } else {
      return;
    }
  }

  ngAfterViewinit() {

  }

  startConnection() {
    const connection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Information)
      .withUrl(`http://nihonsuidoapi-dev.us-east-2.elasticbeanstalk.com/StartUpLiveDataUrl`)
      .build();

    connection.start().then(function () {
    }).catch(function (err) {
      return console.error(err.toString());
    });

    connection.on('BroadcastLiveData', () => {
      this.getLiveData();
    });
    const connection2 = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Information)
      .withUrl(`http://nihonsuidoapi-dev.us-east-2.elasticbeanstalk.com/StartUpNotificationUrl`)
      .build();
    connection2.start().then(function () {
    }).catch(function (err) {

    });

    connection2.on('BroadcastAlertData', (messageText) => {
      this.getAlertData(messageText);

    });
  }

  callFun() {
    this.cityChanged = true;
    const data: any = sessionStorage.getItem('allAreas');
    const areaData = JSON.parse(data);
    this.areas = areaData.filter((x: { cityid: any; }) => x.cityid == this.cityId);
    sessionStorage.setItem('currentCompareAreas', JSON.stringify(this.areas));
    this.points = [];
    this.currentSensorId = 0;
    this.allData = [];
    this.barChartData = [];
    this.barChartLabels = [];
    this.selectedSensorData = [];
    this.accordianArray = [];
    this.dateFilter.fromDateTime = null;
    this.pointDetail.areaSensor = 0;
    this.pointDetail.cityArea = 0;
    this.comparePoint.sensorProperty = 0;
    this.propertyAccessor = 'waterLevel';
  }



  setChartTranslations() {
    if (this.flagCurrentPropertyName === '') {
      this.flagCurrentPropertyName = localStorage.getItem('yAxisValue');
    }
        if (this.cookieService.get('language') === 'en') {

      if (this.userSelectedProperty === 'Battery Voltage'
        || this.userSelectedProperty === 'バッテリー電圧') {
        this.userSelectedProperty = 'Battery Voltage';
      } else if (this.userSelectedProperty === 'Freshwater Electrical Conductivity'
        || this.userSelectedProperty === '淡水電気伝導度') {
        this.userSelectedProperty = 'Freshwater Electrical Conductivity';
      } else if (this.userSelectedProperty === 'Water Quantity'
        || this.userSelectedProperty === '流量') {
        this.userSelectedProperty = 'Water Quantity';
      } else if (this.userSelectedProperty === 'Water Level'
        || this.userSelectedProperty === '水深') {
        this.userSelectedProperty = 'Water Level';
      } else if (this.userSelectedProperty === 'Turbidity'
        || this.userSelectedProperty === '濁度') {
        this.userSelectedProperty = 'Turbidity';
      } else if (this.userSelectedProperty === 'Saltwater Conductivity'
        || this.userSelectedProperty === '塩水の導電率') {
        this.userSelectedProperty = 'Saltwater Conductivity';
      } else if (this.userSelectedProperty === 'Water Temperature'
        || this.userSelectedProperty === '温度') {
        this.userSelectedProperty = 'Water Temperature';
      }
    } else {


      if (this.userSelectedProperty === 'Battery Voltage'
        || this.userSelectedProperty === 'バッテリー電圧') {
        this.userSelectedProperty = 'バッテリー電圧';
      } else if (this.userSelectedProperty === 'Freshwater Electrical Conductivity'
        || this.userSelectedProperty === '淡水電気伝導度') {
        this.userSelectedProperty = '淡水電気伝導度';
      } else if (this.userSelectedProperty === 'Water Quantity'
        || this.userSelectedProperty === '流量') {
        this.userSelectedProperty = '流量';
      } else if (this.userSelectedProperty === 'Water Level'
        || this.userSelectedProperty === '水深') {
        this.userSelectedProperty = '水深';
      } else if (this.userSelectedProperty === 'Turbidity'
        || this.userSelectedProperty === '濁度') {
        this.userSelectedProperty = '濁度';
      } else if (this.userSelectedProperty === 'Saltwater Conductivity'
        || this.userSelectedProperty === '塩水の導電率') {
        this.userSelectedProperty = '塩水の導電率';
      } else if (this.userSelectedProperty === 'Water Temperature'
        || this.userSelectedProperty === '温度') {
        this.userSelectedProperty = '温度';
      }
    }

    /*TESTING SAMPLE CODE ENDS*/
    if (this.chart && this.chart.chart && this.chart.chart.config) {
      this.chart.chart.options.title = {
        /*text: this.translate.instant('Sensor comparison graph'),*/
        text: this.cookieService.get('language') === 'en' ? this.titleEnglish : this.titleJapanese,
        display: true
      };
        this.chart.chart.options.scales = {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: this.userSelectedProperty, /*this.flagCurrentPropertyName*/
            /*labelString: this.translate.instant(this.currentPropertyName),*/
          }
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            /*labelString: this.translate.instant('Time Stamp')*/
            labelString: this.cookieService.get('language') === 'en' ? 'Time Stamp' : 'タイムスタンプ'
          }
        }]
      };

      this.currentPropertyName = this.userSelectedProperty;
      this.chart.chart.update();

    }
  }

  /* Function call to add the points as chosen */
  checkBoxvalue(checkBoxName: any, propertyName: string): void {
    const pointIndex = this.points.findIndex((x: { mainSensorid: any; }) => x.mainSensorid == checkBoxName.mainSensorid);
    if (pointIndex != -1) {
      this.pointName = checkBoxName.sensorname;
      this.selectedSensorData.push({ name: checkBoxName.sensorname, mainSensorid: checkBoxName.mainSensorid });
      this.points.splice(pointIndex, 1);
      this.toggle(null, checkBoxName.mainSensorid, propertyName);
    } else {
      this.selectedSensorData.pop(checkBoxName.sensorname);
      this.selectedSensorData.push({ name: checkBoxName.sensorname, mainSensorid: checkBoxName.mainSensorid });
    }
  }

  /* Function call to call the drawchart function with current sesnor id */
  toggle(event: any, name: string, propertyName: string): void {
    const index = this.barChartLabels.findIndex((x: string) => x == name);
    if (index != -1) {
      this.sensorsArray.splice(index, 1);
      this.sensorsArray = [...this.sensorsArray];
    } else {
      this.sensorsArray.push(name).toString();
      this.plotSensorData(name);
    }
  }

  /* Function call to handle the area/point selection*/
// techerror code 
sensorNameData : any;
  pointCompareArray : any = []
  selectedDateData : any
  chartDataArray : any = [];
  propertyNameData : any = 'Battery Voltage';
  sensorIdData : any;
  propertyLabelData : any = 'Battery Voltage';
  pointConditionArray : any =[];
  selectedValue : any = [];

  pointGraphData(){
    this.spinner.show();
    this.chartData = [];
    this.chartLabels = [];
    if(this.selectedDateData == '' && this.propertyNameData == ''){

   }else{
    this.todoService.getAllByMainSensorId(this.sensorIdData , this.selectedDateData).subscribe((response: any) => {
   if(response){
    this.spinner.hide();
   }

if(response.totalCount == '0'){
  this.snotifyService.error(this.translate.instant('Data is not available'), '');
  return
}

this.pointCompareArray = [];
this.chartDataArray = [];
this.pointConditionArray = [];

this.pointConditionArray = response.waterFlowResponse[0]
this.pointCompareArray = response.waterFlowResponse

this.sensorMappingData();

  })
}

}

sensorMappingData(){
  if(this.propertyNameData == this.pointConditionArray.adc0MappedTo){
    for (let j = 0; j < this.pointCompareArray.length; j++) {
    this.chartDataArray.push(this.pointCompareArray[j].batteryVoltage);
    this.chartLabels.push(this.pointCompareArray[j].dateTime);
    }
    this.chartData.push(
      { data: this.chartDataArray , label: this.sensorNameData })
      this.setChartOptions(this.propertyLabelData);
  }
  
  else if(this.propertyNameData == this.pointConditionArray.adc1MappedTo){
    for (let j = 0; j < this.pointCompareArray.length; j++) {
    
    this.chartDataArray.push(this.pointCompareArray[j].turbidity);
    this.chartLabels.push(this.pointCompareArray[j].dateTime);
    }
    this.chartData.push(
      { data: this.chartDataArray , label: this.sensorNameData })
      this.setChartOptions(this.propertyLabelData);
  }
  
  
  else if(this.propertyNameData == this.pointConditionArray.cH1MappedTo){
    for (let j = 0; j < this.pointCompareArray.length; j++) {
    this.chartDataArray.push(this.pointCompareArray[j].batteryVoltage);
    this.chartLabels.push(this.pointCompareArray[j].dateTime);
    }
    this.chartData.push(
      { data: this.chartDataArray , label: this.sensorNameData })
      this.setChartOptions(this.propertyLabelData);
  }
  
  else if(this.propertyNameData == this.pointConditionArray.cH2MappedTo){
    for (let j = 0; j < this.pointCompareArray.length; j++) {
    this.chartDataArray.push(this.pointCompareArray[j].saltwaterConductivity);
    this.chartLabels.push(this.pointCompareArray[j].dateTime);
    }
    this.chartData.push(
      { data: this.chartDataArray , label: this.sensorNameData })
      this.setChartOptions(this.propertyLabelData);
  }
  
  else if(this.propertyNameData == this.pointConditionArray.cH3MappedTo){
    for (let j = 0; j < this.pointCompareArray.length; j++) {
    this.chartDataArray.push(this.pointCompareArray[j].freshwaterConductivity);
    this.chartLabels.push(this.pointCompareArray[j].dateTime);
    }
    this.chartData.push(
      { data: this.chartDataArray , label: this.sensorNameData })
      this.setChartOptions(this.propertyLabelData);
  }
  
  else if(this.propertyNameData == this.pointConditionArray.cH4MappedTo){
    for (let j = 0; j < this.pointCompareArray.length; j++) {
    this.chartDataArray.push(this.pointCompareArray[j].waterTemprature);
    this.chartLabels.push(this.pointCompareArray[j].dateTime);
    }
    this.chartData.push(
      { data: this.chartDataArray , label: this.sensorNameData })
      this.setChartOptions(this.propertyLabelData);
  }
  
  else {
   
    this.propertyLabelData
    for (let j = 0; j < this.pointCompareArray.length; j++) {
    this.chartDataArray.push(this.pointCompareArray[j].batteryVoltage);
    this.chartLabels.push(this.pointCompareArray[j].dateTime);
    }
    this.chartData.push(
      { data: this.chartDataArray , label: this.sensorNameData })
      this.setChartOptions(this.propertyLabelData);
  }
}

 onChange(selectedDateValue: string): any {
   
    this.dateFilter.fromDateTime = moment(new Date(selectedDateValue)).format('YYYY-MM-DD'); 
    this.chartData = [];
    this.chartLabels = [];
 this.selectedDateData = selectedDateValue

  }


  handlePropertySelectionCustom(propertyName: any , propertyKey : any){
    this.propertyNameData = propertyName
   this.propertyLabelData = propertyKey
  }
handleSelection(data: any, type: string){

      if (type === 'Point') {
      this.helperArray.push(data);
      this.sensorIdData = data.mainSensorid
      this.sensorNameData = data.sensorname
      this.helperChipArray.push({ mainSensorid: data.mainSensorid, sensorname: data.sensorname });
      
      this.sensornames.push(data.mainSensorid);
      this.sensorNamesHelperArray.push(data.mainSensorid);

      if (this.comparePoint.sensorProperty === null) {
        this.comparePoint.sensorProperty = 0;
      }
      if (this.dateFilter.fromDateTime === null) {
        this.dateFilter.fromDateTime = moment(new Date()).format('YYYY-MM-DD');
        this.selectedDateData = this.dateFilter.fromDateTime = moment(new Date()).format('YYYY-MM-DD');
        this.selectedValue = 'Battery Voltage';
      }
 
    }
      if (type === 'Area') {
      this.chartData = [];
      this.chartLabels = [];
      this.sensorNamesHelperArray = [];
      this.helperChipArray = [];
      this.dataArr1 = [];
      this.dataArr2 = [];
      this.helperArray = [];
      this.sensornames = []
      this.handleSelectionData = data;
      this.handleSelectionType = type;
      this.todoService.setSelectedAreaData(data, type);
    }
    this.todoService.setAreaName(data.areaname);
    this.todoService.setAreaId(data.areaid);
    if (data.areaname == this.currentAreaName && this.cityChanged == false) {
      return;
    } else {
      switch (type) {

        case 'Area':
          this.currentArea = data.areaid;
          this.currentAreaName = data.areaname;
          this.todoService.setAreaId(this.currentArea);
          this.todoService.setAreaName(this.currentAreaName);
          this.todoService.getSelectedAreaId();
          this.selectedPoint = true;
          this.cityChanged = false;
          this.getSensorsByArea(data.areaid);
          this.moveCity = false;
          break;
        case 'Point':
          this.currentSensorId = data.mainSensorid;
          this.currentPointName = data.sensorname;
          this.moveArea = false;
          break;
        case 'Hour':
          this.selectedHour = data.name;
          this.moveHour = false;
          break;
      }
    }
    this.setChartTranslations();
  }




  /* this function gets the data of all sensor in an area */
  getSensorsByArea(areaId: any): void {
    this.todoService.getSensorsByAreaId(areaId).subscribe((response: any) => {
        this.points = response;
      this.realSensors = [...this.points];
      this.getAllSensorsData(this.realSensors);
   this.currentSensorId = 0;
      this.allData = [];
      this.barChartData = [];
      this.barChartLabels = [];
      this.selectedSensorData = [];
      this.accordianArray = [];
      this.sensorFinal = [];
      this.labelsTrack = [];
      this.propertyArray = [];
      this.dataArray = [];
      this.comparePoint.sensorProperty = 0;
    },
      error => {

      });
  }

  /* function that will call api to get all areas sensor data and store in one place */
  getAllSensorsData(sensorsArr: any): void {
    if (sensorsArr.length > 0) {
      this.loading = true;
      this.mainArray = [];
      let arr: any = [];
      let date: any;
      let itemsProcessed = 0;
      sensorsArr.map(async (element: any) => {
        if (this.dateFilter.fromDateTime == null) {
          date = moment(new Date()).format('MM/DD/YYYY 00:00:00');
          this.filteredDate = date;
        } else {
          date = moment(this.dateFilter.fromDateTime).format('MM/DD/YYYY 00:00:00');
          this.filteredDate = date;
        }
        arr = await this.todoService.getAllBySensorId(element.mainSensorid, date).toPromise();
        if (arr) {
          itemsProcessed++;
        }
        this.mainArray.push({ data: arr, id: element.mainSensorid });
        if (itemsProcessed === sensorsArr.length) {
          this.loading = false;
        }
        if (itemsProcessed === sensorsArr.length && itemsProcessed === this.realSensors.length) {
          this.loading = false;
          this.handlePropertySelection(this.currentPropertyName);
        }
      });
    } else {
      return;
    }

  }


  plotSensorData(sensorId: any) {
    if (this.sensorFinal.length == 0) {
      this.comparePoint.sensorProperty = 4;
      this.propertyAccessor = 'waterLevel';
    }

    this.dataArray = [];
    this.filteredDate = this.customDate;
    const index = this.mainArray.findIndex((x: { id: any; }) => x.id == sensorId);
    const response = this.mainArray[index].data.waterFlowResponse;
    if (response != null) {
      this.allData = response;
      this.drawWidgets(this.currentPointName);
      response.map((element: any) => {
        const index = this.barChartLabels.findIndex((x: any) => x == element.dateTime);
        if (index == -1) {
          element.dateTime = new Date(element.dateTime);
          this.barChartLabels.push(element.dateTime.toLocaleString());
        }
        this.labelsTrack.push({ sensorId, dateTime: element.dateTime.toLocaleString() });
        this.dataArray.push(element[this.propertyAccessor]);
        this.propertyArray.push({
          waterLevel: element.waterLevel, batteryVoltage: element.batteryVoltage, freshwaterConductivity: element.freshwaterConductivity,
          waterQuantity: element.waterQuantity, turbidity: element.turbidity
        });
      });

      this.sensorFinal.push({ sensorId: this.translate.instant(this.pointName), id: sensorId });
      this.barChartData.push({ data: this.dataArray, label: this.pointName });
    } else {
      this.allData = '';
      this.sensorFinal.push({ sensorId: this.translate.instant(this.pointName), id: sensorId });
    }
    this.setChartTranslations();
  }

  /* Function call to handle the data property filteration*/

  handlePropertySelection(propertyName: string): void {
    this.userSelectedProperty = propertyName;
    this.flagCurrentPropertyName = localStorage.getItem('yAxisValue');
    if (this.cookieService.get('language') === 'en') {

      if (propertyName === 'Battery Voltage' || propertyName === 'バッテリー電圧') {
        localStorage.setItem('yAxisValue', 'Battery Voltage');
      } else if (propertyName === 'Freshwater Electrical Conductivity' || propertyName === '淡水電気伝導度') {
        localStorage.setItem('yAxisValue', 'Freshwater Electrical Conductivity');
      } else if (propertyName === 'Water Quantity' || propertyName === '流量') {
        localStorage.setItem('yAxisValue', 'Water Quantity');
      } else if (propertyName === 'Water Level' || propertyName === '水深') {
        localStorage.setItem('yAxisValue', 'Water Level');
      } else if (propertyName === 'Turbidity' || propertyName === '濁度') {
        localStorage.setItem('yAxisValue', 'Turbidity');
      }
    }
    if (this.cookieService.get('language') === 'jp') {
      if (propertyName === 'Battery Voltage' || propertyName === 'バッテリー電圧') {
        localStorage.setItem('yAxisValue', 'バッテリー電圧');
      } else if (propertyName === 'Freshwater Electrical Conductivity' || propertyName === '淡水電気伝導度') {
        localStorage.setItem('yAxisValue', '淡水電気伝導度');
      } else if (propertyName === 'Water Quantity' || propertyName === '流量') {
        localStorage.setItem('yAxisValue', '流量');
      } else if (propertyName === 'Water Level' || propertyName === '水深') {
        localStorage.setItem('yAxisValue', '水深');
      } else if (propertyName === 'Turbidity' || propertyName === '濁度') {
        localStorage.setItem('yAxisValue', '濁度');
      }
    }
    this.currentPropertyName = propertyName;
    if (propertyName === 'Battery Voltage') {
      this.propertyAccessor = 'batteryVoltage';
    }
    if (propertyName === 'Freshwater Electrical Conductivity') {
      this.propertyAccessor = 'freshwaterConductivity';
    }
    if (propertyName === 'Water Quantity') {
      this.propertyAccessor = 'waterQuantity';
    }
    if (propertyName === 'Water Level') {
      this.propertyAccessor = 'waterLevel';
    }
    if (propertyName === 'Turbidity') {
      this.propertyAccessor = 'turbidity';
    }

    this.setChartTranslations();
    if (this.selectedSensorData.length === 0) {
      return;
    } else {

      if (propertyName === 'Freshwater Electrical Conductivity') {
        this.propertyAccessor = 'freshwaterConductivity';
        for (let i = 0; i < this.sensornames.length; i++) {
          this.todoService.getAllByMainSensorId(this.sensornames[i], this.customDate).subscribe((response: any) => {
            for (let j = 0; j < response.waterFlowResponse.length; j++) {
              this.barChartLabels.push(response.waterFlowResponse[j].dateTime);
              this.barChartData.push(response.waterFlowResponse[j].freshwaterConductivity);
            }
          });
        }
      }
      if (propertyName === 'Water Quantity') {
        this.propertyAccessor = 'waterQuantity';
        for (let i = 0; i < this.sensornames.length; i++) {
          this.todoService.getAllByMainSensorId(this.sensornames[i], this.customDate).subscribe((response: any) => {
            for (let j = 0; j < response.waterFlowResponse.length; j++) {
              this.barChartLabels.push(response.waterFlowResponse[j].dateTime);
              this.barChartData.push(response.waterFlowResponse[j].waterQuantity);
            }
          });
        }
      }
      if (propertyName === 'Water Level') {
        this.propertyAccessor = 'waterLevel';
        for (let i = 0; i < this.sensornames.length; i++) {
          this.todoService.getAllByMainSensorId(this.sensornames[i], this.customDate).subscribe((response: any) => {


            for (let j = 0; j < response.waterFlowResponse.length; j++) {

              this.barChartLabels.push(response.waterFlowResponse[j].dateTime);
              this.barChartData.push(response.waterFlowResponse[j].waterLevel);
            }
          });
        }
      }
      if (propertyName === 'Turbidity') {
        this.propertyAccessor = 'turbidity';
        for (let i = 0; i < this.sensornames.length; i++) {
          this.todoService.getAllByMainSensorId(this.sensornames[i], this.customDate).subscribe((response: any) => {
            for (let j = 0; j < response.waterFlowResponse.length; j++) {
              this.barChartLabels.push(response.waterFlowResponse[j].dateTime);
              this.barChartData.push(response.waterFlowResponse[j].turbidity);
            }
          });
        }
      }
      switch (propertyName) {
        case 'Battery Voltage':
          this.barChartData = [];
          this.allData = [];
          this.accordianArray = [];
          this.propertyAccessor = 'batteryVoltage';
          this.sensorFinal.map((element: any, index: any) => {
            const dataIndex = this.mainArray.findIndex((x: { id: any; }) => x.id == element.id);
            const response = this.mainArray[dataIndex].data.waterFlowResponse;
            if (response != null) {
                const dataArray: any = [];
              this.allData = response;
              this.drawWidgets(element.sensorId);
              this.barChartLabels = []; /*testing sample code*/
              response.map((element: any) => {
                const index = this.barChartLabels.findIndex((x: any) => x == element.dateTime);
                if (index == -1) {
                             this.barChartLabels.push(element.dateTime.toLocaleString());
                }
                dataArray.push(element.batteryVoltage);

              });
              this.barChartData.push({ data: dataArray, label: element.sensorId });
            } else {
              this.barChartLabels = [];
              this.accordianArray = [];
              this.allData = [];

            }

          });
          break;

        case 'Freshwater Electrical Conductivity':
          this.barChartData = [];
          this.allData = [];
          this.accordianArray = [];
          this.propertyAccessor = 'freshwaterConductivity';
          this.sensorFinal.map((element: any, index: any) => {
            const dataIndex = this.mainArray.findIndex((x: { id: any; }) => x.id == element.id);
            const response = this.mainArray[dataIndex].data.waterFlowResponse;
                     if (response != null) {
              const dataArray: any = [];
              this.allData = response;
              this.drawWidgets(element.sensorId);
              this.barChartLabels = []; /*testing sample code*/
              response.map((element: any) => {
                const index = this.barChartLabels.findIndex((x: any) => x == element.dateTime);
                if (index == -1) {
                                  this.barChartLabels.push(element.dateTime.toLocaleString());
                }
                dataArray.push(element.freshwaterConductivity);
              });
              this.barChartData.push({ data: dataArray, label: element.sensorId });
            } else {
              this.barChartLabels = [];
              this.accordianArray = [];
              this.allData = [];
            }
          });
          break;
        case 'Water Quantity':
          this.barChartData = [];
          this.allData = [];
          this.accordianArray = [];
          this.propertyAccessor = 'waterQuantity';
          this.sensorFinal.map((element: any, index: any) => {
            const dataIndex = this.mainArray.findIndex((x: { id: any; }) => x.id == element.id);
            const response = this.mainArray[dataIndex].data.waterFlowResponse;
                if (response != null) {
              const dataArray: any = [];
              this.allData = response;
              this.drawWidgets(element.sensorId);
              this.barChartLabels = []; /*testing sample code*/
              response.map((element: any) => {
                const index = this.barChartLabels.findIndex((x: any) => x == element.dateTime);
                if (index == -1) {
                                this.barChartLabels.push(element.dateTime.toLocaleString());
                }
                dataArray.push(element.waterQuantity);

              });
              this.barChartData.push({ data: dataArray, label: element.sensorId });
            } else {
              this.barChartLabels = [];
              this.accordianArray = [];
              this.allData = [];
            }
          });
          break;
        case 'Water Level':
          this.barChartData = [];
          this.allData = [];
          this.accordianArray = [];
          this.propertyAccessor = 'waterLevel';
          this.sensorFinal.map((element: any, index: any) => {
            const dataIndex = this.mainArray.findIndex((x: { id: any; }) => x.id == element.id);
            const response = this.mainArray[dataIndex].data.waterFlowResponse;
                     if (response != null) {
              const dataArray: any = [];
              this.allData = response;
              this.drawWidgets(element.sensorId);
              this.barChartLabels = []; /*testing sample code*/
              response.map((element: any) => {
                const index = this.barChartLabels.findIndex((x: any) => x == element.dateTime);
                if (index == -1) {
                               this.barChartLabels.push(element.dateTime.toLocaleString());
                }
                dataArray.push(element.waterLevel);
              });
              this.barChartData.push({ data: dataArray, label: element.sensorId });
            } else {
              this.barChartLabels = [];
              this.accordianArray = [];
              this.allData = [];
            }
          });
          break;
        case 'Turbidity':
          this.barChartData = [];
          this.allData = [];
          this.accordianArray = [];
          this.propertyAccessor = 'turbidity';
          this.sensorFinal.map((element: any, index: any) => {
            const dataIndex = this.mainArray.findIndex((x: { id: any; }) => x.id == element.id);
            const response = this.mainArray[dataIndex].data.waterFlowResponse;
                      if (response != null) {
              const dataArray: any = [];
              this.allData = response;
              this.drawWidgets(element.sensorId);
              this.barChartLabels = []; /*testing sample code*/
              response.map((element: any) => {
                const index = this.barChartLabels.findIndex((x: any) => x == element.dateTime);
                if (index == -1) {
                                 this.barChartLabels.push(element.dateTime.toLocaleString());
                }
                dataArray.push(element.turbidity);
              });
              this.barChartData.push({ data: dataArray, label: element.sensorId });
            } else {
              this.barChartLabels = [];
              this.accordianArray = [];
              this.allData = [];
            }
          });
          break;
      }
    }
  }

  /* Function call to draw widgets with current sesnor id */
  drawWidgets(sensorName?: any) {
    let accordionAverageData = {
      sensorId: 0,
      batteryVoltage: 0,
      freshwaterConductivity: 0,
      waterLevel: 0,
      waterQuantity: 0,
      turbidity: 0,
      sensorName: '',
      batteryUnit: '',
      conductivityUnit: '',
      levelUnit: '',
      quanityUnit: '',
      turbidityUnit: ''
    };
    /*TEST CODE FOR DYNAMIC WIDGETS STARTS*/
    for (let i = 0; i < this.allData.length; i++) {
      this.batteryVoltageAverage = this.batteryVoltageAverage + this.allData[i].batteryVoltage;
      this.freshwaterConductivityAverage = this.freshwaterConductivityAverage + this.allData[i].freshwaterConductivity;
      this.waterLevelAverage = this.waterLevelAverage + Number(this.allData[i].waterLevel);
      this.waterQuantityAverage = this.waterQuantityAverage + Number(this.allData[i].waterQuantity);
      this.turbidityAverage = this.turbidityAverage + Number(this.allData[i].turbidity);
      if (i == this.allData.length - 1) {
        accordionAverageData = {
          sensorId: this.allData[i].mainSensorId,
          batteryVoltage: (this.batteryVoltageAverage / this.allData.length),
          freshwaterConductivity: (this.freshwaterConductivityAverage / this.allData.length),
          waterLevel: (this.waterLevelAverage / this.allData.length),
          waterQuantity: (this.waterQuantityAverage / this.allData.length),
          turbidity: (this.turbidityAverage / this.allData.length),
          sensorName,
          batteryUnit: 'V',
          conductivityUnit: 'μS/cm',
          levelUnit: 'm',
          quanityUnit: 'gpm',
          turbidityUnit: 'degree'
        };
        this.accordianArray.push(accordionAverageData);
      }
    }
    /*TEST CODE FOR DYNAMIC WIDGETS ENDS*/
    this.batteryVoltageAverage = 0;
    this.freshwaterConductivityAverage = 0;
    this.waterLevelAverage = 0;
    this.waterQuantityAverage = 0;
    this.turbidityAverage = 0;
  }

  /* Function called when sensor is removed */
  removeChartBySensor(sensorId: any, sensorName: any) {
    const dataIndex = this.barChartData.findIndex(x => x.label == sensorName);
     if (dataIndex != -1) {
      this.barChartData.splice(dataIndex, 1);
      const removableDates = this.labelsTrack.filter((x: { sensorId: any; }) => x.sensorId == sensorId);
      removableDates.map((element: any) => {
        // tslint:disable-next-line:max-line-length
        const checkExists = this.labelsTrack.filter((x: { sensorId: any; dateTime: any }) => x.sensorId != sensorId && x.dateTime == element.dateTime);
        if (checkExists.length <= 0) {
          this.labelsTrack = this.labelsTrack.filter((x: { sensorId: any; dateTime: any }) => x.sensorId != sensorId);
        }
      });
      this.selectedSensorData.length == 0 ? this.currentPointName = '' : [];
      this.selectedSensorData.length == 0 ? this.comparePoint.sensorProperty = 0 : [];
      this.selectedSensorData.length == 0 ? this.propertyAccessor = 'waterLevel' : [];
      this.dataArray = [];
      this.barChartLabels = [];
      this.labelsTrack.map((val: any) => {
        this.barChartLabels.push(val.dateTime);
      });
    } else {
      this.barChartData.splice(dataIndex, 1); // TESTING CODE
      return;
    }
  }

  /*Function call to handle the adding of topmost widgets with average data */

  remove(point: any) {


    let removedElement: any;
    for (let j = 0; j < this.chartData.length; j++) {
      if (this.chartData[j].label === point.sensorname) {
        this.chartData.splice(j, 1);


      }
    }

    for (let k = 0; k < this.accordianArray.length; k++) {
      if (this.accordianArray[k].sensorName === point.sensorname) {
        this.accordianArray.splice(k, 1);
      }
    }

    for (let i = 0; i < this.helperChipArray.length; i++) {
      if (this.helperChipArray[i].sensorname === point.sensorname) {
        removedElement = this.helperArray.splice(i, 1);
        this.helperChipArray.splice(i, 1);
        this.points.push(removedElement[0]);
        // this.chartLabels = [];
        break;
      }
    }

    for (let l = 0; l < this.sensornames.length; l++) {
      if (this.sensornames[l] === point.mainSensorid) {
        this.sensornames.splice(l, 1);
        break;
      }
    }
   }

  /* Functions for live data api call and alert function */
  getLiveData(): any {

    if (this.points.length > 0) {
      this.getAllSensorsData(this.realSensors);
      // const confirmation = confirm(this.translate.instant('New data has been updated. Are you sure you want to refresh the window?'));
      // if (confirmation) {
       
      // } else {
      //   return;
      // }
    } else {
      return;
    }
  }

  getAlertData(messageText: any): any {
      this.todoService.getUnreadAlerts(false).subscribe((response: any) => {
        this.alertsArray = response.alertResponses;
      if (this.alertsArray.length > 0) {
        const message = this.alertsArray[0].status;
        this.snotifyService.confirm(this.translate.instant('Mark this notification as read?'), this.translate.instant('The threshold has been exceeded'), {
          buttons: [
            {
              text: this.cookieService.get('language') === 'en' ? 'Yes' : 'はい', action: toast => {
                this.markRead(toast);
              },
            },
            {
              text: this.cookieService.get('language') === 'en' ? 'No' : '番号', action: toast => {

                this.snotifyService.remove(toast.id);
                           this.todoService.getUnreadAlerts(false).subscribe((res: any) => {
                              });
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
          closeOnClick: false,
          pauseOnHover: true,
          titleMaxLength: 50
        });
      }
    },
      (error: any) => {
      });
  }

  markRead(toast: SnotifyToast): any {
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




  setChartOptions(propertyNameData: any){
    if (this.cookieService.get('language') === 'en') {
    } else {
      }
    this.chartOptions = {
      title: {
             text: this.translate.instant(this.cookieService.get('language') === 'en' ? this.titleEnglish : this.titleJapanese),
        display: true
      },
      scaleShowVerticalLines: true,
      responsive: true,
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: this.translate.instant(propertyNameData),
          }
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: this.translate.instant(this.cookieService.get('language') === 'en' ? this.labelEnglish : this.labelJapanese)
          }
        }]
      }
    };

    /*test code ends*/
  }

  /*testing code ends*/
}

