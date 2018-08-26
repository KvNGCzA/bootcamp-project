import fs from 'fs';

const fetchQuestions = () => {
	try {
		const questionDatabase = fs.readFileSync('server/db/questions.json');
		return JSON.parse(questionDatabase);
	} catch (error) {
		return [];
	}
};

export const saveQuestion = questions => fs.writeFileSync('server/db/questions.json', JSON.stringify(questions, undefined, 2));

export const allQuestions = fetchQuestions();
