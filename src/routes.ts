/*
 * Name: Dorivaldo Vicente dos Santos
 * E-mail: dorivaldodossantos2000@gmail.com
 * Phone: 944557610 / 992228230(WhatsApp)
 * Github: https://github.com/DVS2000
 * Site: https://dorivaldodossantos.herokuapp.com
 */

import { Router } from 'express'
import { multerConfig } from './config/multerConfig'
import authController from './controllers/authController'
import marcaController from './controllers/marcaController'
import modeloController from './controllers/modeloController'
import pedidoController from './controllers/pedidoController'
import typeUserController from './controllers/typeUserController'
import userController from './controllers/userController'
import veiculoController from './controllers/veiculoController'
import { checkJwt } from './middlewares/checkJWT'
import sharp from 'sharp'
import { checkRole } from './middlewares/checkRole'
import taxiController from './controllers/taxiController'

const routes = Router()

// Rotas de autentição
routes
  .post('/auth', authController.login)
  .post('/auth/admin', authController.loginAdmin)
  .post('/auth/drive', authController.loginDrive)
  .post('/forgetPassword', authController.forgotPassword)
  .post('/resetPassword', authController.resetPassword)
  .post('/ativeAccount', authController.ativeAccount)
  .get('/ativeAccount/:id([0-9]+)/:code', authController.ativeAccount)

// Rotas para operações do user
routes
  .post('/user', userController.create)
  .delete('/user/:id([0-9]+)', userController.delete)
  .get('/user/:id([0-9]+)', userController.getByIDorToken)

// JWT
routes.use(checkJwt)
routes
  .get('/users', checkRole(4), userController.index)
  .get('/user', userController.getByIDorToken)
  .put('/user', userController.update)
  .put('/user/:id([0-9]+)', userController.update)
  .delete('/user', userController.delete)
  .delete('/user/:id([0-9]+)', userController.delete)

// Rotas das operações do Tipo de Usuário
routes
  .get('/typeUser', checkRole(4), typeUserController.index)
  .post('/typeUser', checkRole(4), typeUserController.create)
  .put('/typeuser/:id([0-9]+)', checkRole(4), typeUserController.update)
  .delete('/typeuser/:id([0-9]+)', checkRole(4), typeUserController.delete)

// Rotas das operações da marca
routes
  .post('/marca', checkRole(4), marcaController.create)
  .put('/marca/:id([0-9]+)', checkRole(4), marcaController.update)
  .get('/marca', checkRole(4), marcaController.index)
  .delete('/marca/:id([0-9]+)', checkRole(4), marcaController.delete)

// Rotas para operações do Modelo
routes
  .get('/modelo', checkRole(4), modeloController.index)
  .post('/modelo', checkRole(4), modeloController.create)
  .put('/modelo/:id([0-9]+)', checkRole(4), modeloController.update)
  .delete('/modelo/:id([0-9]+)', checkRole(4), modeloController.delete)

// Rotas para operações do veiculos
routes
  .get('/veiculo', checkRole(4), veiculoController.index)
  .post('/veiculo', checkRole(4), veiculoController.create)
  .put('/veiculo/:id([0-9]+)', checkRole(4), veiculoController.update)
  .delete('/veiculo/:id([0-9]+)', checkRole(4), veiculoController.delete)
  .get('/veiculo/:matricula', checkRole(4), veiculoController.getByMatricula)

// Rotas para operações do pedido
routes
  .get('/pedido', pedidoController.index)
  .get('/pedido/:id([0-9]+)', pedidoController.getByID)
  .get('/pedido/cancel/:id([0-9]+)', pedidoController.cancel)
  .get('/pedido/countFinished', pedidoController.countFinished)
  .get('/pedido/countCancel', pedidoController.countCancel)
  .post('/pedido', pedidoController.store)
  .put('/pedido/:id([0-9]+)', pedidoController.update)
  .put('/pedido/estado/:id([0-9]+)', pedidoController.updateEstado)
  .delete('/pedido/:id([0-9]+)', pedidoController.delete)

// Rotas para operações do TAXI
routes
  .get('/taxi', taxiController.index)
  .get('/taxi/:id([0-9]+)', taxiController.getByID)
  .post('/taxi', taxiController.store)
  .put('/taxi/:id([0-9]+)', taxiController.update)
  .delete('/taxi/:id([0-9]+)', taxiController.delete)

// Rota para fazer o uload dos ficheiros (imgs, pdf, video....)
routes.post('/uploadFile', multerConfig.single('file'), async (req, res) => {
  const outputImage = `src/upload/${new Date().getTime().toString()}.jpg`

  sharp(req.file.path).resize({ height: 200, width: 200 }).toFile(outputImage).then(file => {
    console.log(file)
  }).catch(err => console.log(err))

  return res.json({
    data: 'http://localhost:3333/' + outputImage.replace('src/', ''),
    message: 'Upload efetuado com sucesso'
  })
})
export default routes
