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
                return res.status(201).json({ message: 'question posted!' });
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
                return res.status(200).json({question, answers});
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
        if (!answer || answer.trim() === '') {
            return res.status(400).json({ message: 'invalid or empty answer property' });
        }
        // fetch id of question creator
        db.any('SELECT * FROM questions WHERE id = $1', [questionId])
        .then(question => {
            let creatorId = question[0].userid;
             // fetch username of poster
            db.any('SELECT * FROM users WHERE id = $1', [id])
            .then(result => {
                const { username } = result[0];
                // insert an answer to a question
                db.any('INSERT INTO answers (answer, questionid, username, creator_id, userid) VALUES ($1, $2, $3, $4, $5)', [answer, questionId, username, creatorId, id])
                .then(() => {
                    return res.status(201).json({'message': 'answer posted!'});
                })
                .catch(error => {
                    return res.status(500).json({ error });
                });
            })
            .catch(error => {
                return res.status(500).json({ error });
            });  
        })
        .catch(error => {
                return res.status(500).json({ error });
        });
    }
        
    // mark favorite or update answer
    markFavorite (req, res) {
        const { questionId } = req.params;
        const { answerId } = req.params;
        const { newAnswer } = req.body;
        const { id } = req.userData;

        
        db.any('SELECT * FROM answers WHERE questionid = $1 AND id = $2', [questionId, answerId])
        .then(answer => {
            // if route is accessed by question creator
            if (answer[0].creator_id === id) {
                db.any('SELECT * FROM answers WHERE questionid = $1 AND favorite = $2', [questionId, true])
                .then(result => {
                    // if there is no favorite
                    if (result.length < 1) {
                        // set new favorite
                        db.any('UPDATE answers SET favorite = $1 WHERE questionid = $2 AND id = $3', [true, questionId, answerId])
                        .then(favAnswer => {
                            return res.status(200).json({ message: 'answer was favorited!' });
                         })
                        .catch(error => res.status(500).json({ error }));
                    }
                    // if there is a favorite
                    if (result.length === 1) {
                        // set old favorite to false
                        db.any('UPDATE answers SET favorite = $1 WHERE questionid = $2 AND favorite = $3', [false, questionId, true])
                        .then(result => {
                            // set the new favorite to true
                            db.any('UPDATE answers SET favorite = $1 WHERE questionid = $2 AND id = $3', [true, questionId, answerId])
                            .then(() => {
                                return res.status(200).json({ message: 'answer was favorited!' });
                            })
                            .catch(error => res.status(500).json({ error }));
                        })
                        .catch(error => res.status(500).json({ error }));
                    }
                })
                .catch(error => res.status(500).json({ error }));
            }
            // if route is accessed by answer creator
            if (answer[0].userid === id) {
                const { newAnswer } = req.body;
                // update answer
                db.any('UPDATE answers SET answer = $1 WHERE questionid = $2 AND id = $3', [newAnswer, questionId, answerId])
                .then(() => {
                    return res.status(201).json({ message:  'answer updated!' });
                })
                .catch(error => error);
            }
            if (answer[0].userid !== id && answer[0].creator_id !== id) {                
                return res.status(400).json({ message: 'You do no have access to this' });
            }
        })
        .catch(error => res.status(500).json({ error }));      
    }

    // delete a question
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
                    return res.status(200).json({ message: 'question deleted!' });
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
