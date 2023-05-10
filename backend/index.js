const express = require('express');
const mysql = require('mysql2');

const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Nzu_sQl__01!",
    database: "photoraterdb",
});

app.get("/", (req, res) => {

    db.query("INSERT INTO users_table (UserName) VALUES (?)", ['Test_user'], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send("hello Kamsi");
        }
    })
});

app.listen(3001, () => {
    console.log("running on port 3001");
});
