import { Component, Input, OnInit } from '@angular/core';
import { AlarmSettingResponseModel } from 'src/app/core/models/point-detail';
import { PointDetailService } from '../../../services/point-detail.service';

@Component({
  selector: 'app-alarm-settings',
  templateUrl: './alarm-settings.component.html',
  styleUrls: ['./alarm-settings.component.scss']
})
export class AlarmSettingsComponent implements OnInit {
  @Input() sensorId: string = '';
  @Input() sensorName: string = '';
  
  alarmSettingData : AlarmSettingResponseModel = {}; 
  
  constructor(private pointDetailService : PointDetailService) { }

  ngOnInit(): void {
     this.getAlarmSettingData(); 
  }

  getAlarmSettingData(){
    this.pointDetailService.getAlamSettingDetails(this.sensorId).subscribe(res =>{
      // res.forEach(ele => {
      //   this.
      // });
      this.alarmSettingData = res;
    })
  }
}
