import {Router} from 'express';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from '../models/db';


const router = Router();


//Signup route
router.post('/signup', async (req, res) => {
    const {email, password, name} = req.body;

    const existingUser = await pool.query('SELECT * FROM users WHERE email=$1', [email]);

    if (existingUser.rows.length > 0) {
        return res.status(400).json({ message: "User already exit!" });
    }

    const password_hash = await bcrypt.hash(password, 10);

    await pool.query('INSERT INTO users(name,email,password_hash)VALUES($1,$2,$3)', [name, email, password_hash])
        .then(() => {
            return res.status(201).json({ message: 'User created successfully!' })
        })
        .catch((err:any) => {
            return res.status(500).json({ message: err.message });
        })
})


//Login route
router.post('/login', async (req, res) => {
    const {email, password} = req.body;

    const existingUser = await pool.query('SELECT * FROM users WHERE email=$1', [email]);

    if (existingUser.rows.length === 0) {
        return res.status(400).json({ message: "User not found!" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.rows[0].password_hash);

    if (!isMatch) {
        return res.status(404).json({ message: "Invalid password!" });
    }
   
    const user = existingUser.rows[0];

    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET as string, { expiresIn: "7d" })

    res.json({token})
})

export default router;