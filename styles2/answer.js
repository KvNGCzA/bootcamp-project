const token = localStorage.getItem('token');
const questionId = window.location.search.split('=')[1];
const favoriteAnAnswer = (id) => {
fetch(`http://localhost:3000/api/v2/questions/${questionId}/answers/${id}`, {
    method: 'PUT',
    headers: {
         Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token }),
})
.then(res => res.json())
.then(data => {
    console.log(data.message)
    // setTimeout(() => {
        document.location.reload();
    // }, 1000);
})
.catch(error => console.log(error));
};
