// index.js
// where your node app starts

// init project
// var express = require('express');
import express from 'express';
//var common = require('./public/common.mjs');
import {getDatePart, getTimePart} from "./public/common.mjs";

import path from 'path';
import {fileURLToPath} from "url";

var app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
import cors from 'cors';

app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:year(19[7-9][0-9]|[2-9][0-9][0-9][0-9])-?:month(0[1-9]|1[0-2])-?:day(0[1-9]|1[0-9]|2[0-9]|3[0-1])" +
    "(T:hour(0[0-9]|1[0-9]|2[0-3])\::minute(0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])\::second(0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]))?", function (req, res) {
    let milliseconds = (req.params.hour ?
        Date.UTC(req.params.year, req.params.month - 1, req.params.day, req.params.hour, req.params.minute, req.params.second) :
        Date.UTC(req.params.year, req.params.month - 1, req.params.day));

    let date = new Date(milliseconds);

    res.json({unix: date.getTime(), utc: date.toUTCString()});
});

app.get("/api/:unix(\\d{1,})", function (req, res) {
    console.log(req.params.unix);
    let date = new Date(new Number(req.params.unix));
    res.json({unix: date.getTime(), utc: date.toUTCString()});
});

app.get("/api/:year-:month-:dayT:hour::minute::second", function (req, res) {
    let d = undefined;
    let dateOk = !isNaN(req.params.year) && !isNaN(req.params.month) && !isNaN(req.params.day);
    let timeOk = !isNaN(req.params.hour) && !isNaN(req.params.minute) && !isNaN(req.params.second);
    if (dateOk && timeOk) {
        console.log("camino1");
        d = new Date(req.params.year, req.params.month, req.params.day, req.params.hour, req.params.minute, req.params.second);
    } else {
        console.log("camino2");
        d = new Date();
    }

    res.json({unix: Math.floor(d.getTime() / 1000.0), utc: getDatePart(d) + "T" + getTimePart(d)});
});


// listen for requests :)
//process.env.PORT
var listener = app.listen(3000, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});
