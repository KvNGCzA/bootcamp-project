import { db } from '../db';
import { removeFromDislikers, removeFromLikers } from '../utils/utils';

export class Questions {
    
	// fetch all questions
	fetchQuestions (req, res) {
        db.tx(t => {
            const questions = t.any('SELECT * FROM questions ORDER BY created_at DESC');
            const questions1 = t.any('SELECT * FROM questions WHERE answers_count > 0 ORDER BY ARRAY_LENGTH(likes, 1) DESC NULLS LAST, answers_count DESC');
            return t.batch([ questions, questions1 ]);
        })
        .then(questions => res.status(200).json({ status: 200, questions }))
        .catch(error =>  res.status(404).json({ status: 404, error }));
    }
    
    // post a question
    postQuestion (req, res) {
        const { id, username } = req.userData;
        const { title, content, tags } = req.body;
        db.tx(t => {
            const q1 =  t.any('INSERT INTO questions (title, content, username, userId, tags) VALUES ($1, $2, $3, $4, $5)', [title, content, username, id, tags]);
            const q2 = t.none('UPDATE users SET asked_count = asked_count + $1 WHERE id = $2', [1 ,id] );
            return t.batch([q1, q2]);
        })
        .then(() => res.status(201).json({ status: 201, message: 'question posted!' }))
        .catch(error => res.status(500).json({ status: 500, error }));
    }

    // get a question by its id
    getQuestionById (req, res) {
        const { questionId } = req.params;
        // fetch question from database
        db.tx(t => {
            const q1 = t.any('SELECT * FROM questions WHERE id = $1', [questionId]);
            const q2 = t.any('SELECT * FROM answers WHERE questionId = $1 ORDER BY ARRAY_LENGTH(likes, 1) DESC NULLS LAST, created_at ASC', [questionId]);
            return t.batch([q1, q2]);
        })
        .then(data => {
            const question = data[0];
            const answers = data[1];
            if (question.length < 1) {
                return res.status(404).json({ status: 404, message: 'question does not exist'});
            }
            return res.status(200).json({ status: 200, question, answers });
        })
        .catch(error => res.status(500).json({ status: 500, error }));
    }

    getUsersQuestions (req, res) {
        const { username } = req.params;
        db.tx(t => {
            const questions = t.any('SELECT * FROM questions WHERE username = $1 ORDER BY created_at DESC', [ username ]);
            const questions1 = t.any('SELECT * FROM questions WHERE username = $1 AND answers_count > 0 ORDER BY answers_count DESC', [ username ]);
            return t.batch([ questions, questions1 ]);
        })
        .then(questions => {
            if (questions[0].length < 1) {
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
        // fetch id of question creator
        db.any('SELECT * FROM questions WHERE id = $1', [questionId])
        .then(question => {
            const creatorId = question[0].userid;
            if (question.length > 0) {
                db.tx(t => {
                    const q1 = t.any('INSERT INTO answers (answer, questionid, username, creator_id, userid) VALUES ($1, $2, $3, $4, $5)', [answer, questionId, username, creatorId, id]);
                    const q2 =  t.none('UPDATE users SET answered_count = answered_count + $1 WHERE id = $2', [1 ,id]);
                    const q3 = t.none('UPDATE questions SET answers_count = answers_count + $1 WHERE id = $2', [1 ,questionId]);
                    return;
                })
                .then(() => res.status(201).json({ status: 201, message: 'answer posted!' }))
                .catch(error => res.status(500).json({ status: 500, error }));
            } else {
                return res.status(404).json({ status: 404, message: 'question does not exist' });
            }
        })
        .catch(error => res.status(500).json({ status: 500, error }));
    }

    // mark favorite or update answer
    markFavorite (req, res) {
        const { questionId, answerId } = req.params;
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
                        db.none('UPDATE answers SET favorite = $1 WHERE questionid = $2 AND id = $3', [true, questionId, answerId])
                        .then(() => res.status(200).json({ status: 200, message: 'answer was favorited!' }))
                        .catch(error => res.status(500).json({ status: 500, error }));
                    }// if answer was already favorited
                    else if (result[0].id === Number(answerId)) {
                        db.none('UPDATE answers SET favorite = $1 WHERE questionId = $2 AND id = $3', [false, questionId, answerId])
                        .then(() => {
                            return res.status(200).json({ status: 200, message: 'answer was unfavorited!' });
                        }).catch(error => res.status(500).json({ status: 500, message: error }));
                    } else {
                        // set old favorite to false
                        db.none('UPDATE answers SET favorite = $1 WHERE questionid = $2 AND favorite = $3', [false, questionId, true])
                        .then(() => {
                            // set the new favorite to true
                            db.none('UPDATE answers SET favorite = $1 WHERE questionid = $2 AND id = $3', [true, questionId, answerId])
                            .then(() => res.status(200).json({ status: 200, message: 'answer was favorited!' }))
                            .catch(error => res.status(500).json({ status: 500, error }));
                        }).catch(error => res.status(500).json({ status: 500, error }));
                    }
                }).catch(error => res.status(500).json({ status: 500, error }));
            }// if route is accessed by answer creator
            if (answer[0].userid === id) {
                const { newAnswer } = req.body;
                // update answer
                db.none('UPDATE answers SET answer = $1 WHERE questionid = $2 AND id = $3', [newAnswer, questionId, answerId])
                .then(() => {
                    return res.status(201).json({ status: 201, message:  'answer updated!' });
                })
                .catch(error => error);
            } if (answer[0].userid !== id && answer[0].creator_id !== id) {                
                return res.status(400).json({ status: 400, message: 'You do no have access to this' });
            }
        }).catch(error => res.status(500).json({ status: 500, error }));
    }

    // delete a question
    deleteQuestion (req, res) {
        const { questionId } = req.params;
        const { id } = req.userData;
        db.any('SELECT * FROM questions WHERE id = $1', [questionId])
        .then(question => {
            if (question.length < 1) {
                return res.status(404).json({ status: 404, message: 'question does not exist' });
            }
            // check if user trying to delete question is the user that created the question
            if (question[0].userid === id) {
                // delete question
                db.any('DELETE FROM questions WHERE id = $1', [questionId])
                .then(() => res.status(200).json({ status: 200, message: 'question deleted!' }))
                .catch(error => res.status(500).json({ status: 500, error }));
            } else {
                // if user trying to delete the question is not the user that created the question
                return res.status(400).json({ status: 400, message: 'You do not have the permission to delete this question!' });
            }
        }).catch(error => res.status(500).json({ status: 500, error }));
    }

    // like a question
    likeQuestion (req, res) {
        const { questionId } = req.params;
        const { username } = req.userData;
        db.any('SELECT likes FROM questions WHERE id = $1', [questionId])
        .then(likes => {
            const likers = likes[0].likes;
            if (likers === null) {
                db.none('UPDATE questions SET likes = $1 WHERE id = $2', [[username], questionId])
                .then(() => removeFromDislikers(req, res, username, questionId, 'questions', 'question'))
                .catch(error => res.status(500).json({ status: 500, error: 'main like 1' }));
            } else if (likers.indexOf(username) === -1) {
                const newLikes = [...likers, username];
                db.none('UPDATE questions SET likes = $1 WHERE id = $2', [newLikes, questionId])
                .then(() => removeFromDislikers(req, res, username, questionId, 'questions', 'question'))
                .catch(error => res.status(500).json({ status: 500, error: 'main like 2' }));
            } else {
                const editLikers = likers.filter(liker => liker !== username);
                db.none('UPDATE questions SET likes = $1 WHERE id = $2', [editLikers, questionId])
                .then(() => res.status(200).json({ status: 200, message: 'question unliked!' }))
                .catch(error => res.status(500).json({ status: 500, error: 'main like 3' }));
            }
        }).catch(error => res.status(500).json({ status: 500, error: 'main like 4' }));
    }

    // dislike question
    dislikeQuestion (req, res) {
        const { questionId } = req.params;
        const { username } = req.userData;
        db.any('SELECT dislikes FROM questions WHERE id = $1', [questionId])
        .then(dislikes => {
            const dislikers = dislikes[0].dislikes;
            if (dislikers === null) {
                db.none('UPDATE questions SET dislikes = $1 WHERE id = $2', [[username], questionId])
                .then(() => removeFromLikers(req, res, username, questionId, 'questions', 'question'))
                .catch(error => res.status(500).json({ status: 500, error }));
            } else if (dislikers.indexOf(username) === -1) {
                const newDislikers = [...dislikers, username];
                db.none('UPDATE questions SET dislikes = $1 WHERE id = $2', [newDislikers, questionId])
                .then(() => removeFromLikers(req, res, username, questionId, 'questions', 'question'))
                .catch(error => res.status(500).json({ status: 500, error }));
            } else {
                const editDislikers = dislikers.filter(disliker => disliker !== username);
                db.none('UPDATE questions SET dislikes = $1 WHERE id = $2', [editDislikers, questionId])
                .then(() => res.status(200).json({ status: 200, message: 'question undisliked!' }))
                .catch(error => res.status(500).json({ status: 500, error }));
            }
        }).catch(error => res.status(500).json({ status: 500, error }));
    }

    // like an answer
    likeAnswer (req, res) {
        const { answerId } = req.params;
        const { username } = req.userData;
        db.any('SELECT likes FROM answers WHERE id = $1', [answerId])
        .then(likes => {
            const likers = likes[0].likes;
            if (likers === null) {
                db.none('UPDATE answers SET likes = $1 WHERE id = $2', [[username], answerId])
                .then(() => removeFromDislikers(req, res, username, answerId, 'answers', 'answer'))
                .catch(error => res.status(500).json({ status: 500, error }));
            } else if (likers.indexOf(username) === -1) {
                const newLikes = [...likers, username];
                db.none('UPDATE answers SET likes = $1 WHERE id = $2', [newLikes, answerId])
                .then(() => removeFromDislikers(req, res, username, answerId, 'answers', 'answer'))
                .catch(error => res.status(500).json({ status: 500, error }));
            } else {
                const editLikers = likers.filter(liker => liker !== username);
                db.none('UPDATE answers SET likes = $1 WHERE id = $2', [editLikers, answerId])
                .then(() => res.status(200).json({ status: 200, message: 'answer unliked!' }))
                .catch(error => res.status(500).json({ status: 500, error }));
            }
        }).catch(error => res.status(500).json({ status: 500, error }));
    }

    // dislike answer
    dislikeAnswer (req, res) {
        const { answerId } = req.params;
        const { username } = req.userData;
        db.any('SELECT dislikes FROM answers WHERE id = $1', [answerId])
        .then(dislikes => {
            const dislikers = dislikes[0].dislikes;
            if (dislikers === null) {
                db.none('UPDATE answers SET dislikes = $1 WHERE id = $2', [[username], answerId])
                .then(() => removeFromLikers(req, res, username, answerId, 'answers', 'answer'))
                .catch(error => res.status(500).json({ status: 500, error }));
            } else if (dislikers.indexOf(username) === -1) {
                const newDislikers = [...dislikers, username];
                db.none('UPDATE answers SET dislikes = $1 WHERE id = $2', [newDislikers, answerId])
                .then(() => removeFromLikers(req, res, username, answerId, 'answers', 'answer'))
                .catch(error => res.status(500).json({ status: 500, error }));
            } else {
                const editDislikers = dislikers.filter(disliker => disliker !== username);
                db.none('UPDATE answers SET dislikes = $1 WHERE id = $2', [editDislikers, answerId])
                .then(() => res.status(200).json({ status: 200, message: 'answer undisliked!' }))
                .catch(error => res.status(500).json({ status: 500, error }));
            }
        }).catch(error => res.status(500).json({ status: 500, error }));
    }
    
}
