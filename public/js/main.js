
/** functions the display either login or sign up forms*/
//function to change which for displays
const checkWhichForm = () => {
  let loginCheck = document.getElementById('login-form');
  let signupCheck = document.getElementById('signup-form');
  if( loginCheck.style.display === 'none'){
    signupCheck.style.display ='none';
    loginCheck.style.display = 'block';
  }else{
  signupCheck.style.display ='block';
  loginCheck.style.display = 'none';
  }
};//checkWhichForm

const checkWhichFormSide = () => {
  let loginCheck = document.getElementById('side-login-form');
  let signupCheck = document.getElementById('side-signup-form');
  if( loginCheck.style.display === 'none'){
    signupCheck.style.display ='none';
    loginCheck.style.display = 'block';
  }else{
  signupCheck.style.display ='block';
  loginCheck.style.display = 'none';
  }
};//checkWhichForm


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
  bodyTag[0].classList += "page-" + cName ;
