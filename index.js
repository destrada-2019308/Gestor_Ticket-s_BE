import { initServer } from "./configs/app.js";
import { addAdminDefault } from "./src/user/user.controller.js";

initServer()
addAdminDefault()