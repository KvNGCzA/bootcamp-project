import express from 'express';
import { User } from '../controllers/signup';

const userClass = new User();

const router = express.Router();

router.get('/', userClass.fetchUsers);

router.post('/', userClass.createUser);

export default router;
