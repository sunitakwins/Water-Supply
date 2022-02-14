import { Component, Input, OnInit } from '@angular/core';
import { PointDetailService } from './../../../services/point-detail.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {
  @Input() sensorId: string = '';
  @Input() listData: any = [];


  constructor( 
    private pointDetailService : PointDetailService) { }

  ngOnInit(): void {
    debugger
  this.listData;
  }



}
