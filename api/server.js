const express = require('express');
const server = express();
const projectsRtr = require("./projects/projects-router")
const actionRtr = require("./actions/actions-router")
const helment = require("helmet")
const { logger } = require("./projects/projects-middleware")
// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!
server.use(helment())

server.use("/api/projects", projectsRtr)
server.use("/api/actions", actionRtr)

server.get("/", (req, res) => {
    res.status(200).send("<h2>Welcome to the API!</h2>")
})
server.use((err, req, res, next) => {
    console.log(err.message);
    res.status(err.status || 500).json({ message: err.message})
})

module.exports = server;
