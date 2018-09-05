const formatDate = date => {
  const day = date.slice(8,10);
  const monthNumber = date.slice(5,7);
  let month;
  if (monthNumber[0] === '0') {
    month = monthNumber[1] - 1;
  }
  else {
    month = monthNumber - 1; 
  }
  const year = date.slice(0,4);
  const mArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const newMonth = mArray[month];
  const newDate = `${day} ${newMonth} ${year}`;
  return newDate;
};

const signupForm = document.getElementById('su-form');

const createUser = (_e) => {
  _e.preventDefault();
  const warning = document.getElementById('warning-message');
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
    const message = data.message;
    if (message === 'user created!') {
      const { answered_count, asked_count, created_at, email, fullname, username } = data.profile;
      const { token } = data;
      const newDate = formatDate(created_at);
      localStorage.setItem('fullname', fullname);
      localStorage.setItem('username', username);
      localStorage.setItem('email', email);
      localStorage.setItem('answered_count', answered_count);
      localStorage.setItem('asked_count', asked_count);
      localStorage.setItem('created_at', newDate);
      localStorage.setItem('token', token);
      return window.location.href = './profile.html';
    }
    return warning.textContent = message;
  })
		.catch(err => console.log(err));
};

signupForm.addEventListener('submit', createUser, false);

const loginForm = document.getElementById('lg-form');

const loginUser = (_e) => {
  _e.preventDefault();
  const warning = document.getElementById('warning-message');
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
    const message = data.message;
    if (message === "successfully logged in!") {
      const { answered_count, asked_count, created_at, email, fullname, username } = data.profile;
      const { token } = data;
      const newDate = formatDate(created_at);
      localStorage.setItem('fullname', fullname);
      localStorage.setItem('username', username);
      localStorage.setItem('email', email);
      localStorage.setItem('answered_count', answered_count);
      localStorage.setItem('asked_count', asked_count);
      localStorage.setItem('created_at', newDate);
      localStorage.setItem('token', token);
      return window.location.href = './profile.html';
    }
    return warning.textContent = 'username/password do not match';
  })
  .catch(error => console.log(error));
};

loginForm.addEventListener('submit', loginUser, false);
