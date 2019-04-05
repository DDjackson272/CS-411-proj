var NodeGeocoder = require('node-geocoder');

var options = {
    provider: 'google',

    // Optional depending on the providers
    httpAdapter: 'https', // Default
    apiKey: 'AIzaSyA0kklLIkCV5PYhDPAw8kTNb1K2iPkCm_8', // for Mapquest, OpenCage, Google Premier
    formatter: null         // 'gpx', 'string', ...
};

var geocoder = NodeGeocoder(options);

// Using callback
geocoder.geocode('508 E University Ave, Illinois', function(err, res) {
    console.log(res[0].latitude, res[0].longitude);
});