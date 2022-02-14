import { Component, Input, OnInit } from '@angular/core';
import { PointDetailService } from './../../../services/point-detail.service';
import { MaintanenceRequestModel, MaintanenceResponseModel } from './../../../../../core/models/point-detail/point-detail.model';

@Component({
  selector: 'app-maintenance-settings',
  templateUrl: './maintenance-settings.component.html',
  styleUrls: ['./maintenance-settings.component.scss']
})
export class MaintenanceSettingsComponent implements OnInit {
  @Input() sensorId: string = '';
  @Input() sensorName: string = '';

  @Input() maintanenceRequest : MaintanenceRequestModel = {}; 
  maintanenceData : MaintanenceResponseModel[] = [];
  

  constructor(private pointDetailService : PointDetailService) { }

  ngOnInit(): void {
    this.getMaintanenceData();
  }

  getMaintanenceData(){
    this.pointDetailService.getMaintanenceDetails(this.sensorId).subscribe(res =>{
         this.maintanenceData = res;
    });
  }

  onSubmit(){
    this.maintanenceRequest;
  }


  // returnInitial(recordingCycle: string, transmissionCycle: string, alertLevel: string): void {
  //   if ((Number(this.recordingCycleInitial) === Number(recordingCycle)) && (Number(this.transmissionCycleInitial) === Number(transmissionCycle))) {

  //   } else {
  //     const data: any = sessionStorage.getItem('initialValues');
  //     const initialValues = JSON.parse(data);
  //     this.recordingCycle = initialValues.initialRecording;
  //     this.transmissionCycle = initialValues.initialTransmission;

  //     const maintenanceData = {
  //       id: this.sensorPrimaryId,
  //       mainSensorId: this.currentSensorId.toString(),
  //       number: 0,
  //       name: this.pointName,
  //       recordingCycle: this.recordingCycleInitial,
  //       transmissionCycle: this.transmissionCycleInitial,
  //       recordingCycleInitial: this.recordingCycleInitial,
  //       transmissionCycleInitial: this.transmissionCycleInitial,
  //       mode: 'auto',
  //       updatedDate: moment(new Date()).format('dd-mm-YYYY'),
  //       alertLevel
  //     };

  //     this.todoService.getMaintenanceByMainSensorId(this.currentSensorId.toString()).subscribe((response: any) => {

  //       this.recordingCycle = Number(response[0].recordingCycleInitial);
  //       this.transmissionCycle = Number(response[0].transmissionCycleInitial);
  //       this.currentMaintenaceid = response[0].id;
  //            const maintenanceData = {
  //         id: this.currentMaintenaceid,
  //         mainSensorId: this.currentSensorId.toString(),
  //         number: 0,
  //         name: this.pointName,
  //         recordingCycle: this.recordingCycleInitial,
  //         transmissionCycle: this.transmissionCycleInitial,
  //         recordingCycleInitial: this.recordingCycleInitial,
  //         transmissionCycleInitial: this.transmissionCycleInitial,
  //         mode: 'auto',
  //         updatedDate: moment(new Date()).format('dd-mm-YYYY'),
  //         alertLevel
  //       };  
  //       this.todoService.updateMaintenance(this.currentMaintenaceid, maintenanceData).subscribe((response: any) => {
  //         this.snotifyService.success(this.translate.instant('Values set to initial successfully'), '', {
  //           timeout: 7000,
  //           showProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true
  //         });
  //       });
  //           });

  //   }
  // }


  // updateMaintenance(recordingCycle: string, transmissionCycle: string, alertLevel: string): void {
  //   this.loadingSetting = true;
  //   if (Number(recordingCycle) == null) {
  //     this.snotifyService.success(this.translate.instant('Recording Cycle cannot be empty'), '', {
  //       timeout: 7000,
  //       showProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true
  //     });
  //   }
  //   if (Number(transmissionCycle) == null) {
  //     this.snotifyService.success(this.translate.instant('Transmission Cycle cannot be empty'), '', {
  //       timeout: 7000,
  //       showProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true
  //     });
  //   }
  //   if (Number(transmissionCycle) == null) {
  //     this.snotifyService.error(this.translate.instant('Alert Level cannot be empty'), '', {
  //       timeout: 7000,
  //       showProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true
  //     });
  //   }
  //   if (Number(transmissionCycle) !== null && Number(recordingCycle) !== null && Number(alertLevel) !== null) {
  //     if (Number(alertLevel) < 1 || Number(alertLevel) > 10) {
  //       this.snotifyService.error(this.translate.instant('Please enter Alert Level from 1 to 10'), '', {
  //         timeout: 7000,
  //         showProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true
  //       });
  //     }
  //     if (Number(transmissionCycle) < 1 || Number(transmissionCycle) > 1440) {
  //       this.snotifyService.error(this.translate.instant('Please enter Transmission Cycle minutes from 1 to 1440'), '', {
  //         timeout: 7000,
  //         showProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true
  //       });
  //     }
  //     if (Number(recordingCycle) < 1 || Number(recordingCycle) > 1440) {
  //       this.snotifyService.error(this.translate.instant('Please enter Recording Cycle minutes from 1 to 1440'), '', {
  //         timeout: 7000,
  //         showProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true
  //       });
  //     }
  //     // tslint:disable-next-line:max-line-length
  //     if ((Number(transmissionCycle) >= 1 && Number(transmissionCycle) <= 1440) && (Number(recordingCycle) >= 1 && Number(recordingCycle) <= 1440) && (Number(alertLevel) >= 1 && Number(alertLevel) <= 10)) {
  //       const maintenanceData = {
        
  //         id: this.currentMaintenaceid,
  //         mainSensorId: this.currentSensorId.toString(),
  //         number: 0,
  //         name: this.pointName,
  //         recordingCycle,
  //         transmissionCycle,
  //         recordingCycleInitial: this.recordingCycleInitial,
  //         transmissionCycleInitial: this.transmissionCycleInitial,
  //         mode: 'auto',
  //         // updatedDate: moment(new Date()).format('MM/DD/YYYY , h:mm:ss '),
  //         updatedDate: new Date(),
  //         alertLevel
  //       };
  //            this.todoService.updateMaintenance(this.currentMaintenaceid, maintenanceData).subscribe((response: any) => {

  //         this.loadingSetting = false;
  //         this.snotifyService.success(this.translate.instant('Data updated successfully'), '', {
  //           timeout: 7000,
  //           showProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true
  //         });
  //          this.todoService.getMaintenanceByMainSensorId(this.currentSensorId).subscribe((response: any) => {
  //            this.recordingCycleInitial = response[0].recordingCycleInitial;
  //           this.currentMaintenaceid = response[0].id;
  //           this.transmissionCycleInitial = response[0].transmissionCycleInitial;
  //           this.recordingCycle = response[0].recordingCycle;
  //           this.transmissionCycle = response[0].transmissionCycle;
  //           this.alertLevel = response[0].alertLevel;
  //           this.pointName = response[0].name;
  //         }, error => {
  //           this.loadingSetting = false;
  //         });
  //       },
  //         error => {
  //           this.loadingSetting = false;

  //         });
  //     }
  //   }
  // }
}
