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
        const { username } = data.profile;
        const { token } = data;
        localStorage.setItem('username', username);
        localStorage.setItem('token', token);
        window.location.href = `./profile?username=${username}`;
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
        const { username } = data.profile;
        const { token } = data;
        localStorage.setItem('username', username);
        localStorage.setItem('token', token);
        window.location.href = `./profile?username=${username}`;
        return;
      }
      return warning.textContent = 'username/password do not match';
    })
    .catch(error => error);
  };
  loginForm.addEventListener('submit', loginUser, false);
}

const logout = document.getElementsByClassName('logout');
const logoutUser = () => {
  const token = localStorage.getItem('token');
  fetch('http://localhost:3000/api/v2/auth/logout', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token })
  })
  .then(res => res.json())
  .then(() => {
    localStorage.clear();
    if (currentPageTitle === 'Profile') {
      window.location.href = '/';
    }
    else{
      document.location.reload();
    }
  })
  .catch(error => error);
};

for (let x = 0; x < logout.length; x++) {
	logout[x].addEventListener('click', logoutUser, false);
}