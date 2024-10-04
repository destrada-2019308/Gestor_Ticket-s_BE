'use strict'

import pool from "../../configs/db.js"

export const getInventory = async (req, res) => {
    const conn = await pool.getConnection()
    try {
        const data = await conn.query("SELECT * FROM Inventario")
        return res.send({ data })
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: "An error occurred while retrieving data." })
    } finally {
        conn.release()
    }
}

export const createInventory = async (req, res) => {
    const conn = await pool.getConnection()
    try {
        const { stock_boleta4h, stock_boleta2h, stock_boleta1h, stock_boleta30min } = req.body
        const boleta4h = '4:00:00'
        const boleta2h = '2:00:00'
        const boleta1h = '1:00:00'
        const boleta30min = '00:30:00'
        
        const precio_boleta4h = 36.00
        const precio_boleta2h = 18.0
        const precio_boleta1h = 9.0
        const precio_boleta30min = 4.5
        
        let data = new Date()
        let fecha = data.toISOString().split('T')[0] // Fecha actual en formato YYYY-MM-DD
        
        // Obtener el inventario
        let inventario = await conn.query('SELECT * FROM Inventario')
        
        // Obtener la última fecha en la que se agregó un inventario
        let ultimoDia = inventario.length > 0 ? inventario[inventario.length - 1].date : null
        
        if (ultimoDia) {
            // Convertir última fecha del inventario a objeto Date
            let ultimaFechaInventario = new Date(ultimoDia)
            let fechaActual = new Date(fecha)
        
            // Calcular la diferencia en milisegundos entre la fecha actual y la última
            let diferenciaTiempo = fechaActual - ultimaFechaInventario
        
            // Convertir la diferencia de milisegundos a días
            let diferenciasFechas = diferenciaTiempo / (1000 * 3600 * 24)
        
            // Restringir la adición de inventario a cada 15 días
            if (diferenciasFechas < 15) {
                return res.status(400).send({ error: "Solo se puede agregar un inventario cada 15 días." })
            }
        }
        
        // Comprobar si ya existe inventario para la fecha actual
        let existData = await conn.query('SELECT * FROM Inventario WHERE date = ?', [fecha])
        
        if (existData.length > 0) {
            return res.status(400).send({ error: "Este inventario ya existe." })
        }
        
        // Añadir inventario
        BigInt.prototype.toJSON = function () { return this.toString() }
        
        let addData = await conn.query(`INSERT INTO 
                                            Inventario (date, boleta4h, boleta2h, boleta1h, boleta30min, stock_boleta4h, stock_boleta2h, stock_boleta1h, stock_boleta30min, precio_boleta4h, precio_boleta2h, precio_boleta1h, precio_boleta30min) 
                                            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`, 
                                            [fecha, boleta4h, boleta2h, boleta1h, boleta30min, stock_boleta4h, stock_boleta2h, stock_boleta1h, stock_boleta30min, precio_boleta4h, precio_boleta2h, precio_boleta1h, precio_boleta30min])
        
        return res.send({ message: 'Inventario agregado con éxito.', addData })
        
            
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: "An error occurred while retrieving data." })   
    } finally {
        conn.release()
    }
}

export const updateInventory = async (req, res) => {
    const conn = await pool.getConnection()
    try {
        const { id } = req.params
        const { date, boleta4h, boleta2h, boleta1h, boleta30min, gasto } = req.body;
        BigInt.prototype.toJSON = function () { return this.toString() }

        const data = await conn.query("UPDATE Inventario SET date = ?, boleta4h = ?, boleta2h = ?, boleta1h = ?, boleta30min = ?, gasto = ? WHERE codeInventario = ?", [ date, boleta4h, boleta2h, boleta1h, boleta30min, gasto, id]);

        return res.send({ data });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: "An error occurred while updating data." });
    } finally {
        conn.release();
    }
}