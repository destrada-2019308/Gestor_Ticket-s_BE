'use strict';

import { Router} from 'express';

import { getInventory, createInventory, updateInventory } from './inventory.controller.js';
import { validateJwt, isAdmin } from '../middlewares/validate_Jwt.js';

const api = Router()

api.get('/getInventory', [validateJwt, isAdmin], getInventory )
api.post('/createInventory', [validateJwt, isAdmin], createInventory)
api.put('/updateInventory', [validateJwt, isAdmin], updateInventory)

export default api