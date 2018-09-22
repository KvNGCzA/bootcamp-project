import fs from 'fs';
import { db } from '../db';

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

export const removeFromDislikers = (req, res, username, id, x, y) => {
    db.any(`SELECT dislikes FROM ${x} WHERE id = $1`, [id])
    .then(dislikes => {
        const dislikers = dislikes[0].dislikes;
        if (dislikers !== null && dislikers.indexOf(username) !== -1) {
            const newDislikers = dislikers.filter(disliker => disliker !== username);
            db.none(`UPDATE ${x} SET dislikes = $1 WHERE id = $2`, [newDislikers, id])
            .then(() => res.status(200).json({ status: 200, message: `${y} liked!` }))
            .catch(error => res.status(500).json({ status: 500, error }));
        }else{
            return res.status(200).json({ status: 200, message: `${y} liked!` });
        }
    }).catch(error => res.status(500).json({ status: 500, error }));
};

export const removeFromLikers = (req, res, username, id, x, y) => {
    db.any(`SELECT likes FROM ${x} WHERE id = $1`, [id])
    .then(likes => {
        const likers = likes[0].likes;
        if (likers !== null && likers.indexOf(username) !== -1) {
            const newLikers = likers.filter(liker => liker !== username);
            db.none(`UPDATE ${x} SET likes = $1 WHERE id = $2`, [newLikers, id])
            .then(() => res.status(200).json({ status: 200, message: `${y} disliked!` }))
            .catch(error => res.status(500).json({ status: 500, error }));
        }else{
            return res.status(200).json({ status: 200, message: `${y} disliked!` });
        }
    })
    .catch(error => res.status(500).json({ status: 500, error }));
};