import { formatDate, countClassColours, addTags, colorComments } from '../public/js/functions';

const deleteButtonFunction = (idArr) => {
    const deleteButton = document.getElementsByClassName('deleteButton');
    for ( let x = 0; x < deleteButton.length; x++ ) {
        deleteButton[x].addEventListener('click', () => {
            deleteQuestion(idArr[x]);
        }, false);
    }
}; // deleteButton

let formNum = 0;
const allQuestionForms = document.getElementsByClassName('postquestionform');
if (allQuestionForms.length > 1) {
    formNum = 1;
}
let questionForms = document.getElementsByClassName('postquestionform')[formNum];
const postQuestion = (_e) => {
    _e.preventDefault();
    const token = localStorage.getItem('token');
    const newQuestion = {
        title : questionForms.title.value,
        content: questionForms.content.value,
        tags: questionForms.tags.value,
        token,
    };
    fetch('http://localhost:3000/api/v2/questions', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newQuestion),
    })
    .then(res => {
        return res.json();
      })
    .then(data => {
        const successMessage = document.getElementsByClassName('postQuestion-success-message')[formNum];
        if (data.message === 'question posted!') {
            successMessage.style.display = 'block';
            questionForms.title.value = '';
            questionForms.content.value = '';
            questionForms.tags.value = '';
            fetch('http://localhost:3000/api/v2/auth/users')
            .then(res => {
                return res.json();
            })
            .then(data => {
                const uname = localStorage.getItem('username');
                const allUsers = data.users;
                const getUser = allUsers.filter(user => user.username === uname);
                const { asked_count, answered_count } = getUser[0];
                localStorage.setItem('asked_count', asked_count);
                localStorage.setItem('answered_count', answered_count);
                if (document.title === 'Profile') {
                    document.location.reload();
                }
            })
            .catch(error => error);
        }
        else{
            successMessage.textContent = data.message;
        }
        return;
    })
    .catch(error => error);
};// post a question function
questionForms.addEventListener('submit', postQuestion, false);

const commentForm = document.getElementsByClassName('comment-form')[0];
const postAnswer = (_e) => {
    _e.preventDefault();
    const token = localStorage.getItem('token');
    const newAnswer = {
        answer : commentForm.answer.value,
        token,
    };
    const questionId = window.location.search.split('=')[1];
    fetch(`http://localhost:3000/api/v2/questions/${questionId}/answers`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAnswer),
    })
    .then(res => res.json())
    .then(data => {
        const successAnswer = document.getElementById('success-answer');
        const { message } = data;        
        successAnswer.textContent = message;
        commentForm.answer.value = '';
        if (message === 'answer posted!') {
            successAnswer.style.color = 'green';
            return setTimeout(() => {
                document.location.reload();
            }, 1500);
        }else{
            successAnswer.style.color = '#f24d4d';
        }
    })
    .catch(error => error);
};
const getQuestionById = () => {
    const questionId = window.location.search.split('=')[1];
    fetch(`http://localhost:3000/api/v2/questions/${questionId}`)
    .then(res => res.json())
    .then(data => {
        const tagsArr = [];
        const { question, answers } = data;
        const { title, content, tags, created_at, likes, username, answers_count } = question[0];
        tagsArr.push([tags.split(',')]);
        document.getElementsByClassName('question-title')[0].textContent = title;
        document.getElementsByClassName('q-meta')[0].innerHTML = 
        `<ul>
          <li class="answer-count">
            <a href="#">Answers</a>
            <a href="#" class="answer-count-dis">${answers_count}</a>
          </li><!--
          --><li class="likes-count">
            <a href="#">Likes</a>
            <a href="#" class="likes-count-dis">${likes}</a>
          </li><!--
          --><li class="views-count">
            <a href="#">Views</a>
            <a href="#" class="views-count-dis">0</a>
          </li>
        </ul>`;
        document.getElementsByClassName('question-body')[0].textContent = content;
        document.getElementsByClassName('date-posted')[0].innerHTML = `<span>${formatDate(created_at)}</span> by <span><a href="/profile?username=${username}">@${username}</a></span>`;
        addTags(tagsArr);
        countClassColours();
        const commentsList = document.getElementById('comment-list');
        if (answers.length > 0) {
            for (let x in answers) {
                const { answer } = answers[x];
                commentsList.innerHTML += `
            <li class="comment-cont">
              <p class="comment">${answer}</p>
              <p class="action-buttons">
                <span class="like-comment action like-btn" title="Mark as useful"><i class="far fa-thumbs-up likebutton"></i></span><!--
              --><span class="dislike-comment action dislike-btn" title="Mark as not useful"><i class="far fa-thumbs-down dislikebutton"></i></span><!--
              --><span class="report action report-btn" title="Mark as Inappropriate"><i class="far fa-flag reportbutton"></i></span><!--
              --><span class="favorite-comment action favorite-btn" title="Mark as favorite"><i class="far fa-star favoritebutton"></i></span>
              </p>
            </li>`   
            }            
        }else{
            commentsList.innerHTML += `<li>No answers posted yet</li><br><br>`;
        }
        colorComments();
    })
    .catch(error => error);
}; // get question by id

const getQuestions = () => {
	fetch('http://localhost:3000/api/v2/questions')
		.then(res => res.json())
		.then((data) => {
            const { questions } = data;
            let tagsArr = [];
            let idArr =[];
			for (let x = questions.length - 1; x >= 0; x--) {
                const tab = document.getElementById('tab1');
                const { answers_count, likes, title, created_at, id, username, tags } = questions[x];
                const newDate = formatDate(created_at);
                tagsArr.push([tags.split(',')]);
				tab.innerHTML += `<div class="single-question">
                <div class="q-meta">
                <ul>
                    <li class="answer-count">
                    <a href="#">Answers</a>
                    <a href="#" class="answer-count-dis">${answers_count}</a>
                    </li><!--
                    --><li class="likes-count">
                    <a href="#">Likes</a>
                    <a href="#" class="likes-count-dis">${likes}</a>
                    </li><!--
                    --><li class="views-count">
                    <a href="#">Views</a>
                    <a href="#" class="views-count-dis">0</a>
                    </li>
                </ul>
                </div>

                <div class="q-details">
                <div class="edit-option-container">
                </div>
                <p class="question-title"><a href="/question?id=${id}" class="gotoQ">${title}</a></p>
                <ul class="tags">                    
                </ul>
                    <span class="posted-on">Posted on <a href="#">${newDate}</a> by <a href="/profile?username=${username}">${username}</a> </span>
                </div>

             </div><!-- single-question -->`;
            }            
            countClassColours();
            addTags(tagsArr);
		})
		.catch(error => error);
}; // get all quetsions for homepage

const deleteQuestion = (id) => {
    const token = localStorage.getItem('token');
    fetch(`http://localhost:3000/api/v2/questions/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    })
    .then(res => res.json())
    .then(data => {
        return document.location.reload();
    })
    .catch(error => error);
}; // delete a question

const getUsersQuestions = () => {
    const uname = window.location.search.split('=')[1];
	fetch(`http://localhost:3000/api/v2/questions/${uname}/questions`)
		.then(res => res.json())
		.then(data => {
            const { questions } = data;
            let tagsArr = [];
            let idArr = [];
            for (let x = questions.length - 1; x >= 0; x--) {
                const profilePage = document.getElementsByClassName('profile-page-cont')[0];
                const { answers_count, likes, title, created_at, username, tags, id } = questions[x];
                tagsArr.push([tags.split(',')]);
                idArr.push(id);
				const newDate = formatDate(created_at);
				profilePage.innerHTML += `<div class="single-question">
                <div class="q-meta">
                <ul>
                    <li class="answer-count">
                    <a href="#">Answers</a>
                    <a href="#" class="answer-count-dis">${answers_count}</a>
                    </li><!--
                    --><li class="likes-count">
                    <a href="#">Likes</a>
                    <a href="#" class="likes-count-dis">${likes}</a>
                    </li><!--
                    --><li class="views-count">
                    <a href="#">Views</a>
                    <a href="#" class="views-count-dis">0</a>
                    </li>
                </ul>
                </div>

                <div class="q-details">
                <div class="edit-option-container">
                </div>
                <p class="question-title"><a href="/question?id=${id}">${title}</a></p>
                <ul class="tags">
                </ul>
                    <span class="posted-on">Posted on <a href="#">${newDate}</a> by ${username} </span>
                </div>

             </div><!-- single-question -->`;
            }
            if (uname === localStorage.getItem('username')) {
                const edit = document.getElementsByClassName('edit-option-container')
                for(let x = 0; x < edit.length; x++) {
                    edit[x].innerHTML = `<span class="edit-option" id=""><i class="fas fa-wrench"></i></span>
                    <ul class="drop-settings">
                    <li class="deleteButton"><i class="far fa-trash-alt" title="Delete this question"></i> Delete</li>
                    <li><i class="fas fa-wrench"></i> Edit</li>
                    </ul>`;
                }
                deleteButtonFunction(idArr);
            }
            countClassColours();
            addTags(tagsArr);
		})
		.catch(error => error);
}; // get questions for profile page


if (document.title === 'Home') {
	getQuestions();
}

if (document.title === 'Profile') {
    getUsersQuestions();
}

if (document.title === 'Question') {
    getQuestionById();    
    commentForm.addEventListener('submit', postAnswer, false);
}
