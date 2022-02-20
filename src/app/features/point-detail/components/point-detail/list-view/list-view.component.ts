import { Component, Input, OnInit } from '@angular/core';
import { WaterFlowResponseModel } from 'src/app/core/models';


@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {
  @Input() sensorId: string = '';
  @Input() listViewData : any = [];
  
 
  constructor() { }

  ngOnInit() {
    this.listViewData ;
   }



}
