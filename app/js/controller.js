import {ScrollElem, setZindex, portfolio, TapPopup, focusField, blurField, tabsSwitch, feedbackSwiper} from './model';
import {preview, prevBg, scrollmagic, circleSections, circleHidden, header, portfolioCards, tapOpen, tapClose, textFields, tabs, lastElem} from './view';
import {swiper, waves} from '../libs/libs';


let app = {
	init(){
		this.scroll();
		this.scrollmagic();
		this.setzindex();
		this.portfolio();
		this.swiper();
		this.waves();
		this.tapTarget();
		this.textFields();
		this.tabs();
	},
	scroll(){
		let el = new ScrollElem(preview, prevBg, circleHidden, header);
		el.scroll();
	},
	scrollmagic(){
		ScrollElem.wrapperHeight(scrollmagic, lastElem);
	},

	setzindex() {
		setZindex(circleSections);
	},

	portfolio(){
		portfolio(portfolioCards);
	},

	swiper(){
		let mySwiper = new swiper ('.swiper-container', {
    // Optional parameters
    direction: 'vertical',
    loop: true,

    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      type: 'fraction',
      renderFraction: function(currentClass, totalClass) {
      	 return '<span class="swiper-count ' + currentClass + '"></span>' + '<span class="swiper-count ' + totalClass + '"></span>';
      }

    },

    // mousewheel: {
    // 	sensitivity: 2
    // }
    slidesPerView: 1,
      fadeEffect: {
    crossFade: true
  	},
  	effect: 'fade',

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-control-next',
      prevEl: '.swiper-control-prev',
    },

    // And if we need scrollbar
    // scrollbar: {
    //   el: '.swiper-scrollbar',
    // },
  })
		mySwiper.on('slideChange', function () {

			[].forEach.call(this.slides, function(el, ind, arr){
				// this.slides[this.realIndex]
  			el.style.pointerEvents = `none`;
  		})


  		this.slides[this.activeIndex].style.pointerEvents = 'all';

  		
		});


		// let feedbackSwiper = new swiper('.feedback__tabs', {
		// 	direction: 'vertical',
		// 	loop: true,
		// 	slidesPerView: 2,
		// 	spaceBetween: 30,
  //     fadeEffect: {
	 //    crossFade: true
	 //  	},
	 //  	effect: 'fade',
		// });
	},

	waves(){
		waves.init();
    waves.attach('.wave', ['waves-button', 'waves-float']);

   // console.log(document.querySelector('.leave-contact__img').getBoundingClientRect().top + document.body.scrollTop);
	},

	tapTarget(){
		let myTapPopup = new TapPopup(tapOpen, tapClose);
		myTapPopup.init();
	},

	textFields(){
		focusField(textFields);
		blurField(textFields);
	},

	tabs(){
		tabsSwitch(tabs);
	}

}




export {
	app
}



