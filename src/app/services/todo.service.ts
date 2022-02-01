import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Todo} from '../model/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private subject = new Subject<any>();
  private language = new Subject<any>();
  currentCityName = ''; /*testing code*/
  userSelectedPoint: any;
  cityName = '';
  areaName = '';
  pointName = '';
  pointId = 0;
  areaId = 0;
  cityId = 0;
  selectedLanguage = '';
  selectedAreaData: any;
  selectedAreaType: any;
  selectedPointData: any;
  selectedPointType: any;
  baseurl = 'https://d1rh4b0dx4fns2.cloudfront.net/api/WaterFlow/getBySensorId';
  headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');
    
    languageData : BehaviorSubject<any>;

  constructor(private http: HttpClient) {
    this.languageData = new BehaviorSubject<any>({});
  }

  /* Api calls for handling the city state subjects */
  getClickEvent(): Observable<any> {
    return this.subject.asObservable();
  }

  sendClickEvent(): void {
    this.subject.next();
  }

  getLangEvent(): Observable<any> {
    return this.language.asObservable();
  }

  sendLangEvent(): void {
    this.language.next();
  }

  /* get and set selected city and city id */
  getSelectedCity(): any {
    return this.cityName;
    
  }
  getSelectedCityID(){
    return  this.cityId ; 
  }

  getCityId(): any {
    return this.cityId;
  }

  setSelectedCity(cityName: string, cityId: any): void {
    this.cityName = cityName;
    this.cityId = cityId;
  }

  setSelectedLanguage(langugae: any): void {
    this.selectedLanguage = langugae;
  }

  getSelectedLanguage(): any {
    return this.selectedLanguage;
  }

  /* get data by sensor id with limit */
  getDataBySensorId(sensorId: number, data: any): Observable<any> {
    return this.http.post<any>(`https://d1rh4b0dx4fns2.cloudfront.net/api/WaterFlow/getByMainSensorId/?mainsensorId=${sensorId}`, data, {headers: this.headers});
  }

  /* get data by sensor id and time stamp */

  // tslint:disable-next-line:typedef
  getAllBySensorIdAndTimeStamp(data: any) {
    return this.http.get<any>(`https://d1rh4b0dx4fns2.cloudfront.net/api/WaterFlow/getAllByMainSensorIdAndTimeStamp?mainsensorId=${data.sensorId}&fromDateTime=${data.fromDateTime}&toDateTime=${data.toDateTime}`, {headers: this.headers});
  }

  /* get all data by sensor id */
  getAllBySensorId(sensorId: any, date: any): Observable<any> {

    return this.http.get<any>(`https://d1rh4b0dx4fns2.cloudfront.net/api/WaterFlow/getAllByMainSensorId?mainsensorId=${sensorId}&date=${date}`, {headers: this.headers});
  }

  /* get api calls for binding cities,areas and area sensors start */

  // tslint:disable-next-line:typedef
  getCityByUserId(userId: any) {
    return this.http.get(`https://d1rh4b0dx4fns2.cloudfront.net/api/UserCity/getUserCitiesByUserId?userId=${userId}`);
  }

  // tslint:disable-next-line:typedef
  getAllCityAreas() {
    return this.http.get(`https://d1rh4b0dx4fns2.cloudfront.net/api/CityArea/getAllCityAreas`);
  }

  // tslint:disable-next-line:typedef
  getAreaByCity(cityId: any) {
    return this.http.get(`https://d1rh4b0dx4fns2.cloudfront.net/api/CityArea/getCityAreasByCityId?cityId=${cityId}`);
  }

  // tslint:disable-next-line:typedef
  getSensorsByAreaId(areaId: any) {
    return this.http.get(`https://d1rh4b0dx4fns2.cloudfront.net/api/AreaSensor/getAreaSensorsByAreaId?areaId=${areaId}`);
  }

  /* get api calls for maintenance setting of a sensor */

  // tslint:disable-next-line:typedef
  getMaintenanceByMainSensorId(mainSensorId: any) {
    return this.http.get(`https://d1rh4b0dx4fns2.cloudfront.net/api/Maintenance/getMaintenanceByMainSensorId?mainSensorId=${mainSensorId}`);
  }

  /* get api calls for threshold setting of a sensor */

  // tslint:disable-next-line:typedef
  getThresholdValuesByMainSensorId(mainSensorId: any) {
    return this.http.get(`https://d1rh4b0dx4fns2.cloudfront.net/api/ThresholdValues/getThresholdValuesByMainSensorId?mainSensorId=${mainSensorId}`);
  }

  /* get api calls for alarms history for all sensors */

  // tslint:disable-next-line:typedef
  updateMaintenance(currentMaintenaceid: any, data: any) {
    // tslint:disable-next-line:max-line-length
    return this.http.put(`https://d1rh4b0dx4fns2.cloudfront.net/api/Maintenance/UpdateMaintenance?id=${currentMaintenaceid}`, data);
  }

  /* get api calls for alarms history for all sensors */

  // tslint:disable-next-line:typedef
  getAlarmsHistory() {
    return this.http.get(`https://d1rh4b0dx4fns2.cloudfront.net/api/Alerts/getAllAlerts`);
  }

  getAlertsBySensorId(mainSensorId: any): any {
    return this.http.get(`https://d1rh4b0dx4fns2.cloudfront.net/api/Alerts/getAlertsByMainSensorId?mainSensorId=${mainSensorId}`);
  }
  getAlertsByFilterDate(mainSensorId: any , date : any){
    return this.http.get(`https://d1rh4b0dx4fns2.cloudfront.net/api/Alerts/getAlertsByMainSensorIdAndDate?mainSensorId=${mainSensorId}&date=${date}`);
  }

  // tslint:disable-next-line:typedef
  getUnreadAlerts(status: any) {
    return this.http.get(`https://d1rh4b0dx4fns2.cloudfront.net/api/Alerts/getAllReadUnreadAlerts?isRead=${status}`);
  }

  // tslint:disable-next-line:typedef
  updateAlert(object: any, id: any) {
    return this.http.put(`https://d1rh4b0dx4fns2.cloudfront.net/api/Alerts/UpdateAlert?id=${id}`, object);
  }

  /* calls to be deleted */

  // tslint:disable-next-line:typedef
  fetchTodos() {
    return this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos');
  }

  // tslint:disable-next-line:typedef
  deleteTodo(id: number) {
    return this.http.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
  }

  // tslint:disable-next-line:typedef
  addTodo(payload: Todo) {
    return this.http.post<Todo>('https://jsonplaceholder.typicode.com/todos', payload);
  }

  // tslint:disable-next-line:typedef
  updateTodo(payload: Todo, id: number) {
    return this.http.put<Todo>(`https://jsonplaceholder.typicode.com/todos/${id}`, payload);
  }

  // tslint:disable-next-line:typedef
  updateThresholdValues(id: any, body: any) {
    // tslint:disable-next-line:max-line-length
    return this.http.put(`https://d1rh4b0dx4fns2.cloudfront.net/api/ThresholdValues/UpdateThresholdValues?id=${id}`, body);
  }

  /* get sensor data by main sensor id and date*/
  getAllByMainSensorId(mainSensorID: any, date: any): any {
    return this.http.get(`https://d1rh4b0dx4fns2.cloudfront.net/api/WaterFlow/getAllByMainSensorId?mainsensorId=${mainSensorID}&date=${date}`);
  }

  /* get city name */
  setAreaName(name: any): any {

    this.areaName = name;
    // return this.areaName;
  }

  setAreaId(areaId: any): any {
    this.areaId = areaId;
  }

  getSelectedAreaId(): any {
    return this.areaId;
  }

  getSelectedAreaName(): any {

    return this.areaName;
  }

  /* get point name */
  setPointName(name: any): any {

    this.pointName = name;
    // return this.areaName;
  }

  setPointId(areaId: any): any {
    this.pointId = areaId;
  }
 
  setSelectedAreaData(data: any, type: string): any {
    this.selectedAreaData = data;
    this.selectedAreaType = type;
  }
 getSelectedAreaData(): any {
     return [this.selectedAreaData, this.selectedAreaType];
  }
    setCurrentCity(currentCity: any): any {
    this.currentCityName = currentCity.cityname;
  }

  getCurrentCity(): any {
    return this.currentCityName;
  }
  getAllByMainSensorIdAndMultipleDates(filteredDateData: any): any {
    
    return this.http.get(`https://d1rh4b0dx4fns2.cloudfront.net/api/WaterFlow/getAllByMainSensorIdAndMultipleDates?mainsensorId=${filteredDateData.mainSensorID}&fromDate=${filteredDateData.fromDate}&toDate=${filteredDateData.toDate}`);
  }
  getAllSensorTypes(): any{
    return this.http.get('https://d1rh4b0dx4fns2.cloudfront.net/api/SensorTypes/GetAllSensorTypes');
  }

    addThresholdValues(data: any): any{
      return this.http.post('https://d1rh4b0dx4fns2.cloudfront.net/api/ThresholdValues/AddThresholdValues', data, {headers: this.headers});
  }

    addOrUpdateThresholdValues(id: any, data: any): any {
       return this.http.post(`https://d1rh4b0dx4fns2.cloudfront.net/api/ThresholdValues/AddOrUpdateThresholdValues?id=${id}`, data);
  }

  setDropDownSelectedPoint(pointData: any): any{
       this.userSelectedPoint = pointData;
  }

  getDropDownSelectedPoint(): any{
      return this.userSelectedPoint;
  }

  private _showLogin$ = new BehaviorSubject<any>('');
  showLogin$ = this._showLogin$.asObservable();

  setMenu(loginValue: string) {
    this._showLogin$.next(loginValue)

  }


}



