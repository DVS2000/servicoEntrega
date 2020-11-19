/*
 * Name: Dorivaldo Vicente dos Santos
 * E-mail: dorivaldodossantos2000@gmail.com
 * Phone: 944557610 / 992228230(WhatsApp)
 * Github: https://github.com/DVS2000
 * Site: https://dorivaldodossantos.herokuapp.com
 */

import { Router } from 'express'
import authController from './controllers/authController'
import marcaController from './controllers/marcaController'
import modeloController from './controllers/modeloController'
import typeUserController from './controllers/typeUserController'
import userController from './controllers/userController'
import veiculoController from './controllers/veiculoController'
import { checkJwt } from './middlewares/checkJWT'

const routes = Router()

// Rotas de autentição
routes
  .post('/auth', authController.login)
  .post('/forgetPassword', authController.forgotPassword)
  .post('/resetPassword', authController.resetPassword)
  .post('/ativeAccount', authController.ativeAccount)
  .get('/ativeAccount/:id/:code', authController.ativeAccount)

// Rotas para operções do user
routes
  .post('/user', userController.create)
  .put('/user/:id', userController.update)
  .delete('/user/:id', userController.delete)
  .get('/user/:id', userController.getByIDorToken)

// JWT
routes.use(checkJwt)
routes
  .get('/user', userController.index)
  .get('/user', userController.getByIDorToken)
  .put('/user', userController.update)
  .delete('/user', userController.delete)

// Rotas das operações do Tipo de Usuário
routes
  .get('/typeUser', typeUserController.index)
  .post('/typeUser', typeUserController.create)
  .put('/typeuser/:id', typeUserController.update)
  .delete('/typeuser/:id', typeUserController.delete)

// Rotas das operações da marca
routes
  .post('/marca', marcaController.create)
  .put('/marca/:id', marcaController.update)
  .get('/marca', marcaController.index)
  .delete('/marca/:id', marcaController.delete)

// Rotas para operações do Modelo
routes
  .get('/modelo', modeloController.index)
  .post('/modelo', modeloController.create)
  .put('/modelo/:id', modeloController.update)
  .delete('/modelo/:id', modeloController.delete)

// Rotas para operações do veiculos
routes
  .get('/veiculo', veiculoController.index)
  .post('/veiculo', veiculoController.create)
  .put('/veiculo/:id', veiculoController.update)
  .delete('/veiculo/:id', veiculoController.delete)
  .get('/veiculo/:matricula', veiculoController.getByMatricula)

export default routes
