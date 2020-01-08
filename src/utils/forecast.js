const request = require('request');

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/506663813542b507e3c34b24c0581a8c/'+lat+','+long;
    request({url : url, json : true},(error, response) => {
        if(error){
            // console.log('Unable to connect to Weather App');
            callback('Unable to connect to Weather App',undefined);
        }else if(response.body.error){
            // console.log('Unable to find Location');
            callback('Unable to find Location',undefined);
        }else{ 
            // console.log('Current Temperature is '+response.body.currently.temperature+ ' so there is '+response.body.currently.precipProbability+'% chances of rain');
            callback(undefined,'Current Temperature is '+response.body.currently.temperature+ ' so there is '+response.body.currently.precipProbability+'% chances of rain');
        }
    })
}

module.exports = {
    forecast : forecast
};