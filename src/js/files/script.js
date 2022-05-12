// Импорт функционала ==============================================================================================================================================================================================================================================================================================================================
// import { isMobile } from "./functions.js";
// import { formsModules } from "./forms/forms.js";


import $ from "jquery";
import "jquery-mask-plugin";
import "Selectric";










$(document).ready(function () {
	// Тип арены
	$('#selectComplex').selectric({
		arrowButtonMarkup: '<svg class="arrow" width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L7 7L13 1" stroke="#C4C4C4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
		disableOnMobile: false,
		nativeOnMobile: false
	});


	// Вид спорта
	$('#selectSportType').selectric({
		arrowButtonMarkup: '<svg class="arrow" width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L7 7L13 1" stroke="#C4C4C4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
		disableOnMobile: false,
		nativeOnMobile: false
	});

	// Официальный представитель 
	$('#selectOfficial').selectric({
		arrowButtonMarkup: '<svg class="arrow" width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L7 7L13 1" stroke="#C4C4C4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
		disableOnMobile: false,
		nativeOnMobile: false
	});

	// Город
	$('#selectCity').selectric({
		arrowButtonMarkup: '<svg class="arrow" width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L7 7L13 1" stroke="#C4C4C4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
		disableOnMobile: false,
		nativeOnMobile: false
	});

	// Метро
	$('#selectMetro').selectric({
		arrowButtonMarkup: '<svg class="arrow" width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L7 7L13 1" stroke="#C4C4C4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
		disableOnMobile: false,
		nativeOnMobile: false
	});

	// Команда
	$('#selectTeam').selectric({
		arrowButtonMarkup: '<svg class="arrow" width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L7 7L13 1" stroke="#C4C4C4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
		disableOnMobile: false,
		nativeOnMobile: false
	});

	// Тренировка + игра
	$('#selectTraining').selectric({
		arrowButtonMarkup: '<svg class="arrow" width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L7 7L13 1" stroke="#C4C4C4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
		disableOnMobile: false,
		nativeOnMobile: false
	});


	// Организатор
	$('#selectSponsor').selectric({
		arrowButtonMarkup: '<svg class="arrow" width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L7 7L13 1" stroke="#C4C4C4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
		disableOnMobile: false,
		nativeOnMobile: false
	});




	// Тип арены
	$('#selectArenaType').selectric({
		arrowButtonMarkup: '<svg class="arrow" width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L7 7L13 1" stroke="#C4C4C4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
		disableOnMobile: false,
		nativeOnMobile: false
	});


	// Пол
	$('#selectGenderType').selectric({
		arrowButtonMarkup: '<svg class="arrow" width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L7 7L13 1" stroke="#C4C4C4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
		disableOnMobile: false,
		nativeOnMobile: false
	});

	// Возраст
	$('#selectAgeType').selectric({
		arrowButtonMarkup: '<svg class="arrow" width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L7 7L13 1" stroke="#C4C4C4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
		disableOnMobile: false,
		nativeOnMobile: false
	});


	// Время ОТ
	$('#selectTimeFromType').selectric({
		arrowButtonMarkup: '<svg class="arrow" width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L7 7L13 1" stroke="#C4C4C4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
		disableOnMobile: false,
		nativeOnMobile: false
	});

	// Время ДО
	$('#selectTimeToType').selectric({
		arrowButtonMarkup: '<svg class="arrow" width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L7 7L13 1" stroke="#C4C4C4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
		disableOnMobile: false,
		nativeOnMobile: false
	});

	// Тип мероприятия
	$('#selectEventType').selectric({
		arrowButtonMarkup: '<svg class="arrow" width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L7 7L13 1" stroke="#C4C4C4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
		disableOnMobile: false,
		nativeOnMobile: false
	});

	// День недели
	$('#selectDayType').selectric({
		arrowButtonMarkup: '<svg class="arrow" width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L7 7L13 1" stroke="#C4C4C4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
		disableOnMobile: false,
		nativeOnMobile: false
	});

	// Маска для телефона
	$('.form__input_phone').mask('+7 (000) 000 00 00');

	// Убирается фокус для переключателей
	$(window).keyup(function (e) {
		var target = $('.checkbox__label input:focus');
		if (e.keyCode == 9 && $(target).length) {
			$(target).parent().addClass('focused');
		}
	});

	$('.checkbox__label input').focusout(function () {
		$(this).parent().removeClass('focused');
	});
})