const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contatoController = require('./src/controllers/contatoController');
const { loginRequerd } = require('./src/middlewares/middleware');

// Rotas da home
route.get('/', homeController.index);

//Rotas de login
route.get('/login/index', loginController.index)
route.post('/login/register', loginController.register)
route.post('/login/login', loginController.login)
route.get('/login/logout', loginController.logout)

//Rota de contato
route.get('/contato/index', loginRequerd, contatoController.index)
route.post('/contato/register', loginRequerd, contatoController.register)
route.get('/contato/index/:id', loginRequerd, contatoController.editIndex)
route.post('/contato/edit/:id', loginRequerd, contatoController.edit)
route.get('/contato/delete/:id', loginRequerd, contatoController.delete)

module.exports = route;
