var http = require("http");
var port = 8686;

function randomInt (low, high) {
  return Math.floor(Math.random() * (high - low) + low);
}
http.createServer(function(req,res){
  console.log('New incoming client request for ' + req.url);
  res.writeHeader(200, {'Content-Type': 'application/json'}); //#A
  if(req.url.includes('json')){
    switch(req.url) { //#B
      case '/json/temperature':
        res.write('{"temperature" :' + randomInt(1, 40) + ', unit:"C"}'); //#C
        break;
      case '/json/temperature?unidade=f':
        res.write('{"temperature" :' + randomInt(1, 40) + ', unit:"F"}'); //#F
        break;
      case '/json/temperature?unidade=c':
        res.write('{"temperature" :' + randomInt(1, 40) + ', unit:"C"}'); //#C
        break;
      case '/json/light':
        res.write('{"light" :' + randomInt(1, 100) + '}');
        break;
      default:
        res.write('{"hello" : "world"}');
    }
  }else if(req.url.includes('xml')){
    switch(req.url) { //#B
      case '/xml/temperature':
        res.write('<temperature>\r\n<unit_C>' + randomInt(1, 40) + '<unit_C>\r\n<temperature>'); //#C
        break;
      case '/xml/temperature?unidade=f':
        res.write('<temperature>\r\n<unit_F>' + randomInt(1, 40) + '<unit_F>\r\n<temperature>'); //#F
        break;
      case '/xml/temperature?unidade=c':
        res.write('<temperature>\r\n<unit_C>' + randomInt(1, 40) + '<unit_C>\r\n<temperature>'); //#C
        break;
      case '/xml/light':
        res.write('<light>' + randomInt(1, 100) + '<light>');
        break;
      default:
        res.write('<default>hello world<default>');
    }
  }
  res.end();  //#D
}).listen(port);
console.log('Server listening on http://localhost:' + port);
