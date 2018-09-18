import { formatDate } from "../public/js/functions";

const fetchUserInfo = () => {    
    const uname = window.location.search.split('=')[1];
    fetch(`http://localhost:3000/api/v2/auth/user/${uname}`)
    .then(res => res.json())
    .then(data => {
        const { username, fullname, created_at, asked_count, answered_count, occupation } = data.user[0];
        // add users information from database
        
        document.getElementsByClassName('heading')[0].textContent = `${fullname.split(' ')[0]}'s Questions`;
        for (let x = 0; x < document.getElementsByClassName('profile-full-name').length; x++) {
			document.getElementsByClassName('profile-full-name')[x].textContent = fullname;
			document.getElementsByClassName('profile-username')[x].innerHTML = `<i class="fas fa-user" ></i> @${username}`;
			document.getElementsByClassName('profile-msince')[x].innerHTML = `<i class="fas fa-user" ></i> ${formatDate(created_at)}`;
			document.getElementsByClassName('profile-num-que')[x].innerHTML = `<i class="fas fa-question"></i><span> Asked:</span> ${asked_count}`;
			document.getElementsByClassName('profile-num-ans')[x].innerHTML = `<i class="fas fa-check"></i><span> Replied:</span> ${answered_count}`;
			document.getElementsByClassName('profile-occupation')[x].innerHTML = `<i class="fas fa-suitcase" ></i> ${occupation}`;
		}
    })
    .catch(error => error);
};

if (document.title === 'Profile') {
    fetchUserInfo();
}