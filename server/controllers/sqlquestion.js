import { db } from '../db';

export class Questions {
    
	// fetch all questions
	fetchQuestions (req, res) {
		db.any('SELECT * FROM questions')
		.then(questions => {
			return res.status(200).json({ status: 200, questions });
		})
		.catch(error => {
			return res.status(404).json({ status: 404, error });
		});
    }
    
    // post a question
    postQuestion (req, res) {
        const { id, username } = req.userData;
        const { title, content, tags } = req.body;
        // validate title and content
        if (!title) {
            return res.status(400).json({ status: 400, message: 'please enter question title!' });
        }
        if (!content) {
            return res.status(400).json({ status: 400, message: 'please enter question content!' });
        }
        if (!tags) {
            return res.status(400).json({ status: 400, message: 'please enter tags for this question!' });
        }
        if (/[a-zA-Z]/g.test(title) === false || /[a-zA-Z]/g.test(content) === false) {
            return res.status(400).json({ status: 400, message: 'you cannot post this type of title or content!' });
        }
        db.any('INSERT INTO questions (title, content, username, userId, tags) VALUES ($1, $2, $3, $4, $5)', [title, content, username, id, tags])
            .then(() => {
                db.any('UPDATE users SET asked_count = asked_count + $1 WHERE id = $2', [1 ,id] )
                .then(() => {                    
                    return res.status(201).json({ status: 201, message: 'question posted!' });
                })
                .catch(error => res.status(500).json({ status: 500, error }));
            })
            .catch(error => {
                return res.status(500).json({ status: 500, error });
            });
    }

    // get a question by its id
    getQuestionById (req, res) {
        const { questionId } = req.params;
        if (/[0-9]/g.test(questionId) === false || questionId.length > 9 ) {
            return res.status(400).json({ status: 400, message: 'questionId must be an integer or less than nine characters!' });
        }
        // fetch question from database
        db.any('SELECT * FROM questions WHERE id = $1', [questionId])
        .then(question => {
            // if question array is empty
            if( question.length < 1){
                return res.status(404).json({ status: 404, message: 'question does not exist'});
            }
            // return questions answers
            db.any('SELECT * FROM answers WHERE questionId = $1', [questionId])
            .then(answers => {
                return res.status(200).json({ status: 200, question, answers });
            })
            .catch(error => {
                return res.status(500).json({ status: 500, error });
            });
        })
        .catch(error => {
            return res.status(500).json({ status: 500, error });
        }); 
    }

    getUsersQuestions (req, res) {
        const { username } = req.params;
        const usernameCheck = (/^[a-zA-Z0-9]+(([_][a-zA-Z0-9])?[a-zA-Z0-9]*)*$/g).test(username);
        if (usernameCheck !== true) {
            return res.status(400).json({ status: 400, message: 'username parameter is an invalid format!' });
        }
        db.any('SELECT * FROM questions WHERE username = $1', [ username ])
        .then(questions => {
            if (questions.length < 1) {
                return res.status(404).json({ status: 404, message: 'questions not found!' });
            }
            return res.status(200).json({ status: 200, questions });
        })
        .catch(error => res.status(500).json({ status: 500, error }));
    }

    // post answers
    postAnswer (req, res) {
        const { id, username } = req.userData;
        const { answer } = req.body;
        const { questionId } = req.params;
        if (/[0-9]/g.test(questionId) === false || questionId.length > 9) {
            return res.status(400).json({ status: 400, message: 'questionId must be an integer or less than nine characters!' });
        }
        if (!answer || answer.trim() === '') {
            return res.status(400).json({ status: 400, message: 'invalid or empty answer property!' });
        }
        // fetch id of question creator
        db.any('SELECT * FROM questions WHERE id = $1', [questionId])
        .then(question => {
            const creatorId = question[0].userid;
            db.any('INSERT INTO answers (answer, questionid, username, creator_id, userid) VALUES ($1, $2, $3, $4, $5)', [answer, questionId, username, creatorId, id])
                .then(() => {
                    db.any('UPDATE users SET answered_count = answered_count + $1 WHERE id = $2', [1 ,id])
                    .then(() => {
                        db.any('UPDATE questions SET answers_count = answers_count + $1 WHERE id = $2', [1, questionId])
                        .then(() => res.status(201).json({ status: 201, message: 'answer posted!' }))
                        .catch(error => res.status(500).json({ status: 500, error }));
                    })
                    .catch(error => res.status(500).json({ status: 500, error }));
                })
                .catch(error => res.status(500).json({ status: 500, error }));
        })
        .catch(error => {
                return res.status(500).json({ status: 500, error });
        });
    }

    // mark favorite or update answer
    markFavorite (req, res) {
        const { questionId, answerId } = req.params;
        const { id } = req.userData;
        if (/[0-9]/g.test(questionId) === false || questionId.length > 9) {
            return res.status(400).json({ status: 400, message: 'questionId must be an integer or less than nine characters!' });
        }
        if (/[0-9]/g.test(answerId) === false) {
            return res.status(400).json({ status: 400, message: 'answerId must be an integer or less than nine characters!' });
        }
        
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
                        .then(() => {
                            return res.status(200).json({ status: 200, message: 'answer was favorited!' });
                         })
                        .catch(error => res.status(500).json({ status: 500, error }));
                    }

                    // if there is a 
                    
                    // if answer was already favorited
                    else if (result[0].id === Number(answerId)) {
                        db.any('UPDATE answers SET favorite = $1 WHERE questionId = $2 AND id = $3', [false, questionId, answerId])
                        .then(() => {
                            return res.status(200).json({ status: 200, message: 'answer was unfavorited!' });
                        })
                        .catch(error => res.status(500).json({ status: 500, message: error }));
                    }
                    else {
                        // set old favorite to false
                        db.any('UPDATE answers SET favorite = $1 WHERE questionid = $2 AND favorite = $3', [false, questionId, true])
                        .then(() => {
                            // set the new favorite to true
                            db.any('UPDATE answers SET favorite = $1 WHERE questionid = $2 AND id = $3', [true, questionId, answerId])
                            .then(() => {
                                return res.status(200).json({ status: 200, message: 'answer was favorited!' });
                            })
                            .catch(error => res.status(500).json({ status: 500, error }));
                        })
                        .catch(error => res.status(500).json({ status: 500, error }));
                    }
                })
                .catch(error => res.status(500).json({ status: 500, error }));
            }

            // if route is accessed by answer creator
            if (answer[0].userid === id) {
                const { newAnswer } = req.body;
                // update answer
                db.any('UPDATE answers SET answer = $1 WHERE questionid = $2 AND id = $3', [newAnswer, questionId, answerId])
                .then(() => {
                    return res.status(201).json({ status: 201, message:  'answer updated!' });
                })
                .catch(error => error);
            }
            if (answer[0].userid !== id && answer[0].creator_id !== id) {                
                return res.status(400).json({ status: 400, message: 'You do no have access to this' });
            }
        })
        .catch(error => res.status(500).json({ status: 500, error }));
    }

    // delete a question
    deleteQuestion (req, res) {
        const { questionId } = req.params;
        const { id } = req.userData;
        if (/[0-9]/g.test(questionId) === false) {
            return res.status(400).json({ status: 400, message: 'questionId must be an integer or less than nine characters!' });
        }
        db.any('SELECT * FROM questions WHERE id = $1', [questionId])
        .then(question => {
            if (question.length < 1) {
                return res.status(404).json({ status: 404, message: 'question does not exist' });
            }
            // check if user trying to delete question is the user that created the question
            if (question[0].userid === id) {
                // delete question
                db.any('DELETE FROM questions WHERE id = $1', [questionId])
                .then(() => {
                    return res.status(200).json({ status: 200, message: 'question deleted!' });
                })
                .catch(error => {
                    return res.status(500).json({ status: 500, error });
                });
            }else{
                // if user trying to delete the question is not the user that created the question
                return res.status(400).json({ status: 400, message: 'You do not have the permission to delete this question!' });
            }
        })
        .catch(error => {
            return res.status(500).json({ status: 500, error });
        });
    }

    // like an answer
    likeAnswer (req, res) {
        const { answerId } = req.params;
        const { username } = req.userData
        if (/[0-9]/g.test(answerId) === false) {
            return res.status(400).json({ status: 400, message: 'answerId must be an integer or less than nine characters!' });
        }
        db.any('SELECT likes FROM answers WHERE id = $1', [answerId])
        .then(likes => {
            const likers = likes[0].likes;

            const removeFromDislikers = (username, answerId) => {
                db.any('SELECT dislikes FROM answers WHERE id = $1', [answerId])
                .then(dislikes => {
                    const dislikers = dislikes[0].dislikes;
                    if (dislikers !== null && dislikers.indexOf(username) !== -1) {
                        const newDislikers = dislikers.filter(disliker => disliker !== username);
                        db.any('UPDATE answers SET dislikes = $1 WHERE id = $2', [newDislikers, answerId])
                        .then(() => res.status(200).json({ status: 200, message: 'answer liked!' }))
                        .catch(error => res.status(500).json({ status: 500, error }));
                    }else{
                        return res.status(200).json({ status: 200, message: 'answer liked!' });
                    }
                })
                .catch(error => res.status(500).json({ status: 500, error }));
            };

            if (likers === null) {
                db.any('UPDATE answers SET likes = $1 WHERE id = $2', [[username], answerId])
                .then(() => removeFromDislikers(username, answerId))
                .catch(error => res.status(500).json({ status: 500, error }));
            }
            else if (likers.indexOf(username) === -1) {
                const newLikes = [...likers, username];
                db.any('UPDATE answers SET likes = $1 WHERE id = $2', [newLikes, answerId])
                .then(() => removeFromDislikers(username, answerId))
                .catch(error => res.status(500).json({ status: 500, error }));
            }
            else{
                const editLikers = likers.filter(liker => liker !== username);
                db.any('UPDATE answers SET likes = $1 WHERE id = $2', [editLikers, answerId])
                .then(() => res.status(200).json({ status: 200, message: 'answer unliked!' }))
                .catch(error => res.status(500).json({ status: 500, error }));
            }
        })
        .catch(error => res.status(500).json({ status: 500, error }));
    }

    // dislike answer
    dislikeAnswer (req, res) {
        const { answerId } = req.params;
        const { username } = req.userData
        if (/[0-9]/g.test(answerId) === false) {
            return res.status(400).json({ status: 400, message: 'answerId must be an integer or less than nine characters!' });
        }
        db.any('SELECT dislikes FROM answers WHERE id = $1', [answerId])
        .then(dislikes => {
            const dislikers = dislikes[0].dislikes;

            const removeFromLikers = (username, answerId) => {
                db.any('SELECT likes FROM answers WHERE id = $1', [answerId])
                .then(likes => {
                    const likers = likes[0].likes;
                    if (likers !== null && likers.indexOf(username) !== -1) {
                        const newLikers = likers.filter(liker => liker !== username);
                        db.any('UPDATE answers SET likes = $1 WHERE id = $2', [newLikers, answerId])
                        .then(() => res.status(200).json({ status: 200, message: 'answer disliked!' }))
                        .catch(error => res.status(500).json({ status: 500, error }));
                    }else{
                        return res.status(200).json({ status: 200, message: 'answer disliked!' });
                    }
                })
                .catch(error => res.status(500).json({ status: 500, error }));
            };

            if (dislikers === null) {
                db.any('UPDATE answers SET dislikes = $1 WHERE id = $2', [[username], answerId])
                .then(() => removeFromLikers(username, answerId))
                .catch(error => res.status(500).json({ status: 500, error }));
            }
            else if (dislikers.indexOf(username) === -1) {
                const newDislikers = [...dislikers, username];
                db.any('UPDATE answers SET dislikes = $1 WHERE id = $2', [newDislikers, answerId])
                .then(() => removeFromLikers(username, answerId))
                .catch(error => res.status(500).json({ status: 500, error }));
            }
            else{
                const editDislikers = dislikers.filter(disliker => disliker !== username);
                db.any('UPDATE answers SET dislikes = $1 WHERE id = $2', [editDislikers, answerId])
                .then(() => res.status(200).json({ status: 200, message: 'answer undisliked!' }))
                .catch(error => res.status(500).json({ status: 500, error }));
            }
        })
        .catch(error => res.status(500).json({ status: 500, error }));
    }
    
}
