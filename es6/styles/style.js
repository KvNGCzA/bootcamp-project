$(document).ready(function() {
// home questions tabs JQueryUI
const homeQuestions = $('#hQuestions').tabs();

// quick options configurations 
//show and hide quick options
const opt = $('.quick-options');
const optCount = opt.children().length;
//quick options icon array
const $iconElement = ['.quick-search i', '.quick-question i'];
//quick options class array
const $optionsClass = ['.quick-search', '.quick-question'];
//quick options icon class array
const $iconClass = ['fas fa-search','fas fa-pencil-alt'];
for(let x in $iconElement) {
    let $icon = $($iconElement[x]);
    let $optionContainer = $($optionsClass[x]);
    $icon.on('click', ()=>{
        if($icon.attr('class') !== 'fas fa-times opt-shadow'){
            $optionContainer.animate( {'right': '400px'}, 250).addClass('opt-shadow');
            $optionContainer.find('input')[0].focus();
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

// mobile navigation configuration
const $mobIcon = $('.mobile-navigation .dropdown-menu i');
const $dropDownMenuItems = $('.dropdown-menu-items');
$mobIcon.on('click', ()=>{
    if($mobIcon.attr('class') !== 'fas fa-times' ){
        $dropDownMenuItems.animate({'right': 0}, 250);
        $mobIcon.attr('class','fas fa-times');
    }
    else{
        $dropDownMenuItems.animate({'right': '-768px'}, 300);
        $mobIcon.attr('class','fas fa-bars');
    }
});

// single question template edit question dropdown settings
const $editOption = $('.edit-option');
$editOption.click( function(){
    $(this).next().slideToggle();
});

});
