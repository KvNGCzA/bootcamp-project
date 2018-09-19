// render question metadata single question page
const renderQuestionMeta_singleQuestion = (title, answersCount, likes) => {
	document.getElementsByClassName('question-title')[0].textContent = title;
	document.getElementsByClassName('q-meta')[0].innerHTML =   `<ul>
  <li class="answer-count">
      <a href="#">Answers</a>
      <a href="#" class="answer-count-dis">${answersCount}</a>
  </li><!--
  --><li class="likes-count">
      <a href="#">Likes</a>
      <a href="#" class="likes-count-dis">${likes}</a>
  </li><!--
  --><li class="views-count">
      <a href="#">Views</a>
      <a href="#" class="views-count-dis">0</a>
  </li>
  </ul>`;
};

// render question single question page
const renderQuestionBody_singleQuestion = (content, username, createdAt) => {
	document.getElementsByClassName('question-body')[0].textContent = content; document.getElementsByClassName('action-meta-cont')[0].innerHTML =   `<div class="action-buttons"></div><!--action buttons--><!--
  --><div class="meta-cont">
  <span class="date-posted">
  </span>
  <ul class="tags">
  </ul>
  </div><!--meta cont -->`;

	if (localStorage.getItem('username') !== username) {
		document.getElementsByClassName('action-buttons')[0].innerHTML = `
      <span class="like-question action like-btn" title="Like">
      <i class="far fa-thumbs-up likebutton"></i>
      </span><!--
      --><span class="dislike-question action dislike-btn" title="Dislike">
      <i class="far fa-thumbs-down dislikebutton"></i>
      </span><!--
      --><span class="report action report-btn" title="Mark as Inappropriate">
      <i class="far fa-flag reportbutton"></i>
      </span>`;
	}else {
		document.getElementsByClassName('meta-cont')[0].style.width = '100%';
	}

	document.getElementsByClassName('date-posted')[0].innerHTML = `<span>${formatDate(createdAt)}</span> by <span><a href="/profile?username=${username}">@${username}</a></span>`;
};

// render comments on single question page
const renderComments_singleQuestion = (answers, uname) => {
	const commentsList = document.getElementById('comment-list');
	if (answers.length > 0) {
		const favoriteAnswer = answers.filter(answer => answer.favorite === true);
		const otherAnswers = answers.filter(answer => answer.favorite !== true);
		const sortedAnswer = [...favoriteAnswer, ...otherAnswers];
		for (const x in sortedAnswer) {
			const { answer, id, username, created_at, likes, dislikes } = sortedAnswer[x];
			let likesCount;
			let dislikesCount;
			if (likes === null || likes.length < 1) {
				likesCount = 0;
			} else {
				likesCount = likes.length;
			}
			if (dislikes === null || dislikes.length < 1) {
				dislikesCount = 0;
			} else {
				dislikesCount = dislikes.length;
			}
			commentsList.innerHTML += `
			<li class="comment-cont">
			<p class="comment">${answer}</p>
			<p class="action-buttons">
				<span class="like-comment action like-btn" title="Like" onclick="likeAnswer(${id})">
				<i class="far fa-thumbs-up likebutton"></i>
				</span><!--
				--><span class="dislike-comment action dislike-btn" title="Dislike" onclick="dislikeAnswer(${id})">
				<i class="far fa-thumbs-down dislikebutton"></i>
				</span><!--
				--><span class="report action report-btn" title="Mark as Inappropriate">
				<i class="far fa-flag reportbutton"></i>
				</span><!--
			--></p>
			<div class="likes-dislikes-cont"><span class="answer-likes-count">upvotes: ${likesCount}</span><span class="answer-dislikes-count">downvotes: ${dislikesCount}</span></div>
			<span class="com-meta">answer posted by <a href="/profile?username=${username}">@${username}</a> on <a href="#">${formatDate(created_at)}</a></span>
			</li>`;

			// render already liked buttons
			if (likes !== null && likes.indexOf(localStorage.getItem('username')) !== -1) {
				document.getElementsByClassName('like-comment')[x].innerHTML = '<i class="fas fa-thumbs-up likebutton"></i>';
			}

			// render already disliked buttons
			if (dislikes !== null && dislikes.indexOf(localStorage.getItem('username')) !== -1) {
				document.getElementsByClassName('dislike-comment')[x].innerHTML = '<i class="fas fa-thumbs-down dislikebutton"></i>';
			}

			// render favorite buttons
			if (localStorage.getItem('username') === uname) {
				document.getElementsByClassName('action-buttons')[Number(x) + 1].innerHTML 
          += `<span class="favorite-comment action favorite-btn" title="Mark as favorite" onclick="favoriteAnAnswer(${id})">
              <i class="far fa-star favoritebutton"></i>
          </span>`;
			}
		}

		const firstStar = document.getElementsByClassName('far fa-star favoritebutton')[0];
		if (favoriteAnswer.length > 0) {
			const firstComment = document.getElementsByClassName('comment')[0];
			const badge = document.createElement('i');
			badge.classList += 'fas fa-check-circle';
			badge.setAttribute('title', 'Favorite answer!');
			firstComment.insertBefore(badge, firstComment.firstChild);
			if (firstStar) {
				firstStar.classList = 'fas fa-star favoritebutton';
			}
		}
	}else {
		commentsList.innerHTML += '<li>No answers posted yet</li><br><br>';
	}
};

// render question cards
const renderQuestionTemplates = (questions) => {
	const tagsArr = [];
	for (let x = questions.length - 1; x >= 0; x--) {
		const tab = document.getElementById('tab1');
		const {
 answers_count, likes, title, created_at, id, username, tags 
} = questions[x];
		const newDate = formatDate(created_at);
		tagsArr.push([tags.split(',')]);
		tab.innerHTML
      += `<div class="single-question">
          <div class="q-meta">
          <ul>
              <li class="answer-count">
              <a href="#">Answers</a>
              <a href="#" class="answer-count-dis">${answers_count}</a>
              </li><!--
              --><li class="likes-count">
              <a href="#">Likes</a>
              <a href="#" class="likes-count-dis">${likes}</a>
              </li><!--
              --><li class="views-count">
              <a href="#">Views</a>
              <a href="#" class="views-count-dis">0</a>
              </li>
          </ul>
          </div>

          <div class="q-details">
          <div class="edit-option-container">
          </div>
          <p class="question-title"><a href="/question?id=${id}" class="gotoQ">${title}</a></p>
          <ul class="tags">                    
          </ul>
          <span class="posted-on">Posted on <a href="#">${newDate}
              </a> by <a href="/profile?username=${username}">@${username}</a>
          </span>
          </div>
      </div><!-- single-question -->`;
	}
	addTags(tagsArr);
};

// render a users question cards
const renderUsersQuestions = (questions, uname) => {
	const tagsArr = [];
	const idArr = [];

	for (let x = questions.length - 1; x >= 0; x--) {
		const profilePage = document.getElementsByClassName('profile-page-cont')[0];
		const {
 answers_count, likes, title, created_at, username, tags, id 
} = questions[x];
		tagsArr.push([tags.split(',')]);
		idArr.push(id);
		const newDate = formatDate(created_at);
		profilePage.innerHTML += `<div class="single-question">
      <div class="q-meta">
      <ul>
          <li class="answer-count">
          <a href="#">Answers</a>
          <a href="#" class="answer-count-dis">${answers_count}</a>
          </li><!--
          --><li class="likes-count">
          <a href="#">Likes</a>
          <a href="#" class="likes-count-dis">${likes}</a>
          </li><!--
          --><li class="views-count">
          <a href="#">Views</a>
          <a href="#" class="views-count-dis">0</a>
          </li>
      </ul>
      </div>

      <div class="q-details">
      <div class="edit-option-container">
      </div>
      <p class="question-title"><a href="/question?id=${id}">${title}</a></p>
      <ul class="tags">
      </ul>
          <span class="posted-on">Posted on <a href="#">${newDate}</a> by @${username} </span>
      </div>

   </div><!-- single-question -->`;
	}
	if (uname === localStorage.getItem('username')) {
		const edit = document.getElementsByClassName('edit-option-container');
		for (let x = 0; x < edit.length; x++) {
			edit[x].innerHTML = `<span class="edit-option" ><i class="fas fa-wrench"></i></span>
          <ul class="drop-settings">
          <li class="deleteButton"><i class="far fa-trash-alt" title="Delete this question"></i> Delete</li>
          <li><i class="fas fa-wrench"></i> Edit</li>
          </ul>`;
		}
		editButton();
		deleteButtonFunction(idArr);
	}
	addTags(tagsArr);
};
