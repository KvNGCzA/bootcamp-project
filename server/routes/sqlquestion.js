import express from 'express';
import checkAuth from '../auth/check-auth';
import { Questions } from '../controllers/sqlquestion';

const router = express.Router();

const questionsClass = new Questions();

// get all questions
router.get('/', questionsClass.fetchQuestions);

// get question by id
router.get('/:questionId', questionsClass.getQuestionById);

// get a users questions
router.get('/:username/questions', questionsClass.getUsersQuestions);

// post question
router.post('/', checkAuth, questionsClass.postQuestion);

// post answer
router.post('/:questionId/answers', checkAuth, questionsClass.postAnswer);

// select favorite
router.put('/:questionId/answers/:answerId', checkAuth, questionsClass.markFavorite);

// delete question
router.delete('/:questionId', checkAuth, questionsClass.deleteQuestion);

export default router;
