export const ApiEndpoints = {
    // Auth: {
    //     Login: 'Auth/Login',
    //     SetPassword: 'Auth/SetPassword',
    //     ValidateToken: 'Auth/ValidateToken',
    //     ForgotPassword: 'Auth/ForgotPassword'
    // },
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
    },
    WaterFlow : {
        waterFlowListByDatesSensorId : 'WaterFlow/getAllByMainSensorIdAndMultipleDates',
        
    },
    


    
};