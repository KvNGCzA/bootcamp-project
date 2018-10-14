import express from 'express';
import checkAuth from '../auth/check-auth';
import { Questions } from '../controllers/sqlquestion';
import {
  validatePostQuestion, validateQuestionId, validatePostAnswer, validateAnswerId,
} from '../utils/validatorQuestion';
import { validateUsername } from '../utils/validatorUser';

const router = express.Router();

const questionsClass = new Questions();

// get all questions
router.get('/', questionsClass.fetchQuestions);

// get question by id
router.get('/:questionId', validateQuestionId, questionsClass.getQuestionById);

// get a users questions
router.get('/:username/questions', validateUsername, questionsClass.getUsersQuestions);

// search for a question
router.get('/search/:search', questionsClass.search);

// post question
router.post('/', checkAuth, validatePostQuestion, questionsClass.postQuestion);

// post answer
router.post('/:questionId/answers', checkAuth, validatePostAnswer, questionsClass.postAnswer);

// select favorite
router.put('/:questionId/answers/:answerId', checkAuth, validateQuestionId, validateAnswerId, questionsClass.markFavorite);

// like a question
router.put('/:questionId/like', checkAuth, validateQuestionId, questionsClass.likeQuestion);

// dislike a question
router.put('/:questionId/dislike', checkAuth, validateQuestionId, questionsClass.dislikeQuestion);

// like an answer
router.put('/answers/:answerId/like', checkAuth, validateAnswerId, questionsClass.likeAnswer);

// dislike an answer
router.put('/answers/:answerId/dislike', checkAuth, validateAnswerId, questionsClass.dislikeAnswer);

// delete question
router.delete('/:questionId', checkAuth, validateQuestionId, questionsClass.deleteQuestion);

export default router;
