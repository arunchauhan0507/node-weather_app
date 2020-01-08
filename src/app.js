const express = require('express');
const path = require('path');
const hbs = require('hbs');
const app = express();
const forecastM = require('./utils/forecast');
const geocodeM = require('./utils/geocode');

// console.log(__dirname);
// console.log(path.join(__dirname,'../public'));

//Define paths for express config
const publicDire = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialPath = path.join(__dirname,'../templates/partials');

//setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

//Setup static directory to serve
app.use(express.static(publicDire));

app.get('',(req, res) => {
    res.render('index',{
        title : 'Welcome to Express with Dynamic from views',
        name : 'Arun'
    });
})

app.get('/about',(req, res) => {
    res.render('index',{
        title : 'About Dynamic Page',
        name : 'Arun 1'
    });
})

app.get('/help',(req, res) => {
    res.render('index',{
        title : 'Help Dynamic Page',
        name : 'Arun 2'
    });
})

// app.get('',(req, res) => {
//     res.send('Hello World');
// })

// app.get('/help',(req, res) => {
//     res.send('Help World');
// })

// app.get('/about',(req, res) => {
//     res.send('<h1>About</h1>');
// })

app.get('/weather',(req, res) => {
    if(!req.query.address){
        return res.send({
            error : 'Address required to see forecast of given location'
        });
    }
    geocodeM.geocode(req.query.address, (error, response) => {
        if(error){
            return res.send({address : req.query.address,
                            error});
        }
        // console.log(response.latitude);
        // res.send({ lat : response.latitude})
        // return false;
        forecastM.forecast(response.latitude, response.longitude, (error, forecastresponse) => {
            if(error){
                return res.send('Something went wrong while getting forecast information');
            }
            res.send({
                address : req.query.address,
                location : response.location,
                forecast : forecastresponse
            });
        })
    })
    
})

app.get('/help/*' ,(req, res) => {
    // res.send('Help Article not found');  
    res.render('404' ,{
        title : 'Help Section',
        name : 'Arun',
        errorMessage : 'Help Article not found'
    });
})

app.get('*' ,(req, res) => {
    res.render('404' ,{
        title : '404',
        name : 'Arun',
        errorMessage : '404 Page not Found'
    });
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})