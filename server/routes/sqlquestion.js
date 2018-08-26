import express from 'express';
import checkAuth from '../auth/check-auth';
import { Questions } from '../controllers/sqlquestion';

const router = express.Router();

const questionsClass = new Questions();

// get all questions
router.get('/', questionsClass.fetchQuestions);

// get question by id
router.get('/:questionId', checkAuth, questionsClass.getQuestionById);

// post question
router.post('/', checkAuth, questionsClass.postQuestion);

// post answer
router.post('/:questionId/answers', checkAuth, questionsClass.postAnswer);

export default router;
