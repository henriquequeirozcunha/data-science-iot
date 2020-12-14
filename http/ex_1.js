var http = require("http");
var port = 8686;
var xml2js = require('xml2js');

function randomInt (low, high) {
  return Math.floor(Math.random() * (high - low) + low);
}

http.createServer(function(req,res){
  console.log('New incoming client request for ' + req.url);
  res.writeHeader(200, {'Content-Type': 'application/json'}); //#A
  var json = true
  if(req.headers['accept'] && req.headers['accept'].includes("xml")){
    json = false;
    res.writeHeader(200, {'Content-Type': 'text/xml'}); //#A
  }
  var urlSwitch = req.url.includes('?') ? req.url.split('?')[0] : req.url

  switch(urlSwitch) { //#B
    case '/temperature':
      var unitCelsius = true;
      if((req.url.split('?')[1] && req.url.split('?')[1].includes('unit=f'))){
        unitCelsius = false;
      }
      var descUnit = unitCelsius ? 'Celsius' : 'Fahrenheit'
      var data = {
        temperature: randomInt(1, 40),
        unit: descUnit
      }
      if(json){
        res.write(JSON.stringify(data)); //#C
      }
      else{
        var builder = new xml2js.Builder();
        var xml = builder.buildObject(data);
        res.write(xml); //#C
      }
      break;
    case '/light':
      var data = {
        light: randomInt(1, 100)
      }
      if(json){
        res.write(JSON.stringify(data)); //#C
      }
      else{
        var builder = new xml2js.Builder();
        var xml = builder.buildObject(data);
        res.write(xml); //#C
      }
      break;
    default:
      var data = {
        hello: 'world'
      }
      if(json){
        res.write(JSON.stringify(data)); //#C
      }
      else{
        var builder = new xml2js.Builder();
        var xml = builder.buildObject(data);
        res.write(xml); //#C
      }
  }
  res.end();  //#D
}).listen(port);
console.log('Server listening on http://localhost:' + port);

//#A Setting the header to announce we return JSON representations
//#B Read the request URL and provide responses accordingly
//#C Write the temperature result as JSON
//#D Causes to return the results to the client

