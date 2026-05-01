import express, { Request, Response } from "express";

export const uploadFile = async (req: Request, res: Response) => {
    try {
        const file = (<any>req).file;

        const formData = new FormData();
        formData.append("file", new Blob([file.buffer]), file.originalname);
        formData.append("network", "public");

        const response = await fetch("https://uploads.pinata.cloud/v3/files", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.PINATA_JWT}`,
            },
            body: formData,
        });

      if (!response.ok) {
            const data = await response.json();
            console.error("Pinata upload failed:", data);
            return res.status(response.status >= 400 ? response.status : 502).json({
                error: "Pinata upload failed",
                details: data,
            });
        }

        const data = await response.json();
        console.log("Pinata response:", data);
        res.status(200).json({ message: "File uploaded successfully", pinata: data });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Upload failed" });
    }
};