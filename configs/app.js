import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import { config } from 'dotenv';

// Importar rutas
import userRoutes from '../src/user/user.routes.js';
import managementsRoutes from '../src/managements/managements.routes.js';
import inventaryRoutes  from '../src/inventary/inventary.routes.js';
import controlRoutes from '../src/control/control.routes.js';
import historialInventarioRoutes from '../src/historialInventario/historialInventario.routes.js'

const app = express();
config()
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan('dev'));
app.use(cors());
app.use(helmet());

//Rutas para las routes
app.use('/user', userRoutes);
app.use('/managements', managementsRoutes);
app.use('/inventary', inventaryRoutes);
app.use('/control', controlRoutes);
app.use('/historialInventario', historialInventarioRoutes);

export const initServer = () => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    })
}