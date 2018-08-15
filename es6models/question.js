import fs from 'fs';

export const fetchQuestions = () => {
    try {
      let questionDatabase = fs.readFileSync('databases/questions.json');
      return JSON.parse(questionDatabase);
    } catch (error) {
     return [];
    }
};

const saveQuestion = questions => {
    fs.writeFileSync('databases/questions.json',JSON.stringify(questions, undefined, 2));
};

export const createNewQuestion = (title, content, callback) => {
  if(!title){
    return callback({ status: 400, message: 'Title can not be empty'});
  }
  else if(!content){
    return callback({ status: 400,message: 'Content can not be empty' });
  }
  const currentQuestions = fetchQuestions();
  const questionId = `question${currentQuestions.length + 1}`;
  const newQuestion = {
    questionId,
    title: title.trim(),
    content: content.trim(),
    answer: []
  };
  currentQuestions.push(newQuestion);
  saveQuestion(currentQuestions);
  callback(undefined,{status: 201, result: 'Question added'});
};

export const getQuestionById= (questionId, callback) => {
  let currentQuestions = fetchQuestions();
  let question = currentQuestions.filter( question => question.questionId === questionId);
  if( question.length === 1 ){
    return callback(undefined, question);
  }else if( question.length > 1){
    return callback({ status: 404, message: 'More than one question has this id'});
  }
  return callback({ status: 404,message: 'Invalid question id'});
};
