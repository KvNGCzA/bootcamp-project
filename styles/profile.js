const fetchUserInfo = () => {    
    const uname = window.location.search.split('=')[1];
    fetch(`https://safe-inlet-99347.herokuapp.com/api/v2/auth/user/${uname}`)
    .then(res => res.json())
    .then(data => {
        const { username, fullname, created_at, asked_count, answered_count, occupation, profileimage } = data.user[0];
        // add users information from database
        document.title = `Profile - @${username}`;
        document.getElementsByClassName('heading')[0].textContent = `${fullname.split(' ')[0]}'s Questions`;
        for (let x = 0; x < document.getElementsByClassName('profile-full-name').length; x++) {
			document.getElementsByClassName('profile-full-name')[x].textContent = fullname;
			document.getElementsByClassName('profile-username')[x].innerHTML = `<i class="fas fa-user" ></i> @${username}`;
			document.getElementsByClassName('profile-msince')[x].innerHTML = `<i class="fas fa-user" ></i> ${formatDate(created_at)}`;
			document.getElementsByClassName('profile-num-que')[x].innerHTML = `<i class="fas fa-question"></i><span> Asked:</span> ${asked_count}`;
			document.getElementsByClassName('profile-num-ans')[x].innerHTML = `<i class="fas fa-check"></i><span> Replied:</span> ${answered_count}`;
            document.getElementsByClassName('profile-occupation')[x].innerHTML = `<i class="fas fa-suitcase" ></i> ${occupation}`;
        }
        for (let x = 1; x < document.getElementsByClassName('profile-image').length; x++) {
            document.getElementsByClassName('profile-image')[x].style.backgroundImage = `url('images/${profileimage}')`;
        }
        
    })
    .catch(error => error);
};

if (document.getElementsByTagName('body')[0].classList.contains('page-profile')) {
    fetchUserInfo();
}