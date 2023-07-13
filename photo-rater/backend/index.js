const express = require('express');
const mysql = require('mysql2');
const cors = require('cors')

const app = express();
app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Nzu_sQl__01!",
    database: "photoraterdb",
});


// Creating an account +++++++++++++++++++++++++++++++++++++++++++++
app.post("/create-user", (req, res) => {
    const email = req.body.email
    const password = req.body.password
    const username = req.body.username
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const bio = req.body.bio
    const website = req.body.website
    const sm1 = req.body.sm1
    const sm2 = req.body.sm2
    const sm3 = req.body.sm3
    const photo = null
    const theme = "light"
    const accent = "black"
    const LI = "1"

    db.query(
        "INSERT INTO user_table (email, password, username, first_name, last_name, bio, website, social1, social2, social3, photo, theme, accent, logged_in) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [email, password, username, firstname, lastname, bio, website, sm1, sm2, sm3, photo, theme, accent, LI],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("hello Kamsi");
            }
        }
    )
});


// // editing an account +++++++++++++++++++++++++++++++++++++++++++++
// app.put("/edit-user", (req, res) => {
//     const email = req.body.email
//     const password = req.body.password
//     const username = req.body.username
//     const firstname = req.body.firstname
//     const lastname = req.body.lastname
//     const bio = req.body.bio
//     const website = req.body.website
//     const sm1 = req.body.sm1
//     const sm2 = req.body.sm2
//     const sm3 = req.body.sm3
//     const photo = null
//     const theme = "light"
//     const accent = "black"
//     const LI = "1"

//     db.query(
//         "INSERT INTO user_table (email, password, username, first_name, last_name, bio, website, social1, social2, social3, photo, theme, accent, logged_in) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
//         [email, password, username, firstname, lastname, bio, website, sm1, sm2, sm3, photo, theme, accent, LI],
//         (err, result) => {
//             if (err) {
//                 console.log(err);
//             } else {
//                 res.send("hello Kamsi");
//             }
//         }
//     )
// });

app.listen(3001, () => {
    console.log("running on port 3001");
});
