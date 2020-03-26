import {ScrollElem, setZindex, portfolio} from './model';
import {preview, prevBg, scrollmagic, circleSections, circleHidden} from './view';
import {swiper, waves} from '../libs/libs';


let app = {
	init(){
		this.scroll();
		this.scrollmagic();
		this.setzindex();
		this.portfolio();
		this.swiper();
		this.waves();
	},
	scroll(){
		let el = new ScrollElem(preview, prevBg, circleHidden);
		el.scroll();
	},
	scrollmagic(){
		ScrollElem.wrapperHeight(scrollmagic);
	},

	setzindex() {
		setZindex(circleSections);
	},

	portfolio(){
		portfolio();
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
		// mySwiper.on('slideChange', function () {
  // 		console.log(this.realIndex);
  // 		console.log(this.slides[1]);
		// });
	},

	waves(){
		waves.init();
    waves.attach('.wave', ['waves-button', 'waves-float']);
	}
}




export {
	app
}