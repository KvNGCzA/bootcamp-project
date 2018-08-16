import express from 'express';
import bodyParser from 'body-parser';
import hbs from 'hbs';
import morgan from 'morgan';

import questionRoutes from '../api/routes/questions';

let port = process.env.PORT || 3000;

/**start express server*/
let app = express();


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  if( req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});
/** questions api route*/
app.use('/api/v1/questions', questionRoutes);

/** link to static directory*/
app.use(express.static(__dirname + '../../public'));

/**register hbs partials*/
hbs.registerPartials(__dirname + '../../views/partials');
/**register hbs helper*/
hbs.registerHelper('getCurrentYear',() => {
    return new Date().getFullYear();
});
/**enable hbs*/
app.set('view engine', 'hbs');



app.get('/', (req, res) => {
    res.render('index.hbs',{
        pageTitle: 'Home'
    });
});

app.get('/profile', (req, res) => {
    res.render('profile.hbs',{
        pageTitle: 'Profile'
    });
});

app.get('/question', (req, res) => {
    res.render('question.hbs',{
        pageTitle: 'Question'
    });
});

app.get('/post-question', (req, res) => {
    res.render('post-question.hbs',{
        pageTitle: 'Post A Question'
    });
});

app.get('/login-signup', (req, res) => {
    res.render('login-signup.hbs',{
        pageTitle: 'Login-SignUp'
    });
});

/**error codes*/
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error:{
      message: error.message
    }
  });
});

export {app};

app.listen(port, () => {
    console.log(`server is up on port ${port}`);
});
