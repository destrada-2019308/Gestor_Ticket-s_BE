import { Router } from "express";
import { getUsers } from "./user.controller.js";

const api = Router()

api.get('/getUsers', getUsers)

export default api