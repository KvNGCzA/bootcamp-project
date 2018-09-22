'use strict';

var fetchUserInfo = function () {
    function fetchUserInfo() {
        var uname = window.location.search.split('=')[1];
        fetch('https://safe-inlet-99347.herokuapp.com/api/v2/auth/user/' + String(uname)).then(function (res) {
            return res.json();
        }).then(function (data) {
            var _data$user$ = data.user[0],
                username = _data$user$.username,
                fullname = _data$user$.fullname,
                created_at = _data$user$.created_at,
                asked_count = _data$user$.asked_count,
                answered_count = _data$user$.answered_count,
                occupation = _data$user$.occupation,
                profileimage = _data$user$.profileimage;
            // add users information from database

            document.title = 'Profile - @' + String(username);
            document.getElementsByClassName('heading')[0].textContent = String(fullname.split(' ')[0]) + '\'s Questions';
            for (var x = 0; x < document.getElementsByClassName('profile-full-name').length; x++) {
                document.getElementsByClassName('profile-full-name')[x].textContent = fullname;
                document.getElementsByClassName('profile-username')[x].innerHTML = '<i class="fas fa-user" ></i> @' + String(username);
                document.getElementsByClassName('profile-msince')[x].innerHTML = '<i class="fas fa-user" ></i> ' + String(formatDate(created_at));
                document.getElementsByClassName('profile-num-que')[x].innerHTML = '<i class="fas fa-question"></i><span> Asked:</span> ' + String(asked_count);
                document.getElementsByClassName('profile-num-ans')[x].innerHTML = '<i class="fas fa-check"></i><span> Replied:</span> ' + String(answered_count);
                document.getElementsByClassName('profile-occupation')[x].innerHTML = '<i class="fas fa-suitcase" ></i> ' + String(occupation);
            }
            for (var _x = 1; _x < document.getElementsByClassName('profile-image').length; _x++) {
                document.getElementsByClassName('profile-image')[_x].style.backgroundImage = 'url(\'images/' + String(profileimage) + '\')';
            }
        })['catch'](function (error) {
            return error;
        });
    }

    return fetchUserInfo;
}();

if (document.getElementsByTagName('body')[0].classList.contains('page-profile')) {
    fetchUserInfo();
}