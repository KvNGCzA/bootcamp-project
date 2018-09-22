import { validateEmail, validateWord } from './utils';

export const validateSignUpInfo = (req, res, next) => {
	const { firstName, lastName, occupation, username, email, password } = req.body;
	const first = validateWord(firstName);
    const last = validateWord(lastName);
    const occupationCheck = validateWord(occupation);
	const usernamecheck = typeof username === 'string' && username.length > 1 && (/^[a-zA-Z0-9]+(([_][a-zA-Z0-9])?[a-zA-Z0-9]*)*$/g).test(username);
	const parametersArr = [firstName, lastName, username, occupation, password];
	const checkArr = [first, last, usernamecheck, occupationCheck];
	const paraArr = ['first name', 'last name', 'username', 'occupation', 'password'];
	for (const x in parametersArr) {
		if (!parametersArr[x] || checkArr[x] === false) {
			return res.status(400).json({ status: 400, message: `${paraArr[x]} is empty or an invalid format` });
		}
    }
    if (!email || validateEmail(email) === false) {
        return res.status(400).json({ status: 400, message: 'email address is empty or an invalid format' });
    } 
	return next();
};

export const validateLoginInfo = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || validateEmail(email) === false) {
        return res.status(400).json({ status: 400, message: 'email address is empty or an invalid format' });
    }
    if (!password) {
        return res.status(400).json({ status: 400, message: 'please enter a valid password' });
    }
    return next();
};

export const validateUsername = (req, res, next) => {
    const { username } = req.params;
    if ((/^[a-zA-Z0-9]+(([_][a-zA-Z0-9])?[a-zA-Z0-9]*)*$/g).test(username) === false) {
        return res.status(400).json({ status: 400, message: 'username is in an invalid format' });
    }
    return next();
};
