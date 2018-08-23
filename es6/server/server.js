import express from 'express';
import bodyParser from 'body-parser';
import hbs from 'hbs';
import morgan from 'morgan';
import path from 'path';

import questionRoutes from './routes/questions';
import loginRoute from './routes/login';
import signupRoute from './routes/signup';

const port = process.env.PORT || 3000;

// start express server
const app = express();


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
app.use('/auth/login', loginRoute);
app.use('/auth/signup', signupRoute);


// link to static directory
app.use(express.static(path.join(__dirname, '..', '..', 'public')));

// register hbs partials
hbs.registerPartials(path.join(__dirname, '..', '..', 'views', 'partials'));

// register hbs helper
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());

// enable hbs
app.set('view engine', 'hbs');

app.get('/', (req, res, next) => {
    res.render('index.hbs', {
        pageTitle: 'Home'
    });
});

app.get('/profile', (req, res, next) => {
    res.render('profile.hbs', {
        pageTitle: 'Profile'
    });
});

app.get('/question', (req, res, next) => {
    res.render('question.hbs', {
        pageTitle: 'Question'
    });
});

app.get('/post-question', (req, res, next) => {
    res.render('post-question.hbs', {
        pageTitle: 'Post A Question'
    });
});

app.get('/login-signup', (req, res, next) => {
    res.render('login-signup.hbs', {
        pageTitle: 'Login-SignUp'
    });
});

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

if (!module.parent) {
    app.listen(port, () => {
        console.log(`server is up on port ${port}`);
    });
}

export default app;
