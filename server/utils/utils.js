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


export const validateEmail = (str) => {
	let re = /[.]/g;
	const test = str.match(re);
	if (test === null) {
		return false;
	}
	if (test.length < 3) {
		const split = str.split('.');
		const lastPart = split[split.length - 1];
		if (/@yahoo/g.test(str) || /@gmail/g.test(str) || /@aol/g.test(str) || /@hotmail/g.test(str) || /@outlook/g.test(str) || /@[a-zA-Z]{3,}/g.test(str)) {
			if (lastPart === 'com' || lastPart === 'uk' || lastPart === 'za') {
				return true;
			}
		}
	}
	return false;
};

export const validateWord = str => typeof str === 'string' && str.length > 1 && (/^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$/g).test(str);
