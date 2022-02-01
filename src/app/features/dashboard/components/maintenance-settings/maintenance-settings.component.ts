import { Component, OnInit } from '@angular/core';
import {TodoService} from "../../../../services/todo.service";

@Component({
  selector: 'app-maintenance-settings',
  templateUrl: './maintenance-settings.component.html',
  styleUrls: ['./maintenance-settings.component.scss']
})
export class MaintenanceSettings implements OnInit {
  selectedArea: boolean = false;
  selectedPoint: boolean = false;
  currentAreaName: string = '';
  currentArea: number = 0;
  moveCity: boolean = false;
  currentSensorId: number = 0;
  currentPointName: string = '';
  moveArea: boolean = false;
  selectedHour: string = '1 Hour';
  moveHour: boolean = false;
  pointName: string = ''
  selectedSensorData: any = [];

  areas: any[] = [
    {name: 'Area of six', id: 1}
  ];

  points: any[] = [
    {name: 'Point A', id: 1},
    {name: 'Point B', id: 2},
    {name: 'Point C', id: 3}
  ];

  constructor(private todoService: TodoService) {
  }

  ngOnInit() {
  }

  /*SAMPLE CODE STARTS*/
  handleSelection(data: any, type: string) {
    switch (type) {
      case 'Area':
        this.currentArea = data.id;
        this.currentAreaName = data.name;
        this.selectedPoint = true;
        this.moveCity = false;
        break;
      case 'Point':
        this.currentSensorId = data.id;
        this.currentPointName = data.name;
        this.moveArea = false;
        break;
      case 'Hour':
        this.selectedHour = data.name;
        this.moveHour = false;
        break;
    }
  }

  /**Function call to add the points as chosen */
  checkBoxvalue(checkBoxName: any, propertyName: any) {
    let pointIndex = this.points.findIndex((x: { id: any; }) => x.id == checkBoxName.id);
    if (pointIndex != -1) {
      this.pointName = checkBoxName.name;
      this.selectedSensorData.push({ name: checkBoxName.name, id: checkBoxName.id });
      this.points.splice(pointIndex, 1);
      /*this.toggle(null, checkBoxName.id, propertyName);*/
    }
    else {
      this.selectedSensorData.pop(checkBoxName.name);
      this.selectedSensorData.push({ name: checkBoxName.name, id: checkBoxName.id });
    }
  }

  get city() {
    return this.todoService.getSelectedCity();
  }
  /*SAMPLE CODE ENDS*/
}
