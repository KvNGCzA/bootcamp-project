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

app.get('/questions', (req, res) => {
    res.render('questions.hbs',{
        pageTitle: 'Questions'
    });
});

app.listen(port, () => {
    console.log(`server is up on port ${port}`);
    
});