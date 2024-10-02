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
            const { date, boleta4h, boleta4h_quantity, boleta2h, boleta2h_quantity, boleta1h, boleta1h_quantity, boleta30min, boleta30min_quantity, gasto } = req.body

            let existData = await conn.query('SELECT * FROM Inventario WHERE date = ?', [date])
            if(existData.length > 0) return res.status(400).send({ error: "Este inventario ya existe." })
                BigInt.prototype.toJSON = function () { return this.toString() }

            let addData = await conn.query('INSERT INTO ')

            return res.send({ message: 'Inventario agregado con exito.', addData })
            
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