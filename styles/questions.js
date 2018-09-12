import { formatDate, countClassColours, addTags, deleteButton } from '../public/js/functions';

let formNum = 0;
let allQuestionForms = document.getElementsByClassName('postquestionform');
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
            .catch(error => console.log(error));
        }
        else{
            successMessage.textContent = data.message;
        }
        return;
    })
    .catch(error => console.log(error));
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
        document.getElementById('success-answer').textContent = data.message;
        commentForm.answer.value = '';
    })
    .catch(error => console.log(error));
};
commentForm.addEventListener('submit', postAnswer, false);
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
        document.getElementsByClassName('date-posted')[0].innerHTML = `<span>${formatDate(created_at)}</span> by <span><a href="#">@${username}</a></span>`;
        addTags(tagsArr);        
        countClassColours();
    })
    .catch(error => console.log(error));
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
                <p class="question-title"><a href="/question?id=${id}" class="gotoQ">${title}</a></p>
                <ul class="tags">                    
                </ul>
                    <span class="posted-on">Posted on <a href="#">${newDate}</a> by ${username} </span>
                </div>

             </div><!-- single-question -->`;
            }

            countClassColours();

            addTags(tagsArr);
		})
		.catch(error => console.log(error));
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
    const username = localStorage.getItem('username');
	fetch(`http://localhost:3000/api/v2/questions/${username}/questions`)
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
                    <span class="edit-option" id=""><i class="fas fa-wrench"></i></span>
                    <ul class="drop-settings">
                    <li class="deleteButton"><i class="far fa-trash-alt" title="Delete this question"></i> Delete</li>
                    <li><i class="fas fa-wrench"></i> Edit</li>
                    </ul>
                </div>
                <p class="question-title"><a href="/question?id=${id}">${title}</a></p>
                <ul class="tags">
                </ul>
                    <span class="posted-on">Posted on <a href="#">${newDate}</a> by ${username} </span>
                </div>

             </div><!-- single-question -->`;
            }
            deleteButton(idArr);
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
}
