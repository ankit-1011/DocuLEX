import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './controllers/authControllers';
import {authenticateJWT} from "./middlewares/auth";
import {uploadFile} from './controllers/uploadControllers';
import upload from './middlewares/upload';
import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();
const router = express.Router();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100,
	standardHeaders: 'draft-8', 
	legacyHeaders: false, 
	ipv6Subnet: 56, 
})

app.use('/api/auth', authRoutes);
app.use('/api', router);
app.use(limiter);

router.get('/profile', authenticateJWT, (req, res) => {
  res.json({ message: "Protected data", user: (req as any).user });
});

router.post('/upload',authenticateJWT,upload.single('file'),uploadFile);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})