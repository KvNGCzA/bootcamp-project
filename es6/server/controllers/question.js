import { allQuestions, saveQuestion } from '../utils/utils'

export class Question {
	// get all questions
	getAllQuestions (req, res) {
		return res.status(200).json(allQuestions);
	}
	
	// create a new question
	createNewQuestion (req, res) {
		if (!req.body.title) {
			return res.status(400).json({ status: 400, message: 'Title can not be empty' });
		}
		if (!req.body.content) {
			return res.status(400).json({ status: 400, message: 'Content can not be empty' });
		}
		const questionId = `question${allQuestions.length + 1}`;
		const newQuestion = {
			questionId,
			title: req.body.title.trim(),
			content: req.body.content.trim(),
			answer: [],
		};
		allQuestions.push(newQuestion);
		saveQuestion(allQuestions);
		return res.status(201).json({ status: 201, result: 'Question added' });
	}
	
	// get a question by its Id
	getQuestionsById (req, res) {
		const { questionId } = req.params;
	  const question = allQuestions.filter(singleQuestion => singleQuestion.questionId === questionId);  
	  if (question.length !== 0) {    
	  console.log('if not empty: ',question);
		return res.status(200).json({ question: question[0] });
	} 
	  console.log('if empty', question);
	  return res.status(404).json({ message: 'Invalid question id' });	
	}
	
	//post an answer to a question
	postAnswer (req, res) {
		if (!req.body.answer) {
			return res.status(404).json({ status: 404, message: 'Missing answer property' });
		}
		const dupQuestions = allQuestions.filter(question => question.questionId === req.params.questionId);
		if (dupQuestions.length === 0) {
			return res.status(404).json({ status: 404, message: 'Question id is invalid' });
		}
		const otherQuestions = allQuestions.filter(question => question.questionId !== req.params.questionId);
		dupQuestions[0].answer.unshift(req.body.answer);
		otherQuestions.push(dupQuestions[0]);
		saveQuestion(otherQuestions);
		return res.status(201).json({ status: 201, message: 'Answer added' });
	}
	
	// edit a question
	editQuestion (req, res) {
		if (!req.body.prop) {
			return res.status(404).json({ status: 404, message: 'Missing prop property' });
		}
		if (!req.body.newProp) {
			return res.status(404).json({ status: 404, message: 'Missing newProp property' });
		}
		const duplicateQuestion = allQuestions.filter(question => question.questionId === req.params.questionId);
		const otherQuestions = allQuestions.filter(question => question.questionId !== req.params.questionId);
		if (duplicateQuestion < 1) {
			return res.status(404).json({ status: 404, message: 'Question id is invalid' });
		}
		duplicateQuestion[0][req.body.prop] = req.body.newProp;
		otherQuestions.push(duplicateQuestion[0]);
		saveQuestion(otherQuestions);
		return res.status(201).json({ status: 201, message: `Question ${req.body.prop} updated` });
	}

	// delete a guestion by its id
	deleteQuestion (req, res) {
		const removeQuestion = allQuestions.filter(question => question.questionId !== req.params.questionId);
		if (allQuestions.length === removeQuestion.length) {
			return res.status(404).json({ status: 404, message: 'Invalid question id' });
		}
		saveQuestion(removeQuestion);
		return res.status(200).json({ status: 200, message: 'Question deleted' });
	}	
}
