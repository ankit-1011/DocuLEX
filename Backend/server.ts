import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './controllers/authControllers';
import {authenticateJWT} from "./middlewares/auth";

dotenv.config();

const app = express();
const router = express.Router();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

router.get('/profile', authenticateJWT, (req, res) => {
  res.json({ message: "Protected data", user: (req as any).user });
});

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})