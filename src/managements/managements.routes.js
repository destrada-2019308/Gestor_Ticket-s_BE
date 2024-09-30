'use strict'

import {Router} from 'express'
import { isAdmin, validateJwt } from '../middlewares/validate_Jwt.js'
import { addManagements, getManagements, updateManagements } from './managements.controller'

const api = Router()

api.get('/getManagements', [validateJwt],getManagements )
api.post('/addManagements', [validateJwt, isAdmin], addManagements)
api.put('/updateManagements', [validateJwt, isAdmin], updateManagements)

export default api