/** add page-title as a class to the body tag */
const token = localStorage.getItem('token');
const bodyTag = document.getElementsByTagName('body')[0];

// add logged-in or logged-out class to body
if (token !== 'null') {
	bodyTag.classList += ' logged-in';
	const profileLink = document.getElementsByClassName('profile-link');
	const username = localStorage.getItem('username');
	const profileimage = localStorage.getItem('profileimage');
	for ( let x = 0; x < profileLink.length; x++) {
		profileLink[x].setAttribute('href', `/profile?username=${username}`);
	}
	document.getElementsByClassName('profile-image')[0].style.backgroundImage = `url('images/${profileimage}')`;
} else {
	bodyTag.classList += ' logged-out';
}

// mobile search configuration
const mobSearchIcon = document.getElementById('fa-search');
const searchForm = document.getElementsByClassName('mob-search-form');
const searchFormInput = document.getElementsByClassName('search-form-input');
mobSearchIcon.addEventListener('click', () => {
	if (searchForm[0].style.display === 'block') {
		mobSearchIcon.style.color = 'white';
		searchForm[0].style.display = 'none';
	} else {
		mobSearchIcon.style.color = '#f24d4d';
		searchForm[0].style.display = 'block';
	}
}, false);
searchFormInput[0].addEventListener('blur', () => {
	searchForm[0].style.display = 'none';
	mobSearchIcon.style.color = 'white';
}, false);


/** functions the display either login or sign up forms */
const loginCheckArr = ['login-form', 'side-login-form'];
const signupCheckArr = ['signup-form', 'side-signup-form'];
const changeButtons = ['c-t-login', 's-t-login'];
const changeButtons2 = ['c-t-signup', 's-t-signup'];
const checkWhichForm = (login, signup) => {
	if (login.style.display === 'none') {
		signup.style.display = 'none';
		login.style.display = 'block';
	} else {
		signup.style.display = 'block';
		login.style.display = 'none';
	}
};// checkWhichForm
for (const x in loginCheckArr) {
	const loginCheck = document.getElementById(loginCheckArr[x]);
	const signupCheck = document.getElementById(signupCheckArr[x]);
	const loginButton = document.getElementById(changeButtons[x]);
	const signupButton = document.getElementById(changeButtons2[x]);
	if (loginButton && signupButton) {
		loginButton.addEventListener('click', () => {
			checkWhichForm(loginCheck, signupCheck);
		}, false);
		signupButton.addEventListener('click', () => {
			checkWhichForm(loginCheck, signupCheck);
		}, false);
	}
}
