// Write your "actions" router here!
const express = require("express");
const action = require("./actions-model");
const { validateActionId, validateActionPost } = require("./actions-middlware")

const router = express.Router();

router.use(express.json());



router.get("/", (req, res,next) => {
    action.get()
    .then(data => res.status(200).json(data))
    .catch(next)
})

router.get("/:id", validateActionId, (req, res, next) => {
    res.json(req.action)
})

router.post("/", validateActionPost, (req, res, next) => {
    action.insert(req.body)
    .then(action => res.status(200).json(action))
    .catch(next)
})

router.put("/:id", validateActionId, validateActionPost, (req, res, next) => {
     action.update(req.params.id, req.body)
     .then(action => {
         res.status(200).json(action)
     })
     .catch(next)
})

router.delete("/:id", validateActionId, (req, res, next) => { 
    action.remove(req.params.id)
    .then(res.status(204).end())
    .catch(next)
})


module.exports = router


