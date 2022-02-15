import { Component, Input, OnInit } from '@angular/core';
import { PointDetailService } from './../../../services/point-detail.service';
import { EventService } from './../../../../../core/services/event.service';
import { WaterFlowRequestModel } from 'src/app/core/models';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {
  @Input() sensorId: string = '';
  @Input() listData: any = [];
  @Input() graphListData : any = [];
   
  selectedDates : any = [];

  constructor() { }

  ngOnInit() {
     
  }

  ngOnChanges(){
    this.graphListData;
  }


}
