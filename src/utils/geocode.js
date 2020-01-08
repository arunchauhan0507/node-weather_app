const request = require('request');

const geocode = (address, callback) => {
    // setTimeout(() => {
        const key ='pk.eyJ1IjoiYXJ1bmNoYXVoYW4wNTA3IiwiYSI6ImNrNTI4Nnl4YjA2MnczcXFranp1MzZqZHgifQ.hOQqX9uwCE57n19h8hFyLg';
        const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token='+key+'&limit=1';
        // const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/New%20Delhi.json?access_token=pk.eyJ1IjoiYXJ1bmNoYXVoYW4wNTA3IiwiYSI6ImNrNTI4Nnl4YjA2MnczcXFranp1MzZqZHgifQ.hOQqX9uwCE57n19h8hFyLg&limit=1';

        request({url : geocodeURL, json : true},(error, response) =>{
                if(error){
                    // console.log('Unable to connect to Weather App');
                    callback('Unable to connect to Weather App',undefined);
                }else if(response.body.features.length === 0){
                    // console.log('Unable to find location Name in mapBox');
                    callback('Unable to find location Name in mapBox',undefined);
                }else{
                    // const latitude = response.body.features[0].center[1];
                    // const longitude = response.body.features[0].center[0];
                    // const location = response.body.features[0].place_name;
                    // callback(undefined,'lat '+latitude+' =long '+longitude+'='+location);
                    callback(undefined, {latitude: response.body.features[0].center[1],
                                        longitude : response.body.features[0].center[0],
                                        location : response.body.features[0].place_name});
                }
        })
    // },2000)
}

module.exports = {
    geocode : geocode
};