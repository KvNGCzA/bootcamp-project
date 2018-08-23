import express from 'express';
import { Question } from '../controllers/question';

const router = express.Router();

const QuestionClass = new Question();

// get all questions
router.get('/', QuestionClass.getAllQuestions);

router.get('/:questionId', QuestionClass.getQuestionsById);

// post question
router.post('/', QuestionClass.createNewQuestion);

// post an answer
router.post('/:questionId/answers', QuestionClass.postAnswer);

// edit question details
router.patch('/:questionId', QuestionClass.editQuestion);

// delete a question
router.delete('/:questionId', QuestionClass.deleteQuestion);

export default router;
