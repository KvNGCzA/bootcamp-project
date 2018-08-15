import express from 'express';

const router = express.Router();
import * as question from '../models/question';

/** get all questions*/
router.get('/', (req, res, next) => {
  const allQuestions = question.fetchQuestions();
  res.status(200).json(allQuestions);
});

/**get question by id*/
router.get('/:questionId', (req, res, next) => {
  question.getQuestionById(req.params.questionId, (errorMessage, results) => {
    if(errorMessage){
      return res.status(404).json(errorMessage);
    }
    res.status(200).json(results);
  });
});

/**post question*/
router.post( '/', (req, res, next) => {
  question.createNewQuestion(req.body.title ,req.body.content, (errorMessage, result) => {
    if(errorMessage){
      return res.status(400).json(errorMessage);
    }
      res.status(201).json(result);
  });
});

/**post an answer*/
router.post('/:questionId/answers', (req, res, next) => {
    question.postAnswer(req.params.questionId, req.body.answer, (errorMessage, result) => {
    if(errorMessage){
      return res.status(404).json(errorMessage);
    }
    res.status(201).json(result);
  });
});

/**edit question details*/
router.patch('/:questionId', (req, res, next) => {
  question.editQuestion(req.params.questionId, req.body.prop, req.body.newProp, (errorMessage, result)=>{
    if(errorMessage){
      return res.status(404).json(errorMessage);
    }
    res.status(201).json(result);
  });
});

/**delete a question*/
router.delete('/:questionId', (req, res, next) => {
  question.deleteQuestion(req.params.questionId, (errorMessage, result) => {
    if(errorMessage){
      return res.status(404).json(errorMessage);
    }
    res.status(200).json(result);
  });

});

export default router;
