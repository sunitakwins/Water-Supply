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
  @Input() graphListData : any = [];

  // lineChartData: any[] = [
  //   { data: this.waterQuantityDataArray, label: 'Water Quantity(m3/sec)' },
  //   { data: this.waterLevelDataArray, label: 'Water Level(m)' },

  //   { data: this.freshwaterConductivityDataArray, label: 'Freshwater Electrical Conductivity(μS/cm)' },
  //   { data: this.seaWaterElectricalConductivityArray, label: 'Seawater Electrical Conductivity(ms/cm)' },
  //   { data: this.waterTemperatureArray, label: 'Water Temperature(°C)' },
  //   { data: this.turbidityDataArray, label: 'Turbidity(度)' },
  //   { data: this.batteryVoltageDataArray, label: `Battery Voltage(V)` },
  // ];


  constructor( private pointDetailService : PointDetailService) { }

  ngOnInit(): void {
     let lineChartColors = this.pointDetailService.lineChartColors;
     
  }


}
