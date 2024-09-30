'use strict'

import pool from "../../configs/db.js";

export const test = async (req, res) => {
    console.log('Testing managements...');
    return res.send({ message: 'test managements is running'})
}

export const getManagements = async (req, res) => {
    const conn = pool.getConnection()
    try {
        let data = await conn.query(`SELECT * FROM Gerencias`)

        return res.send({ data })

    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: "An error occurred while retrieving data." })
    }finally{
        conn.release()
    }
}   

export const addManagements = async (req, res) => {
    const conn = pool.getConnection()
    try {
        const { nameGerencia, nameEncargado, telefonoEncargado, emailEncargado, description } = req.body

        //Buscamos una generencia para que no la agrege si ya existe
        let existData = await conn.query('SELECT * FROM Gerencias WHERE nameGerencia = ?', [nameGerencia])
        if(existData.length > 0) return res.status(400).send({ error: "La gerencia ya existe." })
            BigInt.prototype.toJSON = function () { return this.toString() }
        let addData = await conn.query('INSERT INTO Gerencias (nameGerencia, nameEncargado, telefonoEncargado, emailEncargado, description) VALUES (?,?,?,?,?)', [ nameGerencia, nameEncargado, telefonoEncargado, emailEncargado, description ])

        return res.send({ message: "Gerencia agregada con exito.", addData })

    }catch (error) {
        console.error(error);
        return res.status(500).send({ error: "An error occurred while adding data." })
    }finally{
        conn.release()
    }
}

export const updateManagements = async (req, res) => {
    const conn = pool.getConnection();
    try {
        let { id } = req.params
        let { nameGerencia, nameEncargado, telefonoEncargado, emailEncargado, description } = req.body

        BigInt.prototype.toJSON = function () { return this.toString() }
        const data = await conn.query(`UPDATE Gerencias SET nameGerencia = ?, nameEncargado = ?, telefonoEncargado = ?, emailEncargado = ?, description = ? WHERE codeGerencia = ?`, [nameGerencia, nameEncargado, telefonoEncargado, emailEncargado, description, id])
        return res.send({ data })

    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: "An error occurred while updating data." })
    }finally {
        conn.release();
    }
}
