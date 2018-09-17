import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    try{
        const token = req.headers['x-access-token'] || req.body.token;
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({
            message: 'User Not logged in!'
        });
    }
}