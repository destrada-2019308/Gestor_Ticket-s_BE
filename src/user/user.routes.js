import { Router } from "express";
import { getUsers, addUser, sendEmailForValidate, login, updateUser } from "./user.controller.js";
import { validateJwt, isAdmin } from "../middlewares/validate_Jwt.js";

const api = Router()

//RUTAS PUBLICAS 
api.post('/login', login)

//RUTAS PRIVADAS
api.get('/getUsers', [validateJwt] ,getUsers)
api.post('/addUser', [validateJwt, isAdmin],addUser)
api.post('/sendEmailForValidate', sendEmailForValidate)
api.put('/updateUser/:id', [validateJwt, isAdmin], updateUser)

export default api