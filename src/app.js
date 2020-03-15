const path = require('path');
const express = require('express')
const hbs = require('hbs');

// The requires below are requesting two module files created.
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

// This variable creates an app using express.
const app = express();

// Define the paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public'); // This public directory is to make the root where you can use to find files, like imgs, style sheets and JavaScript Client Side files
const viewsPath = path.join(__dirname, '../templates/views'); // This is to define where is located the views directory, normally the root is where this js file is located inside a folder called 'views'
const partialsPath = path.join(__dirname, '../templates/partials'); // This is to define where are the partials, partials are files where you can put some html tags to make some reusable components using {{>NAMEOFPARTIAL}} inside of html documents locatede inside views HBS files.

// Setup handlebars engine and views location
app.set('view engine', 'hbs'); // Here you set what will be the engine that express will use, in this case will be hbs.
app.set('views', viewsPath); // Here you set where the 'views' folder is located, viewsPath is the variable where is stored the path to the 'views'folder.
hbs.registerPartials(partialsPath); // Same as above, here you set where is the 'partials' folder in order to be used.

// Setup static directory to serve
app.use(express.static(publicDirectoryPath)); // Here you set where will be the static root folder of the server


// Index page
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Roberto Camargo'
    });
});

// About page
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Roberto Camargo'
    });
});

// Help page
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Roberto Camargo',
        message: 'This is the Help page.'
    });
});

// Weather page
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide and address'
        });
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {

        if (error) {
            return res.send({error});
        }

        forecast(latitude, longitude, (error, forecastData) => {

            if (error) {
                return res.send({error});
            }

            res.send({
                forecast: forecastData.message,
                location,
                address: req.query.address
            });

        });

    });
});

// Products page
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        });
    }

    res.send({
        search: res.query.search,
        products: []
    });

});

// Help 404 article page
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Roberto Camargo',
        message: 'Help article not found.'
    });
});

// 404 general page
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Roberto Camargo',
        message: 'Page not found.'
    });
});


app.listen(3000, () => {
    console.log('Server is up and ruinning on port 3000.');
});