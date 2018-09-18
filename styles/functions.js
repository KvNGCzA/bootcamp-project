const dashTitle = (str) => {
	if (/\s/.test(str)) {
		const lowerStr = str.toLowerCase();
		const strArr = lowerStr.split(' ');
		return strArr.join('-');
	}
	return str.toLowerCase();
};

const formatDate = (date) => {
	const day = date.slice(8, 10);
	const monthNumber = date.slice(5, 7);
	let month;
	if (monthNumber[0] === '0') {
		month = monthNumber[1] - 1;
	} else {
		month = monthNumber - 1;
	}
	const year = date.slice(0, 4);
	const monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	const newMonth = monthArray[month];
	const newDate = `${day} ${newMonth} ${year}`;
	return newDate;
};

// deleteButtonFunction
const deleteButtonFunction = (idArr) => {
	const deleteButton = document.getElementsByClassName('deleteButton');
	for (let x = 0; x < deleteButton.length; x++) {
		deleteButton[x].addEventListener('click', () => {
			deleteQuestion(idArr[x]);
		}, false);
	}
}; // deleteButtonFunction

const editButton = () => {
	const editOption = document.getElementsByClassName('edit-option');
	for (let x = 0; x < editOption.length; x++) {
		editOption[x].addEventListener('click', () => {
			const nextSibling = editOption[x].nextElementSibling;
			if (nextSibling.style.display === 'block') {
				nextSibling.style.display = 'none';
			} else {
				nextSibling.style.display = 'block';
			}
		}, false);
	}
};

// countClassColours
const countClassColours = () => {
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
}; // countClassColours

// addTags
const addTags = (tagsArr) => {
	// add tags to questions
	const tag = document.getElementsByClassName('tags');
	for (let x = 0; x < tag.length; x++) {
		for (const y in tagsArr[x]) {
			for (const z in tagsArr[x][y]) {
				if (tagsArr[x][y][z].trim() !== '') {
					tag[x].innerHTML += `<li><a href="#">${tagsArr[x][y][z]}</a></li>`;
				}
			}
		}
	}
}; // addTags

/** comments list background color */
const colorComments = () => {
	const comments = document.getElementsByClassName('comment-cont');
	for (const x in comments) {
		if (x % 2 === 0) {
			comments[x].style.backgroundColor = '#f4f4f4';
		}
	}
};

// behaviour of like, dislike, flag, and favorite buttons
const actionButtons = () => {
	/** action buttons config */
	const actionBtnArr = ['fa-thumbs-up likebutton', 'fa-thumbs-down dislikebutton', 'fa-flag reportbutton', 'fa-star favoritebutton'];
	const thinClass = ['far fa-thumbs-up likebutton', 'far fa-thumbs-down dislikebutton', 'far fa-flag reportbutton', 'far fa-star favoritebutton'];
	const thickClass = ['fas fa-thumbs-up likebutton', 'fas fa-thumbs-down dislikebutton', 'fas fa-flag reportbutton', 'fas fa-star favoritebutton'];
	for (const x in actionBtnArr) {
		const current = document.getElementsByClassName(actionBtnArr[x]);
		for (let y = 0; y < current.length; y++) {
			current[y].addEventListener('click', function () {
				const currentClass = this.getAttribute('class');
				if (currentClass === thinClass[x]) {
					this.setAttribute('class', thickClass[x]);
				} else {
					this.setAttribute('class', thinClass[x]);
				}
			}, false);
		}
	}
};
