export interface AlarmSettingResponseModel {
    dataPointName?: string;
    deadZone?: number;
    deadZoneLowerValue?: number;
    deadZoneUpperValue?: number;
    id?: string;
    location?: string;
    lowerLimit?:number;
    lowerLowerLimit?: number;
    mainSensorId?: string;
    monitoringLevel?: number;
    order?: number;
    presentValue?: number;
    rateOfChange?: number;
    rateOfChangeValue?: number;
    ullcwDisplayValue?: number;
    unit?: string;
    upperAndLowerLimitCorrectionWidth?: number;
    upperLimit?: number;
    upperUpperLimit?: number;
}