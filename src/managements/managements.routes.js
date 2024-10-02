'use strict'

import {Router} from 'express'
import { isAdmin, validateJwt } from '../middlewares/validate_Jwt.js'
import { addManagements, getManagements, updateManagements, deleteManagements } from './managements.controller.js'

const api = Router()

api.get('/getManagements', [validateJwt],getManagements )
api.post('/addManagements', [validateJwt, isAdmin], addManagements)
api.put('/updateManagements/:id', [validateJwt, isAdmin], updateManagements)
api.delete('/deleteManagements/:id', [validateJwt, isAdmin], deleteManagements)

export default api