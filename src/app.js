const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (req, res) => {
  const {title} = req.query;
  const results = title
    ? repositories.filter(project => project.title.includes(title))
    : repositories;

  return res.json(results);
});

app.post("/repositories", (req, res) => {

  const {title, url, techs} = req.body;
  
  const project = {id: uuid(), title, url, techs, likes: 0};

  repositories.push(project)

  return res.json(project);
});

app.put("/repositories/:id", (req, res) => {
  const {id} = req.params;
  const {title, url, techs} = req.body;
  
  const projectIndex = repositories.findIndex(project => project.id === id);

  if(projectIndex < 0){
    return res.status(400).json({ error: 'Project not found.'});
  }
  likes = repositories[projectIndex].likes;
  
  const project = {
    id,
    title,
    url,
    techs,
    likes,
  };

  repositories[projectIndex] = project;

  return res.json(project);
});

app.delete("/repositories/:id", (req, res) => {
  const {id} = req.params;
  const projectIndex = repositories.findIndex(project => project.id === id);

  if(projectIndex < 0){
    return res.status(400).json({ error: 'Project not found.'});
  }

  repositories.splice(projectIndex, 1);

  return res.status(204).send();
});

app.post("/repositories/:id/like", (req, res) => {
  const {id} = req.params;
  
  const projectIndex = repositories.findIndex(project => project.id === id);

  if(projectIndex < 0 ){
    return res.status(400).json({ error: 'Project not found.'});
  } 

  const project = repositories[projectIndex];

  const {techs, url, title, likes} = project;

  repositories[projectIndex] = {id, url, title, techs, likes: likes +1};

  return res.json(repositories[projectIndex]);
});

module.exports = app;
