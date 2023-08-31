const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const PORT = 4005;

app.post('/events', (req, res) => {

    const event = req.body;

    axios.post('http://localhost:4000/events',event).then(()=>{
        console.log('Broadcasted the new event to post service');
    }).catch((error)=>{
        console.log(error);
    })

    axios.post('http://localhost:4001/events',event).then(()=>{
        console.log('Broadcated the new event to comment service');
    }).catch((error)=>{
        console.log(error);
    })

    axios.post('http://localhost:4003/events',event).then(()=>{
        console.log('Broadcated the new event to query service');
    }).catch((error)=>{
        console.log(error);
    })

    res.send({}).status(200);

});

app.listen(PORT, () => {
  console.log(`Event Bus live on port: ${PORT}`);
});
