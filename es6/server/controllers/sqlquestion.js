import { db } from '../db';


export class Questions {	
	// fetch all questions
	fetchQuestions (req, res) {
		db.any('SELECT * FROM questions')
		.then( questions => {
			return res.status(200).json({ questions });
		})
		.catch( error => {
			return res.status(404).json({ error });
		});
    }
    
    postQuestion (req, res) {
        if (!req.body.userId) {
            return res.status(400).json({
                message: 'please enter user id!'
            });
        }
        if (!req.body.question) {
            return res.status(400).json({
                message: 'please enter question!'
            });
        }
        db.any('INSERT INTO questions (question, userid) VALUES ($1, $2)', [req.body.question, req.body.userId])
        .then(result => {          
            return res.status(201).json({status: 201, message: 'Question Posted'});
        })
        .catch(error => {
            return res.status(404).json({ error });
        });
    }
	
}
