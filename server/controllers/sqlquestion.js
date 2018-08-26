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
        const userId = req.body.userId;
        const question = req.body.question;
        if (!userId) {
            return res.status(400).json({
                message: 'please enter user id!'
            });
        }
        if (!question) {
            return res.status(400).json({
                message: 'please enter question!'
            });
        }
        db.any('INSERT INTO questions (question, userid) VALUES ($1, $2)', [question, userId])
        .then(result => {          
            return res.status(201).json({status: 201, message: 'Question Posted'});
        })
        .catch(error => {
            return res.status(404).json({ error });
        });
    }
	
}
