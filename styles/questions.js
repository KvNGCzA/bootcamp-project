let formNum = 0;
const allQuestionForms = document.getElementsByClassName('postquestionform');
if (allQuestionForms.length > 1) {
	formNum = 1;
}
const questionForms = document.getElementsByClassName('postquestionform')[formNum];
const postQuestion = (_e) => {
	_e.preventDefault();
	const token = localStorage.getItem('token');
	const newQuestion = { title: questionForms.title.value, content: questionForms.content.value, tags: questionForms.tags.value, token };
	fetch('http://localhost:3000/api/v2/questions', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(newQuestion),
	})
	.then(res => res.json())
	.then((data) => {
		const successMessage = document.getElementsByClassName('postQuestion-success-message')[formNum];
		if (data.message === 'question posted!') {
			successMessage.style.display = 'block';
			questionForms.title.value = '';
			questionForms.content.value = '';
			questionForms.tags.value = '';
			if (document.getElementsByTagName('body')[0].classList.contains('page-profile') || document.getElementsByTagName('body')[0].classList.contains('page-home')) {
			location.reload();
			}
		} else {
			successMessage.textContent = data.message;
		}
	})
	.catch(error => error);
};// post a question function
questionForms.addEventListener('submit', postQuestion, false);

const likeQuestion = (questionId) => {
	const token = localStorage.getItem('token');
	fetch(`http://localhost:3000/api/v2/questions/${questionId}/like`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify({ token }),
	})
	.then(res => res.json())
	.then(() => window.location.reload())
	.catch(error => error);
};

const dislikeQuestion = (questionId) => {
	const token = localStorage.getItem('token');
	fetch(`http://localhost:3000/api/v2/questions/${questionId}/dislike`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify({ token })
	})
	.then(res => res.json())
	.then(() => window.location.reload())
	.catch(error => error);
};

const getQuestionById = () => {
	const questionId = window.location.search.split('=')[1];
	fetch(`http://localhost:3000/api/v2/questions/${questionId}`)
		.then(res => res.json())
		.then((data) => {
			const tagsArr = [];
			const { question, answers } = data;
			const {
				id, title, content, tags, created_at, likes, dislikes, username, answers_count,
			} = question[0];
			tagsArr.push([tags.split(',')]);
			renderQuestionMeta_singleQuestion(title, answers_count, likes, dislikes);
			renderQuestionBody_singleQuestion(questionId, content, username, created_at, likes, dislikes);
			addTags(tagsArr);
			countClassColours();
			renderComments_singleQuestion(answers, username);
			actionButtons();
			colorComments();
		})
		.catch(error => error);
}; // get question by id

const getQuestions = () => {
	fetch('http://localhost:3000/api/v2/questions')
		.then(res => res.json())
		.then((data) => {
			const { questions } = data;
			console.log(questions);
			renderQuestionTemplates(questions);
			countClassColours();
		})
		.catch(error => error);
}; // get all quetsions for homepage


const getUsersQuestions = () => {
	const uname = window.location.search.split('=')[1];
	fetch(`http://localhost:3000/api/v2/questions/${uname}/questions`)
		.then(res => res.json())
		.then((data) => {
			const { questions } = data;
            renderUsersQuestions(questions, uname);
            countClassColours();
		})
		.catch(error => error);
}; // get questions for profile page

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
		.then(() => document.location.reload())
		.catch(error => error);
}; // delete a question

if (document.getElementsByTagName('body')[0].classList.contains('page-home')) {
	getQuestions();
}

if (document.getElementsByTagName('body')[0].classList.contains('page-profile')) {
	getUsersQuestions();
}

if (document.getElementsByTagName('body')[0].classList.contains('page-question')) {
	getQuestionById();
}
