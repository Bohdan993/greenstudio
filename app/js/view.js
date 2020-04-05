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

// let canvas = document.querySelector('canvas');

// let swiperNumCurrent = document.querySelector('.swiper-num-current');
// let swiperNumAll = document.querySelector('.swiper-num-all');



export {
	preview,
	prevBg,
	scrollmagic,
	circleSections,
	circleHidden,
	// canvas,
	header,
	portfolioCards
}