const http = require('http');
var port = 8686;
var options = Object();
var url = 'http://devices.webofthings.io/pi/sensors/temperature/';

options.headers = {"Accept" : "application/json"};

http.get(url, options, (resp) => {

    let data = '';

    resp.on('data', (chunk) => {
        data += chunk;
    });

    resp.on('end', () => {

        console.log(JSON.parse(data));

        const json = JSON.parse(data);

        http.createServer(function(req, resp){
            resp.writeHeader(200, {'Content-Type': 'application/json'});
            resp.write('Temperatura: ' + json.value);
            resp.end();
        }).listen(port);

    });

}).on("error", (err) => {
    console.log("Error: " + err.message);
});
