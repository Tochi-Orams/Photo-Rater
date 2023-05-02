const express = require('express');
const mysql = require('mysql');

const app = express()

const db = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "Nzu_sQl__01!",
    database: "PhotoRaterDB"
});

app.get("/", (req, res) => {

    const sqlInsert = "INSERT INTO users (UserName) VALUES ('Test_user');"
    db.query(sqlInsert, (err, result) => {
        res.send("hello worlds")
    })
});

app.listen(3001, () => {
    console.log("running on port 3001")
});
