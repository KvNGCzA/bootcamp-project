import fs from 'fs';

export const fetchQuestions = () => {
	try {
		const questionDatabase = fs.readFileSync('server/db/questions.json');
		return JSON.parse(questionDatabase);
	} catch (error) {
		return [];
	}
};

const saveQuestion = questions => fs.writeFileSync('server/db/questions.json', JSON.stringify(questions, undefined, 2));

const allQuestions = fetchQuestions();

export const createNewQuestion = (title, content, callback) => {
	if (!title) {
		return callback({ status: 400, message: 'Title can not be empty' });
	}
	if (!content) {
		return callback({ status: 400, message: 'Content can not be empty' });
	}
	const questionId = `question${allQuestions.length + 1}`;
	const newQuestion = {
		questionId,
		title: title.trim(),
		content: content.trim(),
		answer: [],
	};
	allQuestions.push(newQuestion);
	saveQuestion(allQuestions);
	return callback(undefined, { status: 201, result: 'Question added' });
};

export const getQuestionsById = (req, res) => {
	const { questionId } = req.params;
  const question = allQuestions.filter(singleQuestion => singleQuestion.questionId === questionId);  
  if (question.length !== 0) {    
  console.log('if not empty: ',question);
    return res.status(200).json({ question: question[0] });
} 
  console.log('if empty', question);
  return res.status(404).json({ message: 'Invalid question id' });	
};

export const postAnswer = (questionId, answer, callback) => {
	if (!answer) {
		return callback({ status: 404, message: 'Missing answer property' });
	}
	const dupQuestions = allQuestions.filter(question => question.questionId === questionId);
	if (dupQuestions.length === 0) {
		return callback({ status: 404, message: 'Question id is invalid' });
	}
	const otherQuestions = allQuestions.filter(question => question.questionId !== questionId);
	dupQuestions[0].answer.unshift(answer);
	otherQuestions.push(dupQuestions[0]);
	saveQuestion(otherQuestions);
	return callback(undefined, { status: 201, message: 'Answer added' });
};

export const deleteQuestion = (questionId, callback) => {
	const removeQuestion = allQuestions.filter(question => question.questionId !== questionId);
	if (allQuestions.length === removeQuestion.length) {
		return callback({ status: 404, message: 'Invalid question id' });
	}
	saveQuestion(removeQuestion);
	return callback(undefined, { status: 200, message: 'Question deleted' });
};

export const editQuestion = (questionId, prop, newProp, callback) => {
	if (!prop) {
		return callback({ status: 404, message: 'Missing prop property' });
	}
	if (!newProp) {
		return callback({ status: 404, message: 'Missing newProp property' });
	}
	const duplicateQuestion = allQuestions.filter(question => question.questionId === questionId);
	const otherQuestions = allQuestions.filter(question => question.questionId !== questionId);
	if (duplicateQuestion < 1) {
		return callback({ status: 404, message: 'Question id is invalid' });
	}
	if (duplicateQuestion > 1) {
		return callback({ status: 404, message: 'More than one quetion exists with this id' });
	}
	duplicateQuestion[0][prop] = newProp;
	otherQuestions.push(duplicateQuestion[0]);
	saveQuestion(otherQuestions);
	return callback(undefined, { status: 201, message: `Question ${prop} updated` });
};
