const http = require('http');
//var port = 8686;
var options = Object();
var url = 'http://devices.webofthings.io/pi/sensors/temperature/';

options.headers = {"Accept" : "application/json"};

http.get(url, options, (resp) => {

    let data = '';

    resp.on('data', (chunk) => {
        data += chunk;
    });

    resp.on('end', () => {

        const json = JSON.parse(data);

        http.createServer(function(req,res){
    
            res.writeHeader(200, {"Content-Type":"text/event-stream"
                , "Cache-Control":"no-cache"
                , "Connection":"keep-alive"
                , "Access-Control-Allow-Origin": "*"});
        
            var interval = setInterval( function() {
                res.write("data: " + json.value + "\n\n");
            },2000);
        
        }).listen(9090);

        console.log('Server temperatura started!');

    });

}).on("error", (err) => {
    console.log("Error: " + err.message);
});