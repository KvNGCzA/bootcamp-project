const signupForm = document.getElementById('su-form');

const createUser = (_e) => {
	_e.preventDefault();
	const newUser = {
		firstName: signupForm.fname.value,
		lastName: signupForm.lname.value,
		password: signupForm.pwd.value,
		email: signupForm.email.value,
		username: signupForm.username.value,
	};

	fetch('http://localhost:3000/api/v2/auth/signup', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(newUser),
	}).then(res => {
		return res.json();	
  })
  .then(data => {
    const { answered_count, asked_count, created_at, email, fullname, username } = data.profile;
    const { token } = data;
    localStorage.setItem('fullname', fullname);
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
    localStorage.setItem('answered_count', answered_count);
    localStorage.setItem('asked_count', asked_count);
    localStorage.setItem('created_at', created_at);
    localStorage.setItem('token', token);
		// window.location.href = './profile.html';
  })
		.catch(err => console.log(err));
};

signupForm.addEventListener('submit', createUser, false);

const loginForm = document.getElementById('lg-form');

const loginUser = (_e) => {
  _e.preventDefault();

  const user = {
    email: loginForm.email.value,
    password: loginForm.pwd.value,
  };
  fetch('http://localhost:3000/api/v2/auth/login', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(user),
  })
  .then(res => {    
  console.log(user);
    console.log(res);
    return res.json();
  })
  .then(data => {
    console.log(data);
    const { answered_count, asked_count, created_at, email, fullname, username } = data.profile;
    const { token } = data;
    localStorage.setItem('fullname', fullname);
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
    localStorage.setItem('answered_count', answered_count);
    localStorage.setItem('asked_count', asked_count);
    localStorage.setItem('created_at', created_at);
    localStorage.setItem('token', token);
  })
  .catch(error => console.log(error));
};

loginForm.addEventListener('submit', loginUser, false);
