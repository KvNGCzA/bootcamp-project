$(document).ready(function(){
/** home questions tabs JQueryUI*/
let homeQuestions = $('#hQuestions');
homeQuestions.tabs();



/** drop down login form config */
//show and hide login/signup form
const $formCont = $('#access-forms');
const $navLogin = $('#navLogin');
const $input = $('#access-forms :input');
$navLogin.on('click', () => {
    $formCont.slideToggle();
});

/** quick options configurations */

//show and hide quick options
const opt = $('.quick-options');
const optCount = opt.children().length;

//quick options icon array
let $iconElement = ['.quick-search i', '.quick-question i'];
//quick options class array
let $optionsClass = ['.quick-search', '.quick-question'];
//quick options icon class array
let $iconClass = ['fas fa-search','fas fa-pencil-alt'];

for(let x in $iconElement){
    let $icon = $($iconElement[x]);
    let $optionContainer = $($optionsClass[x]);
    $icon.on('click', ()=>{
        if($icon.attr('class') !== 'fas fa-times opt-shadow'){
            $optionContainer.animate( {'right': '400px'}, 250).addClass('opt-shadow');
            $optionContainer.find('input')[0].focus();
            console.log($optionContainer);
            $icon.attr('class', 'fas fa-times opt-shadow');

            let sibsP = $($optionsClass[x]).prevAll();
            let sibsN = $($optionsClass[x]).nextAll();
            let index = optCount - sibsN.length;
            //make other options retreat when you open another one and change their icon
            //all previous siblings
            if(sibsP.length > 0){
                for(let y in sibsP){
                    if($(sibsP[y]).css('right') !== 0){
                        $(sibsP[y]).animate({'right': 0}, 250);
                        $($iconElement[y]).attr('class', $iconClass[y]);
                        $($optionsClass[y]).removeClass('opt-shadow');
                    }
                }
            }
            //all next siblings
            if(sibsN.length > 0){
                for( let z in sibsN){
                    if($(sibsN[z]).css('right') !== 0){
                        $(sibsN[z]).animate({'right': 0}, 250);
                        $($iconElement[index]).attr('class', $iconClass[index]);
                        $($optionsClass[index]).removeClass('opt-shadow');
                    }
                    index++;
                }
            }
        }
        else{
            $optionContainer.animate( {'right': 0}, 250).removeClass('opt-shadow');
            $icon.attr('class', $iconClass[x]);
        }
    });
};

/** mobile navigation configuration */
const $mobIcon = $('.mobile-navigation i');
const $mobileNav = $('.mobile-navigation');
$mobIcon.on('click', ()=>{
    if($mobIcon.attr('class') !== 'fas fa-times' ){
        $mobIcon.next().animate({'right': 0}, 250);
        $mobIcon.attr('class','fas fa-times');
    }
    else{
        $mobIcon.next().animate({'right': '-768px'}, 300);
        $mobIcon.attr('class','fas fa-bars');
    }
});

/** mobile search configuration*/
const $mobSearchIcon =$('.mob-search .fa-search');
const $searchForm = $('.mob-search form');
const $searchFormInput = $searchForm.find('input[type="text"]');
$mobSearchIcon.on('click', () => {
  if( $searchForm.css('display') !== 'block'){
    $mobSearchIcon.css('color', '#f24d4d');
    $searchForm.slideDown();
    $searchFormInput.focus();
  }
  else{
    $mobSearchIcon.css('color', 'white');
    $searchForm.slideUp();
  }
});
$searchFormInput.on('blur', ()=>{
  $searchForm.slideUp();
  $mobSearchIcon.css('color', 'white');
});

/** colour for home page views, likes and answered if count is greater than 0*/

//  answer count color
const homeAnswered = $('.answer-count a:last-child');
for( let x in homeAnswered){
  let current = Number(homeAnswered[x].text);
  if( current > 0){
      $(homeAnswered[x]).addClass('answered');
  }
}
// likes count color
const homeLiked = $('.likes-count a:last-child');
for( let x in homeLiked){
  let current = Number(homeLiked[x].text);
  if( current > 0){
      $(homeLiked[x]).addClass('liked');
  }
}
// views count color
const homeViews = $('.views-count a:last-child');
for( let x in homeViews){
  let current = Number(homeViews[x].text);
  if( current > 0){
      $(homeViews[x]).addClass('viewed');
  }
}

});
