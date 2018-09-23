const body = document.getElementsByTagName('body')[0];
if (body.classList.contains('page-login-signup')) {
  const signupForm = document.getElementById('su-form');
  const createUser = (_e) => {
    _e.preventDefault();
    const warning = document.getElementById('warning-message');
    let newUser = new FormData();
    let propArr = ['firstName', 'lastName', 'occupation', 'password', 'email', 'username', 'profileImage'];
    let valueArr = [signupForm.fname.value, signupForm.lname.value, signupForm.occupation.value, signupForm.pwd.value, signupForm.email.value, signupForm.username.value, signupForm.profileImage.files[0]];
    for (let x in propArr) { newUser.append(propArr[x], valueArr[x]);}
    fetch('https://safe-inlet-99347.herokuapp.com/api/v2/auth/signup', {
      method: 'POST',
      body: newUser,
    }).then(res => {
      return res.json();
    }).then(data => {
      const message = data.message;
      if (message === 'user created') {
        const { username, profileimage } = data.profile;
        const { token } = data;
        localStorage.setItem('username', username);
        localStorage.setItem('profileimage', profileimage);
        localStorage.setItem('token', token);
        window.location.href = `./profile?username=${username}`;
        return;
      }return warning.textContent = message;
    }).catch(err => err);
  };
  signupForm.addEventListener('submit', createUser, false);
  
  const loginForm = document.getElementById('lg-form');
  const loginUser = (_e) => {
    _e.preventDefault();
    const warning = document.getElementById('warning-message2');
    const user = { email: loginForm.email.value, password: loginForm.pwd.value };
    fetch('https://safe-inlet-99347.herokuapp.com/api/v2/auth/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    .then(res => res.json())
    .then(data => {
      const message = data.message;
      if (message === "successfully logged in!") {
        const { username, profileimage } = data.profile;
        const { token } = data;
        localStorage.setItem('username', username);
        localStorage.setItem('profileimage', profileimage);
        localStorage.setItem('token', token);
        window.location.href = `./profile?username=${username}`;
        return;
      } return warning.textContent = 'username/password do not match';
    }).catch(error => error);
  };
  loginForm.addEventListener('submit', loginUser, false);
}

const logout = document.getElementsByClassName('logout');
const logoutUser = () => {
  fetch('https://safe-inlet-99347.herokuapp.com/api/v2/auth/logout', {
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
    location.reload();
  })
  .catch(error => error);
};

for (let x = 0; x < logout.length; x++) {
	logout[x].addEventListener('click', logoutUser, false);
}