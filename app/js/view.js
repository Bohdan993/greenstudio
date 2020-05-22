let preview = document.querySelectorAll('.circle__layer');

preview = [...preview];

let prevBg = [].map.call(preview, function(el, ind) {
  return el.parentNode.querySelector('.circle-bg');
})

let scrollmagic = document.querySelector('.scrollmagic');
let circleSections = document.querySelectorAll('.circle-section');
let circleHidden = [].map.call(preview, function(el, ind) {
  return el.querySelector('.cirle-hidden');
})
let portfolioCards = document.querySelectorAll('.portfolio-card');
portfolioCards = [...portfolioCards];
let header = document.querySelector('.header');


let tapOpen = document.querySelectorAll('.tap-popup-open');
tapOpen = [...tapOpen];

let tapClose = document.querySelectorAll('.tap-popup-close');
tapClose = [...tapClose];


let textFields = document.querySelectorAll('.text-field');

textFields = [...textFields];

let tabs = document.querySelectorAll('.feedback__tabs-controls-list-item');

tabs = [...tabs];


let lastElem = document.querySelector('.last-elem');


let burger = document.querySelector('.burger-wrap');
let closeBurger = document.querySelector('.close-burger-wrap');


let playBtns = document.querySelectorAll('.play');

playBtns = [...playBtns];





let anim = document.querySelectorAll('.anim');

anim = [...anim];


let headerTopBtn = document.querySelector('.header__top-btn');

let circleLink = document.querySelectorAll('.circle-nav-link');


let afterHidden = document.querySelector('.after-hidden');


let feedbackScreenshots = document.querySelectorAll('[data-card = "screenshot"]');

feedbackScreenshots = [...feedbackScreenshots];





export {
	preview,
	prevBg,
	scrollmagic,
	circleSections,
	circleHidden,
	// canvas,
	header,
	portfolioCards,
	tapOpen,
	tapClose,
	textFields,
	tabs,
	lastElem,
	burger,
	closeBurger,
	playBtns, 
	// opacTaransform,
	anim,
	headerTopBtn,
	circleLink,
	afterHidden,
	feedbackScreenshots
}