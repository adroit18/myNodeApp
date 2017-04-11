var http = require('http');
var fs = require('fs');
var mysql = require('mysql');
var path = require('path');
var express = require('express');
var mysql = require('mysql');
var bodyParser = require("body-parser");

var mailerDaemon = require("./mailer.js");


var app = express();
var portNum = 201;

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.listen(portNum, function () {
    console.log('Example app listening on port ' + portNum + '!');
})
app.use(express.static('angular'));

app.get('/angular', function (req, res) {
    res.sendFile(path.join(__dirname, '/', 'angular', 'index.html'));
});

app.post('/sendMail', function (req, res) {
    var emailId = req.body.emailId
    //    mailerDaemon(emailId);
    res.end();
})

app.post('/database', function (req, res, next) {
    var dbFunction = req.body.dbFunction;
    var data;

    if (dbFunction == 'create') {
        data = req.body.data;
    } else if (dbFunction == 'read') {
        data = '';
    } else if (dbFunction == 'update') {
        data = req.body.data;
    } else if (dbFunction == 'delete') {
        data = '';
    }

    handle_database(data, dbFunction, res, req);

});

function handle_database(data, dbFunction, res, req) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'nodedb',
        port: '3306'
    });

    connection.connect(function (err) {
        if (!err) {
            console.log("Database is connected ... nn");
        } else {
            throw err;
            console.log("Error connecting database ... nn");
        }
    })

    if (dbFunction == 'create') {
        mysqlCreate();
    } else if (dbFunction == 'read') {
        mysqlRead();
    } else if (dbFunction == 'update') {
        mysqlUpdate();
    } else if (dbFunction == 'delete') {
        mysqlDeletedata();
    }

    function mysqlCreate() {
        connection.query('INSERT INTO mainlearner SET ?', data, function (err, res) {
            if (err) throw err;
            console.log('Last insert ID:', res.insertId);
        });
        res.send(' ');

    };

    function mysqlRead() {
        var sorter = 'rating';
        connection.query("SELECT * FROM mainlearner ORDER BY " + connection.escapeId(sorter) + " DESC", function (err, rows) {
            if (err) throw err;
            console.log('Data received from Db:\n');
            res.json(rows);

        });
    };

    function mysqlUpdate() {
        connection.query("select * from mainlearner", function (err, rows) {
            connection.release();
            if (!err) {
                res.json(rows);
            }
        });
    };

    function mysqlDelete() {
        connection.query("select * from mainlearner", function (err, rows) {
            connection.release();
            if (!err) {
                res.json(rows);
            }
        });
    };
}
