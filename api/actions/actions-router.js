// Write your "actions" router here!
const express = require("express");
const actions = require("./actions-model");

const router = express.Router();


router.use(express.json())

module.exports = router


