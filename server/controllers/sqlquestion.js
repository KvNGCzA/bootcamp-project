import { db } from '../db';

export class Questions {
	// fetch all questions
	fetchQuestions (req, res) {
		db.any('SELECT * FROM questions')
		.then(questions => {
			return res.status(200).json(questions);
		})
		.catch(error => {
			return res.status(404).json({ error });
		});
    }
    
    // post a question
    postQuestion (req, res) {
        const { id } = req.userData;
        const { title } = req.body;
        const { content } = req.body;
        // validate title and content
        if (!title) {
            return res.status(400).json({ message: 'please enter question title!' });
        }
        if (!content) {
            return res.status(400).json({ message: 'please enter question!' });
        }
        // first fetch username
        db.any('SELECT * FROM users WHERE id = $1', [id])
        .then(result => {
            const { username } = result[0];
            // add question to database
            db.any('INSERT INTO questions (title, content, username, userId) VALUES ($1, $2, $3, $4)', [title, content, username, id])
            .then(() => {          
                return res.status(201).json({ status: 201, message: 'Question Posted' });
            })
            .catch(error => {
                return res.status(500).json({ error });
            });
        })
        .catch(error => {
            return res.status(500).json({ error });
        });        
    }

    // get a question by its id
    getQuestionById (req, res) {
        const { questionId } = req.params;
        // fetch question from database
        db.any('SELECT * FROM questions WHERE id = $1', [questionId])
        .then(question => {
            // if question array is empty
            if( question.length < 1){
                return res.status(404).json({ message: 'question does not exist'});
            }
            // return questions answers
            db.any('SELECT * FROM answers WHERE questionId = $1', [questionId])
            .then(answers => {
                return res.status(200).json({ question, answers});
            })
            .catch(error => {
                return res.status(500).json({ error });
            });
        })
        .catch(error => {
            return res.status(500).json({ error });
        }); 
    }

    // post answers
    postAnswer (req, res) {        
        const { id } = req.userData;
        const { answer } = req.body;
        const { questionId } = req.params;
        // fetch username
        db.any('SELECT * FROM users WHERE id = $1', [id])
        .then(result => {
            const { username } = result[0];
            // insert an answer to a question
            db.any('INSERT INTO answers (answer, questionid, username) VALUES ($1, $2, $3)', [answer, questionId, username])
            .then(result => {
                return res.status(200).json({'message': 'answer posted!'});
            })
            .catch(error => {
                return res.status(500).json({ error });
            });
        })
        .catch(error => {
            return res.status(500).json({ error });
        });        
    }
    
    deleteQuestion (req, res) {        
        const { questionId } = req.params;
        const { id } = req.userData;
        db.any('SELECT * FROM questions WHERE id = $1', [questionId])
        .then(question => {
            if (question.length < 1) {
                return res.status(404).json({ message: 'question does not exist' });
            }
            // check if user trying to delete question is the user that created the question
            if (question[0].userid === id) {
                // delete question
                db.any('DELETE FROM questions WHERE id = $1', [questionId])
                .then(() => {
                    // delete all answers to the question
                    db.any('DELETE FROM answers WHERE questionId = $1', [questionId])
                    .then(() => {                
                        return res.status(200).json({ message: 'question deleted!' });
                    })
                    .catch(error => {
                        return res.status(500).json({ error });
                    });
                })
                .catch(error => {
                    return res.status(500).json({ error });
                });
            }else{
                // if user trying to delete the question is not the user that created the question
                return res.status(400).json({ message: 'You do not have the permission to delete this question!' });
            }
        })
        .catch(error => {
            return res.status(500).json({ error });
        });
    }
}
