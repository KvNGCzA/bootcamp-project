import express from 'express';
import { User } from '../controllers/user';
import checkAuth from '../auth/check-auth';

const userClass = new User();

const router = express.Router();

router.get('/users', userClass.fetchUsers);

router.get('/user/:username', userClass.fetchUserByUsername);

router.post('/signup', userClass.createUser);

router.post('/login', userClass.login);

router.post('/logout', checkAuth, userClass.logout);

export default router;
