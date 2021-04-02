'use strict';

const express = require('express');
//add require cors
const cors = require('cors');
const app = express();

//make cors and express talk to each other
app.use(cors());

const Data = require('./data.js');

//add express use json
app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.get('/items', Data.getAllItems);
app.get('/items/:id', getOneItem);
app.delete('/items/:id', Data.deleteOneItem);
app.post('/items', Data.addAnItem);
//need a put
app.put('/items/:id', Data.updateOneItem);

app.use('*', (req,res) => {
  res.status(404).send('These are not the droids you are looking for.');
});

app.use( (error,req,res,next) => {
  res.status(500).send(`My Bad ... ${error.message}`);
});

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, console.log(`Server is up and running on port: ${port}`));
  },
};
