const signupForm = document.getElementById('su-form');

const createUser  = (e) => {
    e.preventDefault();
    const newUser = {};
   
    newUser.firstName = signupForm.fname.value;
    newUser.lastName = signupForm.lname.value;
    newUser.password = signupForm.pwd.value;
    newUser.email = signupForm.email.value;
    newUser.username = signupForm.username.value;


    fetch('https://safe-inlet-99347.herokuapp.com/api/v2/auth/signup', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    }).then((res) => {
        return res.json();
      }).then(data => {
        console.log(data);
          const token = data.token;
          const { fullName, username, email } = data.profile;
        console.log(data.token);  
        console.log(data.profile);
        localStorage.setItem('token', token);
        localStorage.setItem('fullName', fullName);
        localStorage.setItem('username', username);

        
        window.location.href = './profile.html';
      })
      .catch((err) => console.log(err))
  };

signupForm.addEventListener('submit', createUser, false);
