'use strict';

import jwt from 'jsonwebtoken';
import pool from '../../configs/db.js';

export const validateJwt = async (req, res, next) => {
    try {
        let secretKey = process.env.SECRET_KEY;
        let { authorization } = req.headers;

        if(!authorization) return res.status(401).send({ message: 'Unauthorized' });

        let { codeUser } = jwt.verify(authorization, secretKey);

        let conn = await pool.getConnection();
        const user = await conn.query('SELECT * FROM Users WHERE codeUser = ?', codeUser)

        if(!user) return res.status(404).send({ message: 'User not found' });

        req.user = user;
        next();

    } catch (error) {
        console.error(error);
        return res.status(401).send({ message: 'Invalid token'})
    }
}


export const isAdmin = async (req, res, next) => {
    try {
        let { user } = req 
        let [newUser] = user
 
        
        if(!newUser || newUser.role !== 'ADMIN') return res.status(403).send({ message: 'You dont have access | You are not admin' })

        next()
    } catch (error) {
        console.error(error);
        return res.status(403).send({ message: 'Unauthorized role' })
    }
}