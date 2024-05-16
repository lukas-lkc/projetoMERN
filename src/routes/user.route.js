const route = require("express").Router();
const userController = require('../controllers/user.controller')

route.post("/", userController.create)

module.exports = route; //como só tem uma rota, todas que iniciam com route serão exportadas