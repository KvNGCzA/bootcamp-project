import fs from 'fs';

export const fetchQuestions = () => {
    try {
      let questionDatabase = fs.readFileSync('server/db/questions.json');
      return JSON.parse(questionDatabase);
    } catch (error) {
     return [];
    }
};

const saveQuestion = questions => {
    fs.writeFileSync('server/db/questions.json',JSON.stringify(questions, undefined, 2));
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

export const postAnswer = (questionId, answer, callback) => {
  if(!answer){
    return callback({  status: 404,  message: 'Missing answer property'  });
  }
  let allQuestions = fetchQuestions();
  let question =  allQuestions.filter( question => question.questionId === questionId);
  if( question.length === 0 ){
		return callback({ status: 404, message: 'Question id is invalid' });
  }
	let otherQuestions = allQuestions.filter( question => question.questionId !== questionId);
  question[0].answer.unshift(answer);
  otherQuestions.push(question[0]);
  saveQuestion(otherQuestions);
  return callback(undefined,{ status: 201, message: 'Answer added' });
};

export const deleteQuestion = (questionId, callback) => {
  let allQuestions = fetchQuestions();
  let removeQuestion = allQuestions.filter(question => question.questionId !== questionId);
  if( allQuestions.length === removeQuestion.length){
    return callback({ status: 404, message:'Invalid question id' });
  }
  saveQuestion(removeQuestion);
  callback(undefined, { status: 200, message:'Question deleted' });
};

export const editQuestion = (questionId, prop, newProp, callback) => {
 if(!prop){
    return callback({ status: 404, message: 'Missing prop property' });
  }else if(!newProp){
    return callback({ status: 404, message: 'Missing newProp property' });
  }
  let allQuestions = fetchQuestions();
  let duplicateQuestion = allQuestions.filter(question => question.questionId === questionId);
  let otherQuestions = allQuestions.filter(question => question.questionId !== questionId);
  if(duplicateQuestion < 1){
    return callback({ status: 404, message: 'Question id is invalid'});
  }else if( duplicateQuestion > 1){
    return callback({ status: 404, message: 'More than one quetion exists with this id'});
  }
  duplicateQuestion[0][prop] = newProp;
  otherQuestions.push(duplicateQuestion[0]);
  saveQuestion(otherQuestions);
  callback(undefined, { status: 201, message: `Question ${prop} updated`});
};
