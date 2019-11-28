const mysql = require('mysql');
const express = require('express');
var app = express();
const path = require('path');
const bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
const router = express.Router();
const fs = require('fs');
const session = require('express-session');
const bcrypt = require('bcryptjs');

abcd = app.use(bodyParser.json());
//body parser
app.use(bodyParser.urlencoded({ extended: false }));

// var mysql = require("mysql");


const config = {
    host: 'localhost',
    user: 'root',
    password: 'gayatri1111',
    database: 'gayatri_db'
};



const pool = mysql.createPool(config);

//setting session
app.use(
    session({ secret: 'my secret', resave: false, saveUninitialized: false })
);

app.use((req, res, next) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {

        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><Form action="/login" method="POST"><button type="submit">login</button></Form></body>');
        res.write('<body><Form action="/signup" method="POST"><button type="submit">SignUp</button></Form></body>');
        res.write('</html>');
        console.log(req.session.isLoggedIn);
        return res.end();
    }

    if (url === '/login' && method === 'POST') {
        res.sendFile(path.join(__dirname, './', 'views', 'login.html'));

        req.session.isLoggedIn = true;

        //setting cookie
        res.setHeader('Set-Cookie', 'loogedIn=true; Max-Age=10; HttpOnly')

        // res.setHeader('Set-Cookie', req.body.email)

    }
    if (url === '/logout' && method === 'POST') {
        res.sendFile(path.join(__dirname, './', 'views', 'logout.html'));

        req.session.destroy();

    }
    if (url === '/signup' && method === 'POST') {
        res.sendFile(path.join(__dirname, './', 'views', 'signup.html'));
        var password = req.body.password;
    }

    // res.setHeader('Content-Type', 'text/html');
    // res.write('<html>');
    // res.write('<head><title>UdemyNode</title></head>');
    // res.write('<body><h1>Hi</h1></body>');
    // res.write('</html>');
    // res.end();
    let hash = bcrypt.hash(password, 10);
    console.log(hash);

});

app.listen(3000, function () {
    console.log("express server is running at 3000.");
});

