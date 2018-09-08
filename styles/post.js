let x = 0;
const allQuestionForms = document.getElementsByClassName('postquestionform');
if (allQuestionForms.length > 1) {
    x = 1;
}
const questionForms = document.getElementsByClassName('postquestionform')[x];
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
        const successMessage = document.getElementsByClassName('postQuestion-success-message')[x];
        if (data.message === 'question posted!') {
            successMessage.style.display = 'block';
            questionForms.title.value = '';
            questionForms.content.value = '';
            questionForms.tags.value = '';
        }
        else{
            successMessage.textContent = data.message;
        }
        return;
    })
    .catch(error => console.log(error));
};// post a question function


questionForms.addEventListener('submit', postQuestion, false);
