'use strict';

var x = 0;
var allQuestionForms = document.getElementsByClassName('postquestionform');
if (allQuestionForms.length > 1) {
    x = 1;
}
var questionForms = document.getElementsByClassName('postquestionform')[x];
var postQuestion = function postQuestion(_e) {
    _e.preventDefault();
    var token = localStorage.getItem('token');
    var newQuestion = {
        title: questionForms.title.value,
        content: questionForms.content.value,
        tags: questionForms.tags.value,
        token: token
    };
    fetch('http://localhost:3000/api/v2/questions', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newQuestion)
    }).then(function (res) {
        return res.json();
    }).then(function (data) {
        var successMessage = document.getElementsByClassName('postQuestion-success-message')[x];
        if (data.message === 'question posted!') {
            successMessage.style.display = 'block';
            questionForms.title.value = '';
            questionForms.content.value = '';
            questionForms.tags.value = '';
        } else {
            successMessage.textContent = data.message;
        }
        return;
    })['catch'](function (error) {
        return console.log(error);
    });
}; // post a question function


questionForms.addEventListener('submit', postQuestion, false);