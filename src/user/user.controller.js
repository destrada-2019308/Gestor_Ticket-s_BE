import pool from "../../configs/db.js";


export const getUsers = async (req, res) => {
    const conn = await pool.getConnection();
    try {
        const data = await conn.query("SELECT * FROM Users");

        return res.send({ data })
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "An error occurred while retrieving users." });
    } finally {
        conn.release();
    }
}

export const addUser = async (req, res) => {
    const conn = await pool.getConnection();
    try {
        let { nameUser, lastname, username, email, phone, password, role, state } = req.body;

        const data = await conn.query("INSERT INTO Users ");
    } catch (error) {
        
    }
}