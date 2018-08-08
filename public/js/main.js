//function to display form or search on click
// const showForm = (item) => {
//   if(item.style.display === "block" ){
//     item.style.display = "none";
//   }
//   else{
//     item.style.display = "block";
//   }
// };

// const closeForm = (e, item) => {
//   if( e.target.parentNode !== item && e.target !== item){
//     item.style.display = "none"
//   }
// };

// //display signup/login form when menu login button is clicked
// let formCont = document.getElementById('access-forms');
// let navLogin = document.getElementById('navLogin');
// navLogin.addEventListener('mouseover',() => {
//   showForm(formCont);
// }, false);
// window.addEventListener('click',(e)=>{
//   closeForm(e, formCont);
// },false);

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

