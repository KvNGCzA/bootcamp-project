'use strict';

var questionForms = document.getElementsByClassName('postquestionform');

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
        var successMessage = document.getElementsByClassName('postQuestion-success-message')[0];
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

for (var x = 0; x < questionForms.length; x++) {
    questionForms[x].addEventListener('submit', postQuestion, false);
}