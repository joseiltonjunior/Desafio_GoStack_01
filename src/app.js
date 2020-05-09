const express = require("express");
const cors = require("cors");

// const { uuid } = require("uuidv4");

const app = express();


app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (req, res) => {
  const {title, owner} = req.query;

  console.log(title);
  console.log(owner);

  return res.json([
    'Sucess',
  ]);
});

app.post("/repositories", (req, res) => {
  const {title, owner, url} = req.body;

  console.log(title);

  return res.json([
    'Sucess',
  ]);
});

app.put("/repositories/:id", (req, res) => {
  const id = req.params;

  console.log(id);

  return res.json([
    'Sucess',
  ]);
});

app.delete("/repositories/:id", (req, res) => {
  const params = req.params;

  console.log(params);

  return res.json([
    'Sucess',
  ]);
});

app.post("/repositories/:id/like", (req, res) => {
  // TODO
});

module.exports = app;
