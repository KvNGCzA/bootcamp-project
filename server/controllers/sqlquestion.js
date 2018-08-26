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
        const userId = req.userData.id;
        const title = req.body.title;
        const content = req.body.content;
        if (!title) {
            return res.status(400).json({
                message: 'please enter question title!'
            });
        }
        if (!content) {
            return res.status(400).json({
                message: 'please enter question!'
            });
        }
        db.any('INSERT INTO questions (title, content, userid) VALUES ($1, $2, $3)', [title, content, userId])
        .then(result => {          
            return res.status(201).json({status: 201, message: 'Question Posted'});
        })
        .catch(error => {
            return res.status(500).json({ error });
        });
    }

    getQuestionById (req, res) {
        const { questionId } = req.params;
        db.any('SELECT * FROM questions WHERE id = $1', [questionId])
        .then(result => {
            db.any('SELECT * FROM answers WHERE questionId = $1', [questionId])
            .then(ansResult => {
                return res.status(200).json({status: 200, question: result, answers: ansResult});
            })
            .catch(error => {
                return res.status(500).json({ error });
            });
        })
        .catch(error => {
            return res.status(500).json({ error });
        }); 
    }

    postAnswer (req, res) {        
        const userId = req.userData.id;
        const answer = req.body.answer;
        const questionId = req.params.questionId;
        db.any('INSERT INTO answers (answer, questionid, userid) VALUES ($1, $2, $3)', [answer, questionId, userId])
        .then(result => {
            return res.status(200).json({status: 200, 'message': 'answer posted!'});
        })
        .catch(error => {
            return res.status(500).json({ error });
        });
    }
	
}
