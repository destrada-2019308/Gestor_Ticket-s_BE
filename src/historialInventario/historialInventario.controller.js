'use strict'

import pool from "../../configs/db.js"

export const getHistorialInventario = async (req, res) => {
    const conn = await pool.getConnection()
    try {
        const data = await conn.query('SELECT * FROM historialInventario')
        return res.send({data})
    } catch (error) {
        console.error(error)
        return res.status(500).send({ error: 'An error occurred while retrieving data.' })
    } finally {
        conn.release()
    }
}


export const addHistorialInventario = async (req, res) => {
    const conn = await pool.getConnection()
    try {
        const { cambio_boleta4h, cambio_boleta2h, cambio_boleta1h, cambio_boleta30min } = req.body

        const inventario = await conn.query('SELECT * FROM Inventario')
        //console.log(inventario)

        console.log(inventario[inventario.length - 1])
        
        console.log(inventario[inventario.length - 1].stock_boleta2h)

        let codeInventario = inventario[inventario.length - 1].codeInventario

        let boletos2h_stock = inventario[inventario.length - 1].stock_boleta2h
        let boletos4h_stock = inventario[inventario.length - 1].stock_boleta4h
        let boletos1h_stock = inventario[inventario.length - 1].stock_boleta1h
        let boletos30min_stock = inventario[inventario.length - 1].stock_boleta30min

        boletos1h_stock -= cambio_boleta1h
        boletos2h_stock -= cambio_boleta2h
        boletos4h_stock -= cambio_boleta4h 
        boletos30min_stock -= cambio_boleta30min


        await conn.query(`INSERT INTO historialInventario 
                            (codeInventario, cambio_boleta4h, cambio_boleta2h, cambio_boleta1h, cambio_boleta30min) VALUES (?,?,?,?,?)`,
                             [codeInventario, boletos4h_stock, boletos2h_stock, boletos1h_stock, boletos30min_stock])

        return res.send({ message: "Control agregado con exito." })

    } catch (error) {
        console.error(error)
        return res.status(500).send({ error: 'An error occurred while retrieving data.' })
    } finally {
        conn.release()
    }
}