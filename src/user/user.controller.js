import pool from "../../configs/db.js";
import { checkPassword, encrypt } from "../utils/validator.js";
import nodemailer from 'nodemailer'
import { generateJwt } from '../utils/jwt.js'

export const getUsers = async (req, res) => {
    const conn = await pool.getConnection();
    try {
        const data = await conn.query("SELECT * FROM Users");
 
        return res.send( {data} )
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

        const newPassword = await encrypt(password)

        //Buscamos un usuario con los siguientes parametros
        const existingUser = await conn.query("SELECT * FROM Users WHERE username = ? OR email = ? OR phone = ?", [ username, email, phone])
        console.log(newPassword);
        
        //Validamos si exsite el usuario
        if (existingUser.length > 0) return res.status(404).send({ error: "User already exists." });   

        let result = await conn.query("INSERT INTO Users (nameUser, lastname, username, email, phone, password, role, state) VALUES (?,?,?,?,?,?,?,?)", [ nameUser, lastname, username, email, phone, newPassword, role, state ]);
        BigInt.prototype.toJSON = function () { return this.toString() }

        return res.send({ message: "User added successfully.", result })

        
    } catch (error) {
        console.error(error);   
        res.status(500).send({ error: "An error occurred while adding user." });
        conn.release();
    }
}

//Hacemos la validacion para el email del user

const validateEmail = async (to, subject, text) => {
    let transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'estradajuarezdiegorene@gmail.com',
            pass: 'bvpy qbeh tqwc jvdy'
        }
    })

    let mailOptions = {
        from: 'estradajuarezdiegorene@gmail.com',
        to: to,
        subject: subject,
        text: text
    }

    try {
        let info = await transport.sendEmail(mailOptions);
        console.log("Email sent: " + info.response);
        return info
    } catch (error) {
        console.log('Erro sending email', error);
    }
}

export const sendEmailForValidate = async (req, res) => {
    try {
        const { to, subject, text } = req.body
        
        let info = await validateEmail(to, subject, text)
        return res.send({ message: `Email sent to : ${to}`, info})
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: "An error occurred while sending email." });
    }
}

//Create admin for default
export const addAdminDefault = async () => {
    const conn = await pool.getConnection()
    try {
        const userExists = await conn.query("SELECT * FROM Users WHERE username = 'ADMIN'")
  
        if (userExists.length > 0) return console.log('User ADMIN has been created')

        const encryptPassword = await encrypt('ADMIN')
        
        const newUser = await conn.query("INSERT INTO Users (nameUser, lastname, username, email, phone, password, role, state) VALUES ('ADMIN','ADMIN','ADMIN','ADMIN','57954770', ?, 'ADMIN', 'ACTIVE')", [ encryptPassword ])
 
        return console.log('Admin added successfully');
        
    } catch (error) {
        console.error(error);
    }finally{
        conn.release();
    }

}

export const login = async (req, res) => {
    const conn = await pool.getConnection();
    try {
        const { username, password } = req.body;
        const [user] = await conn.query('SELECT * FROM Users WHERE username = ?', [username]);
        if(user === undefined || user === null) return res.status(404).send({ message: 'User not found.' });
        if( user.length <= 0) return res.status(404).send({ message: 'User not found.' });
        console.log(user.password);
        
        if(user && await checkPassword(password, user.password)){
            const [userLoged] = await conn.query('SELECT * FROM Users WHERE username = ?', [username]);

            let token = await generateJwt(userLoged)
            return res.send({ message:  `Welcome ${userLoged.nameUser}`, userLoged, token })

        }

        return res.status(404).send({ message: 'Invalid credentials.' });
        
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "An error occurred while logging in." });
    } finally {
        conn.release();
    }
}

export const updateUser = async (req, res) => {
    const conn = await pool.getConnection();
    try {
        const { id } = req.params;
        const { nameUser, lastname, username, email, phone, role, state } = req.body; 
        const data = await conn.query(`UPDATE users SET nameUser = ?, lastname = ?, username = ?, email = ?, phone = ? , role = ?, state = ? WHERE codeUser = ? `, [nameUser, lastname, username, email, phone, role, state, id])
        BigInt.prototype.toJSON = function () { return this.toString() }
        return res.send({ data })
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "An error occurred while updating user." });
    } finally {
        conn.release();
    }
}

export const deleteUser = async (req, res) => {
    const conn = await pool.getConnection();
    try {
        const { id } = req.params;
        BigInt.prototype.toJSON = function () { return this.toString() }

        const data = await conn.query(`DELETE FROM users WHERE codeUser = ?`, [id]) 
        return res.send({ data })
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "An error occurred while deleting user." });
    } finally {
        conn.release();
    }
}