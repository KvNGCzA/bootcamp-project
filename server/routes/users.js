import express from 'express';
import multer from 'multer';

import { User } from '../controllers/user';
import checkAuth from '../auth/check-auth';
import { validateSignUpInfo, validateLoginInfo, validateUsername } from '../utils/validatorUser';

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'public/images/');
    },
    filename: (req, file, callback) => {
        callback(null, req.body.username + file.originalname);
    },
});

const filter = (req, file, callback) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {        
        callback(null, true);
    } else {
        callback(null, false);
    }    
};

const upload = multer({
    storage,
    limits: {
    fileSize: 1024 * 1024,
    },
    filter,
});

const userClass = new User();

const router = express.Router();

router.get('/users', userClass.fetchUsers);

router.get('/user/:username', validateUsername, userClass.fetchUserByUsername);

router.post('/signup', validateSignUpInfo, upload.single('profileImage'), userClass.createUser);

router.post('/login', validateLoginInfo, userClass.login);

router.post('/logout', checkAuth, userClass.logout);

export default router;
