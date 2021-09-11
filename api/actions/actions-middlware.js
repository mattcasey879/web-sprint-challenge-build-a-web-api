// add middlewares here related to actions
const e = require("express")
const express = require("express")
const actions = require("./actions-model")



const validateActionId = (req, res, next) => {
    const { id } = req.params
    actions.get(id)
    .then(action => {
        if(action) {
            req.action = action
            next()
        } else {
            next({ status: 404, message: "no post with that ID"})
        }
    })
    .catch(next)

}

const validateActionPost = (req, res, next) => {
    const { project_id, description, notes } = req.body
    if(!project_id) {
        next({ status: 400, message: "please enter a valid project ID"})
    } else if(!description || !notes) {
        next({ status: 400, message: "please enter required fields"})
    } else {
        next()
    }

}

module.exports = { validateActionId, validateActionPost } 
