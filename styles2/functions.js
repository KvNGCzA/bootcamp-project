export const dashTitle = str => {
	if (/\s/.test(str)) {
		const lowerStr = str.toLowerCase();
		const strArr = lowerStr.split(' ');
		return strArr.join('-');
	}
	return str.toLowerCase();
};

export const formatDate = date => {
    const day = date.slice(8, 10);
    const monthNumber = date.slice(5, 7);
    let month;
    if (monthNumber[0] === '0') {
      month = monthNumber[1] - 1;
    }
    else {
      month = monthNumber - 1; 
    }
    const year = date.slice(0, 4);
    const monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const newMonth = monthArray[month];
    const newDate = `${day} ${newMonth} ${year}`;
    return newDate;
};

export const deleteQuestion = (id) => {
	const token = localStorage.getItem('token');
	fetch(`http://localhost:3000/api/v2/questions/${id}`, {
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ token }),
	})
		.then(res => res.json())
		.then(data => document.location.reload())
		.catch(error => error);
}; // delete a question

// deleteButtonFunction
export const deleteButtonFunction = (idArr) => {
	const deleteButton = document.getElementsByClassName('deleteButton');
	for (let x = 0; x < deleteButton.length; x++) {
		deleteButton[x].addEventListener('click', () => {
			deleteQuestion(idArr[x]);
		}, false);
	}
}; // deleteButtonFunction

export const editButton = () => {
  const editOption = document.getElementsByClassName('edit-option');
    for ( let x = 0; x < editOption.length; x ++) {
        editOption[x].addEventListener('click', () => {
          let nextSibling = editOption[x].nextElementSibling;
            if (nextSibling.style.display === 'block') {
                nextSibling.style.display = 'none';
            }
            else{
                nextSibling.style.display = 'block';
            }
        }, false);
    }
};

// countClassColours
export const countClassColours = () => {
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
export const addTags = tagsArr => {
  // add tags to questions
  const tag = document.getElementsByClassName('tags');
  for(let x = 0; x < tag.length; x++) {
    for (let y in tagsArr[x]) {
      for (let z in tagsArr[x][y]) {
        if (tagsArr[x][y][z].trim() !== "") {
          tag[x].innerHTML += `<li><a href="#">${tagsArr[x][y][z]}</a></li>`;
        }
      }
    }
  }
}; // addTags

/** comments list background color */
export const colorComments = () => {
  const comments = document.getElementsByClassName('comment-cont');
  for (const x in comments) {
    if (x % 2 === 0) {
      comments[x].style.backgroundColor = '#f4f4f4';
    }
  }
};

// behaviour of like, dislike, flag, and favorite buttons
export const actionButtons = () => {
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
        } else {
          this.setAttribute('class', thinClass[x]);
        }
      }, false);
    }
  }
};

// render question metadata single question page
export const renderQuestionMeta_singleQuestion = (title, answersCount, likes) => {            
  document.getElementsByClassName('question-title')[0].textContent = title;
  document.getElementsByClassName('q-meta')[0].innerHTML = 
  `<ul>
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
export const renderQuestionBody_singleQuestion = (content, username, createdAt) => {
  document.getElementsByClassName('question-body')[0].textContent = content;  document.getElementsByClassName('action-meta-cont')[0].innerHTML = 
  `<div class="action-buttons"></div><!--action buttons--><!--
  --><div class="meta-cont">
  <span class="date-posted">
  </span>
  <ul class="tags">
  </ul>
  </div><!--meta cont -->`;

  if (localStorage.getItem('username') !== username) {
      document.getElementsByClassName('action-buttons')[0].innerHTML = `
      <span class="like-comment action like-btn" title="Like">
      <i class="far fa-thumbs-up likebutton"></i>
      </span><!--
      --><span class="dislike-comment action dislike-btn" title="Dislike">
      <i class="far fa-thumbs-down dislikebutton"></i>
      </span><!--
      --><span class="report action report-btn" title="Mark as Inappropriate">
      <i class="far fa-flag reportbutton"></i>
      </span>`;
  }

  document.getElementsByClassName('date-posted')[0].innerHTML = `<span>${formatDate(createdAt)}</span> by <span><a href="/profile?username=${username}">@${username}</a></span>`;
};

// render comments on single question page
export const renderComments_singleQuestion = (answers, uname) => {
  const commentsList = document.getElementById('comment-list');
  if (answers.length > 0) {
      const favoriteAnswer = answers.filter(answer => answer.favorite === true);
      const otherAnswers = answers.filter(answer => answer.favorite !== true);
      const sortedAnswer = [...favoriteAnswer, ...otherAnswers];
      for (let x in sortedAnswer) {
          const { answer, id, username, created_at, likes, dislikes } = sortedAnswer[x];
          let likesCount;
          let dislikesCount;
          if (likes === null || likes.length < 1) {
            likesCount = 0;
          }else {
            likesCount = likes.length
          }
          if (dislikes === null || dislikes.length < 1) {
            dislikesCount = 0;
          }else {
            dislikesCount = dislikes.length
          }
          commentsList.innerHTML += `
        <li class="comment-cont">
          <p class="comment">${answer}</p>
          <p class="action-buttons">
          <span class="com-meta">answer posted by <a href="/profile?username=${username}">@${username}</a> on <a href="#">${formatDate(created_at)}</a></span>
              <span class="like-comment action like-btn" title="Like">
              <i class="far fa-thumbs-up likebutton"></i>
              </span><!--
              --><span class="dislike-comment action dislike-btn" title="Dislike">
              <i class="far fa-thumbs-down dislikebutton"></i>
              </span><!--
              --><span class="report action report-btn" title="Mark as Inappropriate">
              <i class="far fa-flag reportbutton"></i>
              </span><!--
          --></p>
          <div class="likes-dislikes-cont"><span class="answer-likes-count">Likes: ${likesCount}</span><span class="answer-dislikes-count">Dislikes: ${dislikesCount}</span></div>
        </li>`;
        if (localStorage.getItem('username') === uname) {
          document.getElementsByClassName('action-buttons')[Number(x) + 1].innerHTML += 
          `<span class="favorite-comment action favorite-btn" title="Mark as favorite" onclick="favoriteAnAnswer(${id})">
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
      actionButtons();
  }else{
      commentsList.innerHTML += `<li>No answers posted yet</li><br><br>`;
  }
};

// render question cards
export const renderQuestionTemplates = (questions) => {
  let tagsArr = [];
  for (let x = questions.length - 1; x >= 0; x--) {
      const tab = document.getElementById('tab1'); 
      const { answers_count, likes, title, created_at, id, username, tags } = questions[x];
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
export const renderUsersQuestions = (questions, uname) => {
  let tagsArr = [];
  let idArr = [];
  
  for (let x = questions.length - 1; x >= 0; x--) {
      const profilePage = document.getElementsByClassName('profile-page-cont')[0];
      const { answers_count, likes, title, created_at, username, tags, id } = questions[x];
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
      for(let x = 0; x < edit.length; x++) {
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
