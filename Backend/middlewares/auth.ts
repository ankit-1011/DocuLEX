import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken";

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {

    const authHeaders = req.headers.authorization;
    if (!authHeaders) {
        return res.status(401).json({ message: "No token provided!" });
    }

    const token = authHeaders.split(" ")[1];
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET as string);//decode object mila h jisme client ke info h
        (req as any).user = decoded;//req object me user info add hoga
        next();
    }catch(error){
        return res.status(401).json({message:"Invalid token!"});
    }
}