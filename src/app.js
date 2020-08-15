const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (req, res) => {
  return res.json(repositories);
});

app.post("/repositories", (req, res) => {
  const { title, url, techs } = req.body;
  let id = uuid();
  const repository = { id, title, url, techs, likes: 0 };

  repositories.push(repository);
  return res.json(repository);
});

app.put("/repositories/:id", (req, res) => {
  const { id } = req.params;
  const { title, url, techs } = req.body;

  const findRepository = repositories.findIndex(
    repository => repository.id === id
  );

  if (findRepository < 0) {
    return res.status(400).json({
      error: 'Sorry, repository not found.'
    });
  }

  const repository = {
    id,
    title,
    url,
    techs,
    likes: repositories[findRepository].likes,
  }

  repositories[findRepository] = repository;
  return res.json(repository);
});

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params;

  const findRepository = repositories.findIndex(
    repository => repository.id === id
  );

  if (findRepository < 0) {
    return res.status(400).json({
      error: 'Sorry, repository not found.'
    });
  }

  repositories.splice(findRepository, 1);
  return res.status(204).send();
});

app.post("/repositories/:id/like", (req, res) => {
  const { id } = req.params;

  const findRepository = repositories.findIndex(
    repository => repository.id === id
  );

  if (findRepository < 0) {
    return res.status(400).json({
      error: 'Sorry, repository not found.'
    });
  }

  let like = repositories[findRepository].likes;
  repositories[findRepository].likes = like + 1;
  return res.json({
    likes: repositories[findRepository].likes
  });
});


module.exports = app;
