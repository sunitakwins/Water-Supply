export const ApiEndpoints = {
    Auth: {
        Login: 'User/LoginUser',
    },
    // Common: {
    //     //  GetCities : 'City/getAllCities',
    //     //  UserCities : 'UserCity/getUserCitiesByUserId'
    // },
    UserCity: {
         UserCitiesList : 'UserCity/getUserCitiesByUserId' 
    },
    CityArea : {
         CityAreasList : 'CityArea/getCityAreasByCityId',
    },
    AreaSensor : {
         AreaSensorsList : 'AreaSensor/getAreaSensorsByAreaId',
    },
    Alerts : {
        alertListByMainSensorId : 'Alerts/getAlertsByMainSensorId',
        alertListByMainSensorIdDate : 'Alerts/getAlertsByMainSensorIdAndDate',
        allReadUnreadAlerts : 'Alerts/getAllReadUnreadAlerts'
    },
    WaterFlow : {
        waterFlowListByDatesSensorId : 'WaterFlow/getAllByMainSensorIdAndMultipleDates',
         
    },
    


    
};