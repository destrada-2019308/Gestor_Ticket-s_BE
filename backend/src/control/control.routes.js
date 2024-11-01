'use strict'

import Router from 'express'
import { getControl, addControl, calcularControl, findByRole, getAllControl, downloadExcel, findByName} from './control.controller.js'
import { validateJwt } from '../middlewares/validate_Jwt.js'

const api = Router()

api.get('/getControl/:codeUser', [validateJwt], getControl)
api.get('/getAllControl', validateJwt, getAllControl)
api.post('/addControl', [validateJwt], addControl)
api.post('/calcularControl', [validateJwt], calcularControl)
api.get('/downloadExcel', [validateJwt], downloadExcel)

api.post('/findByRole',  [validateJwt], findByRole)

api.post('/findByName/:name', [validateJwt], findByName)

export default api
