const http = require('http');

//api examples
//http://dataservice.accuweather.com/forecasts/v1/daily/1day/{locationKey}
//http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/{locationKey}
//http://dataservice.accuweather.com/locations/v1/cities/{countryCode}/search
///currentconditions/v1/{locationKey}

//3keys for accuweather
//qhNDktvakmRtedve38QVdR1SfqFGiPFM
//CumCeUR4ydWUQpvyz5yAMmZkki9bhp77
//axjdEE6DbaoSFjMOR9lIHk0k4CKIhGmA

//Server which proxies all requests for weather API data, because we
//should not exposed the Accuweather APIKey (anyone could take it and use it).
//Exposing the Google Firebase API Key is also not good but it's not as bad because it
//has domain whitelisting and it's not a security risk.

http.createServer(function (client_req, client_res) {
  
  if(client_req.url.match(/^\/api\//)){

    if(client_req.url === "/api/locations/v1/cities/autocomplete"){
      client_res.statusCode = 204;
      client_res.setHeader("access-control-allow-origin","*");
      client_res.end("[]");
      return;
    }

    var newurl = client_req.url.substring(4);
    newurl+= (newurl.includes("?") ? "&" : "?") + "apikey=axjdEE6DbaoSFjMOR9lIHk0k4CKIhGmA";

    var options = {
      hostname: 'dataservice.accuweather.com',
      port: 80,
      path: newurl,
      method: client_req.method,
      headers: {
          'user-agent': client_req.headers['user-agent'],
          'accept' : 'application/json, text/*',
          'accept-encoding': 'gzip, deflate',
          'accept-language': 'en-US,en;q=0.9'
      }
    };
  
    var proxy = http.request(options, function (res) {
      console.log("Got response", res.statusCode, res.url); 
  
      res.headers["access-control-allow-origin"] = "*";
      client_res.writeHead(res.statusCode, res.headers);
  
      res.pipe(client_res, {
        end: true
      });
  
    });
    proxy.on('error', (e) => {
      console.error(`problem with request: ${e.message}`);
    });
  
    client_req.pipe(proxy, {
      end: true
    });
  }else{
    client_res.statusCode = 404;
    client_res.setHeader("access-control-allow-origin","*");
    client_res.setHeader("access-control-allow-methods","GET OPTIONS HEAD");
    client_res.end();
  }
}).listen(8082);



