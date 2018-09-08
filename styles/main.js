const dashTitle = (str) => {
	if (/\s/.test(str)) {
		const lowerStr = str.toLowerCase();
		const strArr = lowerStr.split(' ');
		return strArr.join('-');
	}
	return str.toLowerCase();
};
if (typeof document !== 'undefined') {
	/** add page-title as a class to the body tag */
	const bodyTag = document.getElementsByTagName('body')[0];
	const currentPageTitle = document.title;
	const cName = dashTitle(currentPageTitle);
	bodyTag.classList += `page-${cName} `;

	// add logged-in or logged-out class to body
	const status = localStorage.getItem('token');
	if (status !== null) {
		bodyTag.classList += 'logged-in';
		const profilePage = document.getElementsByClassName('page-profile')[0];
		if (profilePage) {
			// add users information from database
			const names = document.getElementsByClassName('profile-full-name');
			const uname = document.getElementsByClassName('profile-username');
			const member = document.getElementsByClassName('profile-msince');
			const asked = document.getElementsByClassName('profile-num-que');
			const answered = document.getElementsByClassName('profile-num-ans');
			const job = document.getElementsByClassName('profile-occupation');
			for (let x = 0; x < names.length; x++) {
				const fullName = localStorage.getItem('fullname');
				const username = localStorage.getItem('username');
				const memSince = localStorage.getItem('created_at');
				const aksedNum = localStorage.getItem('asked_count');
				const ansNum = localStorage.getItem('answered_count');
				const occupation = localStorage.getItem('occupation');
				names[x].textContent = fullName;
				uname[x].innerHTML = `<i class="fas fa-user" ></i> @${username}`;
				member[x].innerHTML = `<i class="fas fa-user" ></i> ${memSince}`;
				asked[x].innerHTML = `<i class="fas fa-question"></i><span> Asked:</span> ${aksedNum}`;
				answered[x].innerHTML = `<i class="fas fa-check"></i><span> Replied:</span> ${ansNum}`;
				job[x].innerHTML = `<i class="fas fa-suitcase" ></i> ${occupation}`;
			}
		}
	}
	if (status === null) {
		bodyTag.classList += 'logged-out';
	}

	/** action buttons config */
	const actionBtnArr = ['far fa-thumbs-up likebutton', 'far fa-thumbs-down dislikebutton', 'far fa-flag reportbutton', 'far fa-star favoritebutton'];
	const thinClass = ['far fa-thumbs-up likebutton', 'far fa-thumbs-down dislikebutton', 'far fa-flag reportbutton', 'far fa-star favoritebutton'];
	const thickClass = ['fas fa-thumbs-up likebutton', 'fas fa-thumbs-down dislikebutton', 'fas fa-flag reportbutton', 'fas fa-star favoritebutton'];
	for (const x in actionBtnArr) {
		const current = document.getElementsByClassName(actionBtnArr[x]);
		for (let y = 0; y < current.length; y++) {
			current[y].addEventListener('click', function () {
				const currentClass = this.getAttribute('class');
				if (currentClass === thinClass[x]) {
					this.setAttribute('class', thickClass[x]);
				}
				else {
					this.setAttribute('class', thinClass[x]);
				}
			}, false);
		}
	}


	/** comments list background color */
	const comments = document.getElementsByClassName('comment-cont');
	for (const x in comments) {
		if (x % 2 === 0) {
			comments[x].style.backgroundColor = '#f4f4f4';
		}
	}

	/** colour for question meta - views, likes and answered if count is greater than 0 */
	const homeAnswered = document.getElementsByClassName('answer-count-dis');
	const homeLiked = document.getElementsByClassName('likes-count-dis');
	const homeViews = document.getElementsByClassName('views-count-dis');

	const countArr = [homeAnswered, homeLiked, homeViews];
	const classCountArr = ['answered', 'liked', 'viewed'];
	for (const y in countArr) {
		for (const x in countArr[y]) {
			const current = Number(countArr[y][x].textContent);
			if (current > 0) {
				countArr[y][x].classList += ` ${classCountArr[y]}`;
			}// if
		}// for x
	}// for y


	// mobile search configuration
	const mobSearchIcon = document.getElementById('fa-search');
	const searchForm = document.getElementsByClassName('mob-search-form');
	const searchFormInput = document.getElementsByClassName('search-form-input');
	mobSearchIcon.addEventListener('click', () => {
		if (searchForm[0].style.display === 'block') {
			mobSearchIcon.style.color = 'white';
			searchForm[0].style.display = 'none';
			console.log(searchForm[0]);
			console.log(searchForm[0].style.display);
		}
		else {
			mobSearchIcon.style.color = '#f24d4d';
			searchForm[0].style.display = 'block';
			console.log(searchForm[0]);
			console.log(searchForm[0].style.display);
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
}

module.exports = {
	dashTitle,
};