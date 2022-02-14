import { Component, Input, OnInit } from '@angular/core';
import { WaterFlowRequestModel } from 'src/app/core/models';
import { EventService } from 'src/app/core/services';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-from-and-to-date',
  templateUrl: './from-and-to-date.component.html',
  styleUrls: ['./from-and-to-date.component.scss']
})
export class FromAndToDateComponent implements OnInit {
  @Input() showDateInputs: boolean = false;

  selectedFromDate: Date = new Date('');
  selectedToDate: Date = new Date('');
  selectedValue: string = '';
  sensorId : string = '';

  constructor(
    private datePipe : DatePipe,
    private eventService : EventService) { }

  ngOnInit(): void {

    this.eventService.sensorIdDetails.subscribe(res => {
     this.sensorId = res.mainSensorid;
      // this.sensorIdArray.push(res.mainSensorid);
      // console.log('aa', this.sensorIdArray);
    })
  }


  
  onSubmit() {

    if (!(this.selectedFromDate && this.selectedToDate)) return;

    const dateTimeData: WaterFlowRequestModel = {
      mainSensorId: this.sensorId,
      fromDate : this.datePipe.transform(this.selectedFromDate,'yyyy-MM-dd h:mm:ss a') || '',
      toDate : this.datePipe.transform(this.selectedToDate,'yyyy-MM-dd h:mm:ss a') || '',
    };
  
    // this.reportService.waterFlowDataBySensorIdDates(dateTimeData).subscribe(res => {
    //   let data = res.waterFlowResponse;
    //   this.eventService.alertSummaryData.next(data);
    //   // To DO ========
    //   if (this.selectedValue = DataTypeValue.ConvertedValue) {
    //     // 
    //   }
    // });

  }

}
