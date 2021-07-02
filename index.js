
const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const dbService = require('./dbService');
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.post('/insert',(request,response) => {
    const {nombre} = request.body;
    const db = dbService.getDbServiceInstance();
    const result = db.createName(nombre);
    result.then(data => response.json(data))
    .catch(err => console.log(err));
});

app.get('/getAll',(request,response) => {
    const db = dbService.getDbServiceInstance();
    const result=db.getAllData();
    result.then(data => 
        response.json(
            {
                data:data
            })).catch(err => {
                console.log(err);
            })
});

app.delete('/remove/:id',(request,response) => {
    const {id} = request.params;
    const db = dbService.getDbServiceInstance();
    const result = db.deleteRow(id);
    result.then(data => {
        response.json({success:true})
    }).catch(err => console.log(err));
});

app.put('/updateName/:id',(request,response) => {
    const {id} = request.params;
    const {nombre} = request.body;
    const db = dbService.getDbServiceInstance();
    const result = db.updateNameById(id,nombre); 
    result.then(data => 
        response.json(
            {
                data:data
            })).catch(err => {
                console.log(err);
            })
});

app.listen(process.env.PORT, () => console.log('app is running'));