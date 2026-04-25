const express = require('express')
import { Request, Response } from "express"



export const uploadFile = (req: Request, res: Response) => {
    try {

        if(!req.file)
        {
            return res.status(400).json({ message: 'No file uploaded!' });
        }
        res.status(200).json({
            message: 'File uploaded successfully!',
            file: req.file,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading file!' });
    }
}

