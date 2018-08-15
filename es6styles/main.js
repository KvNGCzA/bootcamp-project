/** add page-title as a class to the body tag*/
const dashTitle = str =>{
  if( /\s/.test(str) ){
    let lowerStr = str.toLowerCase();
    let strArr = lowerStr.split(' ');
    return strArr.join('-');
  }
  return str.toLowerCase();
};
let bodyTag = document.getElementsByTagName('body');
let currentPageTitle = document.title;
let cName = dashTitle(currentPageTitle);
bodyTag[0].classList += 'page-' + cName + ' ' ;


/** action buttons config*/
let actionBtnArr = ['far fa-thumbs-up likebutton','far fa-thumbs-down dislikebutton','far fa-flag reportbutton','far fa-star favoritebutton'];
let thinClass = ['far fa-thumbs-up likebutton','far fa-thumbs-down dislikebutton','far fa-flag reportbutton','far fa-star favoritebutton'];
let thickClass = ['fas fa-thumbs-up likebutton','fas fa-thumbs-down dislikebutton','fas fa-flag reportbutton','fas fa-star favoritebutton'];
for(let x in actionBtnArr ){
  let current = document.getElementsByClassName(actionBtnArr[x]);
    for(let y = 0; y < current.length; y++){
      current[y].addEventListener('click', function(){
        let currentClass = this.getAttribute('class');
        if( currentClass === thinClass[x]){
          this.setAttribute('class', thickClass[x]);
        }
        else{
          this.setAttribute('class',thinClass[x]);
        }
      }, false);
    }
}


/** comments list background color */
let comments = document.getElementsByClassName('comment-cont');
for( let x in comments){
  if( x % 2 === 0 ){
    comments[x].style.backgroundColor= '#f4f4f4';
  }
}

/** colour for question meta - views, likes and answered if count is greater than 0*/
const homeAnswered = document.getElementsByClassName('answer-count-dis');
const homeLiked = document.getElementsByClassName('likes-count-dis');
const homeViews = document.getElementsByClassName('views-count-dis');
let countArr = [ homeAnswered,  homeLiked, homeViews];
const classCountArr = ['answered', 'liked', 'viewed'];
for( let y in countArr){
  for( let x in countArr[y]){
    let current = Number(countArr[y][x].textContent);
    if( current > 0){
      countArr[y][x].classList += ' ' +classCountArr[y];
    }//if
  }//for x
}//for y


/** mobile search configuration*/
const mobSearchIcon =document.getElementById('fa-search');
const searchForm = document.getElementsByClassName('mob-search-form');
const searchFormInput = document.getElementsByClassName('search-form-input');
mobSearchIcon.addEventListener('click', () => {
  if( searchForm[0].style.display === 'block'){
    mobSearchIcon.style.color = 'white';
    searchForm[0].style.display = 'none';
  }
  else{
    mobSearchIcon.style.color = '#f24d4d';
    searchForm[0].style.display = 'block';
  }
}, false);
searchFormInput[0].addEventListener('blur', ()=>{
  searchForm[0].style.display = 'none';
  mobSearchIcon.style.color = 'white';

}, false);



/** functions the display either login or sign up forms*/
let loginCheckArr = ['login-form', 'side-login-form'];
let signupCheckArr =['signup-form', 'side-signup-form'];
let changeButtons = ['c-t-login' , 's-t-login'];
let changeButtons2 =['c-t-signup', 's-t-signup'];
const checkWhichForm = (login, signup) => {
  if( login.style.display === 'none'){
    signup.style.display ='none';
    login.style.display = 'block';
  }else{
  signup.style.display ='block';
  login.style.display = 'none';
  }
};//checkWhichForm
for( let x in loginCheckArr){
  let loginCheck = document.getElementById(loginCheckArr[x]);
  let signupCheck = document.getElementById(signupCheckArr[x]);
  let loginButton = document.getElementById(changeButtons[x]);
  let signupButton = document.getElementById(changeButtons2[x]);
  if(loginButton && signupButton){
    loginButton.addEventListener('click',()=>{
      checkWhichForm(loginCheck, signupCheck);
    },false);
    signupButton.addEventListener('click',()=>{
      checkWhichForm(loginCheck, signupCheck);
    },false);
  }
}
