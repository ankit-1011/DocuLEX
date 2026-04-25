import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './controllers/authControllers';
import {authenticateJWT} from "./middlewares/auth";
import {uploadFile} from './controllers/uploadControllers';
import upload from './middlewares/upload';

dotenv.config();

const app = express();
const router = express.Router();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', router);

router.get('/profile', authenticateJWT, (req, res) => {
  res.json({ message: "Protected data", user: (req as any).user });
});

router.post('/upload',upload.single('file'),uploadFile);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})