export interface MaintanenceResponseModel {
    alertLevel?: number;
    id?: string;
    mainSensorId?: string;
    mode?: string;
    name?: string;
    number?: number;
    recordingCycle?: string;
    recordingCycleInitial?:string;
    transmissionCycle?: string;
    transmissionCycleInitial?: string;
    updatedDate?: string;
}
