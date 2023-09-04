const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const baseUrl = 'https://blackjack.fuzz.me.uk';
const endpointSit = 'sit';
const endpointDeal = 'deal';
const endpointTurn = 'turn';
const endpointStand = 'stand';
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

app.use(cors())


app.use(bodyParser.json())


app.post("/api/sit", cors(corsOptions), (request, response) => {    
    let innerRequest = fetch(`${baseUrl}/${endpointSit}`, {
        method: "post",
        body: JSON.stringify(request.body),
        headers: { "Content-Type": "application/json" }
    })
        .then(res => res.json())        
        .catch(err => console.log(err))

    innerRequest
    .then(res => response.send(res))
    .catch(err => response.send(err))  
});

app.post("/api/deal", cors(corsOptions), (request, response) => {
    console.log(request.body)   
    let innerRequest = fetch(`${baseUrl}/${endpointSit}`, {
        method: "post",
        body: JSON.stringify(request.body),
        headers: { "Content-Type": "application/json" }
    })
        .then(res => res.json())        
        .catch(err => console.log(err))

    innerRequest
    .then(res => response.send(res))
    .catch(err => response.send(err))  
});



app.listen(3000, () => {
    console.log("Listen on the port 3000...");
});

