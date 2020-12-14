const http = require('http');
var options = Object();
var url = 'http://localhost:8686/temperature';

options.headers = {"Accept" : "application/json"};

http.get(url, options, (resp) => {

    let data = '';

    resp.on('data', (chunk) => {
        data += chunk;
    });

    resp.on('end', () => {
        console.log(JSON.parse(data));
    });

    }).on("error", (err) => {

    console.log("Error: " + err.message);
});
