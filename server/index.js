const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1212",
  database: "cruddatabase",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  const sqlGet = "SELECT * FROM movie_reviews";
  db.query(sqlGet, (err, result) => {
    res.send(result);
  });
});

app.post("/api/insert", (req, res) => {
  const movieName = req.body.movieName;
  const movieReview = req.body.movieReview;
  // console.log(
  //   movieName !== '' && (movieReview === '' || movieReview !== '')
  // );

  if (movieName !== "" && (movieReview === "" || movieReview !== "")) {
    const sqlInsert =
      "INSERT INTO movie_reviews (movieName,movieReview) VALUES (?,?);";
    db.query(sqlInsert, [movieName, movieReview], (err, result) => {
      // console.log(result);
    });
  }
});

app.listen(3001, () => {
  console.log("Server started");
});
