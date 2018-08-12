const express = require('express');
const hbs = require('hbs');

let port = process.env.PORT || 3000;

let app = express();
app.use(express.static(__dirname + '/public'));

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear',() => {
    return new Date().getFullYear();
});

app.set('view engine', 'hbs');

let pagesArr = ['Home', 'Profile', 'Question', 'Post A Question', 'Login/SignUp'];

app.get('/', (req, res) => {
    res.render('index.hbs',{
        pageTitle: pagesArr[0]
    });
});

app.get('/profile', (req, res) => {
    res.render('profile.hbs',{
        pageTitle: pagesArr[1]
    });
});

app.get('/question', (req, res) => {
    res.render('question.hbs',{
        pageTitle: pagesArr[2]
    });
});


app.get('/post-question', (req, res) => {
    res.render('post-question.hbs',{
        pageTitle: pagesArr[3]
    });
});

app.get('/login-signup', (req, res) => {
    res.render('login-signup.hbs',{
        pageTitle: pagesArr[4]
    });
});

app.listen(port, () => {
    console.log(`server is up on port ${port}`);

});
