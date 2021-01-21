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

const routes = Router()

// Rotas de autentição
routes
  .post('/v2/auth', authController.login)
  .post('/v2/auth/admin', authController.loginAdmin)
  .post('/v2/auth/drive', authController.loginDrive)
  .post('/v2/forgetPassword', authController.forgotPassword)
  .post('/v2/resetPassword', authController.resetPassword)
  .post('/v2/ativeAccount', authController.ativeAccount)
  .get('/v2/ativeAccount/:id([0-9]+)/:code', authController.ativeAccount)

// Rotas para operações do user
routes
  .post('/v2/user', userController.create)
  .delete('/v2/user/:id([0-9]+)', userController.delete)
  .get('/v2/user/:id([0-9]+)', userController.getByIDorToken)

// JWT
routes.use(checkJwt)
routes
  .get('/v2/users', checkRole(1), userController.index)
  .get('/v2/user', userController.getByIDorToken)
  .put('/v2/user', userController.update)
  .put('/v2/user/:id([0-9]+)', userController.update)
  .delete('/v2/user', userController.delete)
  .delete('/v2/user/:id([0-9]+)', userController.delete)

// Rotas das operações do Tipo de Usuário
routes
  .get('/v2/typeUser', checkRole(1), typeUserController.index)
  .post('/v2/typeUser', checkRole(1), typeUserController.create)
  .put('/v2/typeuser/:id([0-9]+)', checkRole(1), typeUserController.update)
  .delete('/v2/typeuser/:id([0-9]+)', checkRole(1), typeUserController.delete)

// Rotas das operações da marca
routes
  .post('/v2/marca', checkRole(1), marcaController.create)
  .put('/v2/marca/:id([0-9]+)', checkRole(1), marcaController.update)
  .get('/v2/marca', checkRole(1), marcaController.index)
  .delete('/v2/marca/:id([0-9]+)', checkRole(1), marcaController.delete)

// Rotas para operações do Modelo
routes
  .get('/v2/modelo', checkRole(1), modeloController.index)
  .post('/v2/modelo', checkRole(1), modeloController.create)
  .put('/v2/modelo/:id([0-9]+)', checkRole(1), modeloController.update)
  .delete('/v2/modelo/:id([0-9]+)', checkRole(1), modeloController.delete)

// Rotas para operações do veiculos
routes
  .get('/v2/veiculo', checkRole(1), veiculoController.index)
  .post('/v2/veiculo', checkRole(1), veiculoController.create)
  .put('/v2/veiculo/:id([0-9]+)', checkRole(1), veiculoController.update)
  .delete('/v2/veiculo/:id([0-9]+)', checkRole(1), veiculoController.delete)
  .get('/v2/veiculo/:matricula', checkRole(1), veiculoController.getByMatricula)

routes
  .get('/v2/pedido', pedidoController.index)
  .get('/v2/pedido/:id([0-9]+)', pedidoController.getByID)
  .get('/v2/pedido/cancel/:id([0-9]+)', pedidoController.cancel)
  .get('/v2/pedido/countFinished', pedidoController.countFinished)
  .get('/v2/pedido/countCancel', pedidoController.countCancel)
  .post('/v2/pedido', pedidoController.store)
  .put('/v2/pedido/:id([0-9]+)', pedidoController.update)
  .put('/v2/pedido/estado/:id([0-9]+)', pedidoController.updateEstado)
  .delete('/v2/pedido/:id([0-9]+)', pedidoController.delete)

// Rota para fazer o uload dos ficheiros (imgs, pdf, video....)
routes.post('/v2/uploadFile', multerConfig.single('file'), async (req, res) => {
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
