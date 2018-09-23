const commentForm = document.getElementsByClassName('comment-form')[0];
const postAnswer = (_e) => {
	_e.preventDefault();
	const token = localStorage.getItem('token');
	const newAnswer = {
		answer: commentForm.answer.value,
		token,
	};
	const questionId = window.location.search.split('=')[1];
	fetch(`https://safe-inlet-99347.herokuapp.com/api/v2/questions/${questionId}/answers`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(newAnswer),
	})
	.then(res => res.json())
	.then((data) => {
		const successAnswer = document.getElementById('success-answer');
		const { message } = data;
		successAnswer.textContent = message;
		commentForm.answer.value = '';
		if (message === 'answer posted!') {
			successAnswer.style.color = 'green';
			return setTimeout(() => {
				document.location.reload();
			}, 1000);
		} 
			successAnswer.style.color = '#f24d4d';
		
	})
	.catch(error => error);
};

const questionId = window.location.search.split('=')[1];
const favoriteAnAnswer = (id) => {
const token = localStorage.getItem('token');
fetch(`https://safe-inlet-99347.herokuapp.com/api/v2/questions/${questionId}/answers/${id}`, {
    method: 'PUT',
    headers: {
         Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token }),
})
.then(res => res.json())
.then(data => {
        document.location.reload();
})
.catch(error => error);
};

const likeAnswer = (id) => {
    fetch(`https://safe-inlet-99347.herokuapp.com/api/v2/questions/answers/${id}/like`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token })
    })
    .then(res => res.json())
    .then(() => window.location.reload())
    .catch(error => console.log(error));
};

const dislikeAnswer = (id) => {
	const token = localStorage.getItem('token');
    fetch(`https://safe-inlet-99347.herokuapp.com/api/v2/questions/answers/${id}/dislike`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token })
    })
    .then(res => res.json())
    .then(data => window.location.reload())
    .catch(error => console.log(error));
};

if (document.getElementsByTagName('body')[0].classList.contains('page-question')) {
	commentForm.addEventListener('submit', postAnswer, false);
}