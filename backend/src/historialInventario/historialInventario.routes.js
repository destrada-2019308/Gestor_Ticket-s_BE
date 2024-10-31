'use strict'
import { Router } from "express"
import { validateJwt } from "../middlewares/validate_Jwt.js"
import { getHistorialInventario, addHistorialInventario } from "./historialInventario.controller.js"

const api = Router()

api.get('/getHistorialInventario', [validateJwt], getHistorialInventario)
api.post('/addHistorialInventario', [validateJwt], addHistorialInventario)

export default api