const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const parser = require("body-parser");
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db",
  port: 3306,
});
connection.connect();
app.listen(port, () => console.log(`Listening on port ${port}`));

app.get("/getUsers", (req, res) => {
  connection.query(`SELECT * FROM user`, (err, rows) => {
    if (err) throw err;
    res.send({ result: rows });
  });
});

app.delete("/deleteUser/:id", (req, res) => {
  let id = req.params.id.split("=")[1];
  connection.query(`DELETE FROM user WHERE id=${id}`, (err, rows) => {
    if (err) throw err;
    res.send({ result: "Successfully Deleted" });
  });
});

app.post("/addUser", (req, res) => {
  let name = req.body.name;
  let phone = req.body.phone;
  console.log(name, phone);
  connection.query(
    `INSERT INTO user(name,phone)VALUE ('${name}','${phone}')`,
    (err, rows) => {
      if (err) {
        throw err;
      } else {
        connection.query(`SELECT * FROM user`, (err, rows) => {
          if (err) throw err;
          res.send({ result: rows });
        });
      }
    }
  );
});

app.put("/updateUser", (req, res) => {
  let name = req.body.name;
  let phone = req.body.phone;
  console.log(name,phone)
  let id = req.body.id;
  connection.query(
    ` UPDATE user SET name='${name}' , phone='${phone}' WHERE id='${id}'`,
    (err, rows) => {
      if (err) {
        throw err;
      } else {
        connection.query(`SELECT * FROM user`, (err, rows) => {
          if (err) throw err;
          res.send({ result: rows });
        });
      }
    }
  );
});
