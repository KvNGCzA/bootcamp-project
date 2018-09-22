export const validatePostQuestion = (req, res, next) => {
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
    return next();
};

export const validateQuestionId = (req, res, next) => {
    const { questionId } = req.params;
    if (/[\D]/g.test(questionId) === true || questionId.length > 9) {
        return res.status(400).json({ status: 400, message: 'questionId must be an integer or less than nine characters!' });
    }
    return next();
};

export const validateAnswerId = (req, res, next) => {
    const { answerId } = req.params;
    if (/[\D]/g.test(answerId) === true || answerId.length > 9) {
        return res.status(400).json({ status: 400, message: 'answerId must be an integer or less than nine characters!' });
    }
    return next();
};

export const validatePostAnswer = (req, res, next) => {
    const { answer } = req.body;
    const { questionId } = req.params;
    if (/[\D]/g.test(questionId) === true || questionId.length > 9) {
        return res.status(400).json({ status: 400, message: 'questionId must be an integer or less than nine characters!' });
    }
    if (!answer || answer.trim() === '') {
        return res.status(400).json({ status: 400, message: 'invalid or empty answer property!' });
    }
    return next();
};

