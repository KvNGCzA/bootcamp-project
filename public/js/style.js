'use strict';

$(document).ready(function () {
    /** home questions tabs JQueryUI*/
    var homeQuestions = $('#hQuestions');
    homeQuestions.tabs();

    /** quick options configurations */
    //show and hide quick options
    var opt = $('.quick-options');
    var optCount = opt.children().length;
    //quick options icon array
    var $iconElement = ['.quick-search i', '.quick-question i'];
    //quick options class array
    var $optionsClass = ['.quick-search', '.quick-question'];
    //quick options icon class array
    var $iconClass = ['fas fa-search', 'fas fa-pencil-alt'];

    var _loop = function () {
        function _loop(x) {
            var $icon = $($iconElement[x]);
            var $optionContainer = $($optionsClass[x]);
            $icon.on('click', function () {
                if ($icon.attr('class') !== 'fas fa-times opt-shadow') {
                    $optionContainer.animate({ 'right': '400px' }, 250).addClass('opt-shadow');
                    $optionContainer.find('input')[0].focus();
                    $icon.attr('class', 'fas fa-times opt-shadow');

                    var sibsP = $($optionsClass[x]).prevAll();
                    var sibsN = $($optionsClass[x]).nextAll();
                    var index = optCount - sibsN.length;
                    //make other options retreat when you open another one and change their icon
                    //all previous siblings
                    if (sibsP.length > 0) {
                        for (var y in sibsP) {
                            if ($(sibsP[y]).css('right') !== 0) {
                                $(sibsP[y]).animate({ 'right': 0 }, 250);
                                $($iconElement[y]).attr('class', $iconClass[y]);
                                $($optionsClass[y]).removeClass('opt-shadow');
                            }
                        }
                    }
                    //all next siblings
                    if (sibsN.length > 0) {
                        for (var z in sibsN) {
                            if ($(sibsN[z]).css('right') !== 0) {
                                $(sibsN[z]).animate({ 'right': 0 }, 250);
                                $($iconElement[index]).attr('class', $iconClass[index]);
                                $($optionsClass[index]).removeClass('opt-shadow');
                            }
                            index++;
                        }
                    }
                } else {
                    $optionContainer.animate({ 'right': 0 }, 250).removeClass('opt-shadow');
                    $icon.attr('class', $iconClass[x]);
                }
            });
        }

        return _loop;
    }();

    for (var x in $iconElement) {
        _loop(x);
    };

    /** mobile navigation configuration */
    var $mobIcon = $('.mobile-navigation .dropdown-menu i');
    var $dropDownMenuItems = $('.dropdown-menu-items');
    $mobIcon.on('click', function () {
        if ($mobIcon.attr('class') !== 'fas fa-times') {
            $dropDownMenuItems.animate({ 'right': 0 }, 250);
            $mobIcon.attr('class', 'fas fa-times');
        } else {
            $dropDownMenuItems.animate({ 'right': '-768px' }, 300);
            $mobIcon.attr('class', 'fas fa-bars');
        }
    });
});