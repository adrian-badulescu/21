const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const baseUrl = 'https://blackjack.fuzz.me.uk';
const endpointSit = 'sit';
const endpointDeal = 'deal';
const endpointTurn = 'turn';
const endpointStand = 'stand';


app.use(bodyParser.json())


app.post("/api/sit", (request, response) => {    
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

