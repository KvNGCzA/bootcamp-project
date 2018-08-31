const name = document.getElementsByClassName('profile-full-name');
const uname = document.getElementsByClassName('profile-username');
for( let x in name){    
const full_name = localStorage.getItem('fullName');
const user_name = localStorage.getItem('username');
    if(full_name) {        
     name[x].textContent = full_name;
     uname[x].textContent = '@' + user_name; 
    }
}
