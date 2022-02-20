import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PointDetailService } from './../../../services/point-detail.service';

@Component({
  selector: 'app-graphical-view',
  templateUrl: './graphical-view.component.html',
  styleUrls: ['./graphical-view.component.scss']
})
export class GraphicalViewComponent implements OnInit {
  @Input() sensorId: string = '';
  @Input() graphListData: any = [];

  batteryVoltageDataArray : any = [] ;
  freshwaterConductivityDataArray : any = [];
  waterQuantityDataArray : any = [];
  waterLevelDataArray : any = [];
  turbidityDataArray : any = [];
  seaWaterElectricalConductivityArray : any = [];
  waterTemperatureArray : any =[];

  lineChartColors : any =[];
  lineChartData : any = [];


  constructor(
    private  translateService : TranslateService,
    private pointDetailService: PointDetailService) { }

  ngOnInit(): void {
     let data = this.graphListData.waterFlowResponse;
    this.lineChartColors = this.pointDetailService.lineChartColors;

    this.batteryVoltageDataArray = data.map((x:any) => x.batteryVoltage);
    this.freshwaterConductivityDataArray = data.map((x:any) => x.freshwaterConductivity);
    this.waterQuantityDataArray = data.map((x:any) => x.waterQuantity);
    this.waterLevelDataArray = data.map((x:any) => x.waterLevel);
    this.turbidityDataArray = data.map((x:any) => x.turbidity);
    this.seaWaterElectricalConductivityArray = data.map((x:any) => x.saltwaterConductivity); /*testing*/
    this.waterTemperatureArray = data.map((x:any) => x.waterTemprature);


    this.lineChartData = [
      { data: this.waterQuantityDataArray, label: this.translateService.instant('Water Quantity(m3/sec)')},
      { data: this.waterLevelDataArray, label: this.translateService.instant('Water Level(m)') },
      { data: this.freshwaterConductivityDataArray, label: this.translateService.instant('Freshwater Electrical Conductivity(μS/cm)') },
      { data: this.seaWaterElectricalConductivityArray, label:this.translateService.instant('Seawater Electrical Conductivity(ms/cm)') },
      { data: this.waterTemperatureArray, label: this.translateService.instant('Water Temperature(°C)') },
      { data: this.turbidityDataArray, label: this.translateService.instant('Turbidity(度)') },
      { data: this.batteryVoltageDataArray, label: this.translateService.instant(`Battery Voltage(V)`)},
    ];

  }


}
