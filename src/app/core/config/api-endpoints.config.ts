export const ApiEndpoints = {
    Auth: {
        Login: 'User/LoginUser',
        // SetPassword: 'Auth/SetPassword',
        // ValidateToken: 'Auth/ValidateToken',
        // ForgotPassword: 'Auth/ForgotPassword'
    },
    Common: {
        //  GetCities : 'City/getAllCities',
        //  UserCities : 'UserCity/getUserCitiesByUserId'
    },
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
        allReadUnreadAlerts : 'Alerts/getAllReadUnreadAlerts'
    },
    WaterFlow : {
        waterFlowListByDatesSensorId : 'WaterFlow/getAllByMainSensorIdAndMultipleDates', 
    },
    


    
};