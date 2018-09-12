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

export const addTags = tagsArr => {
  // add tags to questions
  const tag = document.getElementsByClassName('tags');
  for(let x = 0; x < tag.length; x++) {
    for (let y in tagsArr[x]) {
      for (let z in tagsArr[x][y]) {                    
          tag[x].innerHTML += `<li><a href="#">${tagsArr[x][y][z]}</a></li>`;
      }
    }
  }
}; // addTags

export const deleteButton = (idArr) => {
  let deleteButton = document.getElementsByClassName('deleteButton');
  for ( let x = 0; x < deleteButton.length; x++ ) {
      deleteButton[x].addEventListener('click', () => {
          deleteQuestion(idArr[x]);
      }, false);
  }
}; // deleteButton
