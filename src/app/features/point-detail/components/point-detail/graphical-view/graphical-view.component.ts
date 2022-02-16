import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-graphical-view',
  templateUrl: './graphical-view.component.html',
  styleUrls: ['./graphical-view.component.scss']
})
export class GraphicalViewComponent implements OnInit {
  @Input() sensorId: string = '';
  @Input() graphListData : any = [];

  
  constructor() { }

  ngOnInit(): void {
    
  }

}
