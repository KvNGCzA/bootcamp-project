
/***/
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
