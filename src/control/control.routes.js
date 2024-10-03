'use strict'

import Router from 'express'
import { getControl, addControl, calcularControl} from './control.controller.js'

const api = Router()

api.get('/getControl', getControl)
api.post('/addControl', addControl)
api.post('/calcularControl', calcularControl)

export default api
