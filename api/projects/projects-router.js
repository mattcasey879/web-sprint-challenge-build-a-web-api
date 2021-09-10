// Write your "projects" router here!
const express = require("express");
const project = require("./projects-model");
const { logger , validateProjectId , validateProjectPost } = require("./projects-middleware");

const router = express.Router();

router.use(express.json());

router.get("/", (req, res) => {
  project.get()
  .then(data => res.status(200).json(data))
  .catch(error => res.status(500).json({ message: error.message }))
});

router.get("/:id", validateProjectId, (req, res) => {
 res.json(req.project)
})

router.get("/:id/actions", validateProjectId, (req, res, next) => {
    project.getProjectActions(req.params.id)
    .then(actions => res.status(200).json(actions))
    .catch(next)
})

router.post("/", validateProjectPost, (req, res, next) => {
    project.insert(req.body)
    .then(project => res.status(201).json(req.body))
    .catch(next)
})

router.put("/:id", validateProjectPost, validateProjectPost, (req, res, next) => {
    project.update(req.body)
    .then(project => res.status(200))
    .catch(next)
})

router.delete("/:id", validateProjectId, (req, res, next) => {
    project.remove(req.params.id)
    .then(res.status(204).end())
    .catch(next)
})


router.use((err, req, res, next) => {
    console.log(err.message);
    res.status(err.status || 500).json({ message: err.message})
})
module.exports = router;
