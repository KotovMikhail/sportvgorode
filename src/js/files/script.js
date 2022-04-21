// Импорт функционала ==============================================================================================================================================================================================================================================================================================================================
// import { isMobile } from "./functions.js";
// import { formsModules } from "./forms/forms.js";


import $ from "jquery";
import "jquery-mask-plugin";
import "Selectric";


// Тип арены
$(function () {
    $('#selectComplex').selectric({
        arrowButtonMarkup: '<svg class="arrow" width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L7 7L13 1" stroke="#C4C4C4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        disableOnMobile: false,
        nativeOnMobile: false
    });
});

// Вид спорта
$(function () {
	$('#selectSportType').selectric({
			arrowButtonMarkup: '<svg class="arrow" width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L7 7L13 1" stroke="#C4C4C4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
			disableOnMobile: false,
			nativeOnMobile: false
	});
});

// Официальный представитель 
$(function () {
    $('#selectOfficial').selectric({
        arrowButtonMarkup: '<svg class="arrow" width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L7 7L13 1" stroke="#C4C4C4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        disableOnMobile: false,
        nativeOnMobile: false

    });
});

// Город
$(function () {
    $('#selectCity').selectric({
        arrowButtonMarkup: '<svg class="arrow" width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L7 7L13 1" stroke="#C4C4C4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        disableOnMobile: false,
        nativeOnMobile: false

    });
});

// Метро
$(function () {
    $('#selectMetro').selectric({
        arrowButtonMarkup: '<svg class="arrow" width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L7 7L13 1" stroke="#C4C4C4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        disableOnMobile: false,
        nativeOnMobile: false

    });
});

// Команда
$(function () {
	$('#selectTeam').selectric({
			arrowButtonMarkup: '<svg class="arrow" width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L7 7L13 1" stroke="#C4C4C4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
			disableOnMobile: false,
			nativeOnMobile: false
	});
});

// Тренировка + игра
$(function () {
	$('#selectTraining').selectric({
			arrowButtonMarkup: '<svg class="arrow" width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L7 7L13 1" stroke="#C4C4C4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
			disableOnMobile: false,
			nativeOnMobile: false
	});
});

// Организатор
$(function () {
	$('#selectSponsor').selectric({
			arrowButtonMarkup: '<svg class="arrow" width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L7 7L13 1" stroke="#C4C4C4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
			disableOnMobile: false,
			nativeOnMobile: false
	});
});

// Организатор
$(function () {
	$('#selectSponsor').selectric({
			arrowButtonMarkup: '<svg class="arrow" width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L7 7L13 1" stroke="#C4C4C4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
			disableOnMobile: false,
			nativeOnMobile: false
	});
});

// Тип арены
$(function () {
	$('#selectArenaType').selectric({
			arrowButtonMarkup: '<svg class="arrow" width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L7 7L13 1" stroke="#C4C4C4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
			disableOnMobile: false,
			nativeOnMobile: false
	});
});

// Маска для телефона
$((function ($) {
    $('.form__input_phone').mask('+7 (000) 000 00 00');
}));



