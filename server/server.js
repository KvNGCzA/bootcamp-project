import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';

import questionRoutes from './routes/questions';
import userRoutes from './routes/users';
import postgresQuestionRoutes from './routes/sqlquestion';

const port = process.env.PORT || 3000;

// start express server
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

// questions api route
app.use('/api/v1/questions', questionRoutes);
app.use('/api/v2/auth', userRoutes);
app.use('/api/v2/questions', postgresQuestionRoutes);

// link to static directory
app.use(express.static(path.join(__dirname, '..', '..', 'public')));


// error codes
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
      status: error.status
    }
  });
});

app.listen(port, () => {
    console.log(`server is up on port ${port}`);
});

export default app;
