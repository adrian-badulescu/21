const express = require("express");
const request = require('request');
const { createProxyMiddleware, responseInterceptor, fixRequestBody } = require('http-proxy-middleware');
// var request = require('request');
var bodyParser = require('body-parser')
var cors = require('cors')
const app = express();

app.use(cors())

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}


app.use(bodyParser.json())



app.post("/api/sit", cors(corsOptions), (request, response) => {
    // console.log('req.body ' + req.body);
    // fetch("https://blackjack.fuzz.me.uk/sit", {
    //     method: "post",
    //     body: JSON.stringify(request.body),
    //     headers: { "Content-Type": "application/json" }
    // })
    //     .then(res => response= res.json())
    //     .then(json => console.log(json))
    //     .catch(err => console.log(err))
    request.post({uri: 'https://blackjack.fuzz.me.uk/sit', json: req.body}, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(response.body);
            res.send(body);
        }
    });
   
    
});



app.listen(3000, () => {
    console.log("Listen on the port 3000...");
});

