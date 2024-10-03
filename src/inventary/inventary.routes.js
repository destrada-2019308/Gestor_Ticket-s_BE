'use strict';

import { Router} from 'express';

import { getInventory, createInventory, updateInventory } from './inventary.controller.js';
import { validateJwt, isAdmin } from '../middlewares/validate_Jwt.js';

const api = Router()

api.get('/getInventory', [validateJwt], getInventory )
api.post('/createInventory', [validateJwt], createInventory)
api.put('/updateInventory', [validateJwt], updateInventory)

export default api