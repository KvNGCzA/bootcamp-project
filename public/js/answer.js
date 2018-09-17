'use strict';

var token = localStorage.getItem('token');
var questionId = window.location.search.split('=')[1];
var favoriteAnAnswer = function favoriteAnAnswer(id) {
    fetch('http://localhost:3000/api/v2/questions/' + String(questionId) + '/answers/' + String(id), {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: token })
    }).then(function (res) {
        return res.json();
    }).then(function (data) {
        console.log(data.message);
        // setTimeout(() => {
        document.location.reload();
        // }, 1000);
    })['catch'](function (error) {
        return console.log(error);
    });
};