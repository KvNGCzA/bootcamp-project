const signupForm = document.getElementById('su-form');

const createUser  = (e) => {
    e.preventDefault();
    const newUser = {};
   
    newUser.firstName = signupForm.fname.value;
    newUser.lastName = signupForm.lname.value;
    newUser.password = signupForm.pwd.value;
    newUser.email = signupForm.email.value;
    newUser.username = signupForm.username.value;

    fetch('http://localhost:3000/api/v2/auth/signup', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    }).then((res) => {
        return res.json();
      }).then(data => {
          const token = data.token;
        console.log(data.token);   
        localStorage.setItem('token', token);
        // window.location.href = './profile.html';
      })
      .catch((err) => console.log(err))
  };

signupForm.addEventListener('submit', createUser, false);
