// add middlewares here related to projects
const express = require("express");

const projects = require("./projects-model");

const logger = (req, res, next) => {
    console.log(
        `[${new Date().toString()}] ${req.method} to ${req.url} from ${req.get("host")}`
    )
    next()
}

const validateProjectId = (req, res, next) => {
    console.log("Checking ID")
    const { id } = req.params;
    projects.get(id)
    .then(project => {
        if (project) {
            req.project = project
            next()
        } else {
            next({ status: 404, message: "No project with that ID"})
        }
    })
    .catch(next)
}

const validateProjectPost = (req, res, next) => {
    console.log("validating Post")
    const { name, description } = req.body
    if(!name || !description) {
        next({ status: 400, message: "Please fill out all required fields"})
    } else {
        next()
    }
}

module.exports = { logger, validateProjectId, validateProjectPost }
