import pool from '../models/db'
import express, { Request, Response } from "express";



const DocsDBControllers = async (req: Request, res: Response) => {
    const { email, cid, filename, filetype, wallet_address } = req.body;
    try {
        const userExit = await pool.query('SELECT * FROM users WHERE email=$1', [email])

        if (!userExit.rows.length) {
            return res.status(400).json({ message: "User not found!" })
        }


        const existingDoc = await pool.query(
            'SELECT * FROM documents WHERE cid=$1',
            [cid]
        );

        if (existingDoc.rows.length > 0) {
            return res.status(400).json({
                message: "Document already stored"
            });
        }

        const user_id = userExit.rows[0].id;

        await pool.query('INSERT INTO documents(docs_id, cid, filename, filetype, wallet_address) VALUES($1,$2,$3,$4,$5)', [user_id, cid, filename, filetype, wallet_address])

        const docs = await pool.query('SELECT * FROM documents JOIN users ON documents.docs_id = users.id WHERE documents.wallet_address=$1', [wallet_address])

        res.status(200).json({ documents: docs.rows })
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to save document metadata" });
    }
}

export default DocsDBControllers;
