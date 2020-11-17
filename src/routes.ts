/*
 * Name: Dorivaldo Vicente dos Santos
 * E-mail: dorivaldodossantos2000@gmail.com
 * Phone: 944557610 / 992228230(WhatsApp)
 * Github: https://github.com/DVS2000
 * Site: https://dorivaldodossantos.herokuapp.com
 */

import { Router } from 'express'
import marcaController from './controllers/marcaController'
import modeloController from './controllers/modeloController'
import typeUserController from './controllers/typeUserController'
import veiculoController from './controllers/veiculoController'
import { checkJwt } from './middlewares/checkJWT'

const routes = Router()

// JWT
routes.use(checkJwt)

// Routas das operações do Tipo de Usuário
routes
  .get('/typeUser', typeUserController.index)
  .post('/typeUser', typeUserController.create)
  .put('/typeuser/:id', typeUserController.update)
  .delete('/typeuser/:id', typeUserController.delete)

// Routas das operações da marca
routes
  .post('/marca', marcaController.create)
  .put('/marca/:id', marcaController.update)
  .get('/marca', marcaController.index)
  .delete('/marca/:id', marcaController.delete)

// Routas para operações do Modelo
routes
  .get('/modelo', modeloController.index)
  .post('/modelo', modeloController.create)
  .put('/modelo/:id', modeloController.update)
  .delete('/modelo/:id', modeloController.delete)

// Routas para operações do veiculos
routes
  .get('/veiculo', veiculoController.index)
  .post('/veiculo', veiculoController.create)
  .put('/veiculo/:id', veiculoController.update)
  .delete('/veiculo/:id', veiculoController.delete)
  .get('/veiculo/:matricula', veiculoController.getByMatricula)

export default routes
