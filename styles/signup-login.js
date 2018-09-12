import { formatDate } from '../public/js/functions';

const body = document.getElementsByTagName('body')[0];
if (body.classList.contains('page-login-signup')) {
  const signupForm = document.getElementById('su-form');
  
  const createUser = (_e) => {
    _e.preventDefault();
    const warning = document.getElementById('warning-message');
    const newUser = {
      firstName: signupForm.fname.value,
      lastName: signupForm.lname.value,
      occupation: signupForm.occupation.value,
      password: signupForm.pwd.value,
      email: signupForm.email.value,
      username: signupForm.username.value,
    };
    fetch('http://localhost:3000/api/v2/auth/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    }).then(res => {
      return res.json();
    })
    .then(data => {
      const message = data.message;
      if (message === 'user created') {
        const { 
          answered_count,
          asked_count,
          created_at,
          email,
          fullname,
          username,
          occupation
        } = data.profile;
        const { token } = data;
        const newDate = formatDate(created_at);
        localStorage.setItem('fullname', fullname);
        localStorage.setItem('username', username);
        localStorage.setItem('email', email);
        localStorage.setItem('occupation', occupation);
        localStorage.setItem('answered_count', answered_count);
        localStorage.setItem('asked_count', asked_count);
        localStorage.setItem('created_at', newDate);
        localStorage.setItem('token', token);
        window.location.href = './profile';
        return;
      }
      return warning.textContent = message;
    })
      .catch(err => err);
  };
  
  signupForm.addEventListener('submit', createUser, false);
  
  const loginForm = document.getElementById('lg-form');
  
  const loginUser = (_e) => {
    _e.preventDefault();
    const warning = document.getElementById('warning-message2');
    const user = {
      email: loginForm.email.value,
      password: loginForm.pwd.value,
    };
    fetch('http://localhost:3000/api/v2/auth/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    .then(res => {
      return res.json();
    })
    .then(data => {
      const message = data.message;
      if (message === "successfully logged in!") {
        const {
          id,
          answered_count,
          asked_count,
          created_at,
          email,
          fullname,
          username,
          occupation
        } = data.profile;
        console.log('id', id);
        const { token } = data;
        const newDate = formatDate(created_at);
        localStorage.setItem('fullname', fullname);
        localStorage.setItem('username', username);
        localStorage.setItem('email', email);
        localStorage.setItem('occupation', occupation);
        localStorage.setItem('answered_count', answered_count);
        localStorage.setItem('asked_count', asked_count);
        localStorage.setItem('created_at', newDate);
        localStorage.setItem('token', token);
        window.location.href = './profile';
        return;
      }
      return warning.textContent = 'username/password do not match';
    })
    .catch(error => error);
  };
  
  loginForm.addEventListener('submit', loginUser, false);
  
}
