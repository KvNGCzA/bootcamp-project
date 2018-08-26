import express from 'express';
import checkAuth from '../auth/check-auth';
import { Questions } from '../controllers/sqlquestion';

const router = express.Router();

const questionsClass = new Questions();

router.get('/', questionsClass.fetchQuestions);

router.post('/', checkAuth, questionsClass.postQuestion);

export default router;
