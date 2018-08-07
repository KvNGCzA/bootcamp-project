const showForm = () => {
  let formCont = document.getElementById('access-forms');
  if(formCont.style.display === "block" ){
    formCont.style.display = "none";
  }
  else{
    formCont.style.display = "block";
  }
};
let navLogin = document.getElementById('navLogin');
navLogin.addEventListener('click', () => {
  showForm();
}, false);

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
