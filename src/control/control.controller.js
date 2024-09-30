'use strict'

import pool from "../../configs/db.js"

export const getControl = async (req, res) => {   
    
    const conn = await pool.getConnection();
    
    try {
        let data = await conn.query(`SELECT * FROM Control`)
        return res.send({data})
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: "An error occurred while retrieving data." })
    } finally {
        conn.release();
    }
} 

export const addControl = async (req, res) => {
    const conn = await pool.getConnection();
    try {
        const { hrs_init, hrs_end, role, description, nameClient, codeGerencia, codeUser, date, boletosUsados4h, boletosUsados2h, boletosUsados1h, boletosUsados30min } = req.body;
        let existData = await conn.query('SELECT * FROM Control WHERE date = ?', [date])
        if(existData.length > 0){
            return res.status(400).send({ error: "El control para la fecha ingresada ya existe." })
        }

        


        await conn.query('INSERT INTO Control (hrs_init, hrs_end, role, description, nameClient, codeGerencia, codeUser, date, boletosUsados4h, boletosUsados2h, boletosUsados1h, boletosUsados30min ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)', [ hrs_init, hrs_end, role, description, nameClient, codeGerencia, codeUser, date, boletosUsados4h, boletosUsados2h, boletosUsados1h, boletosUsados30min ])
        return res.send({ message: "Control agregado con exito." })
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: "An error occurred while retrieving data." })
    }finally{
        conn.release();
    }
}