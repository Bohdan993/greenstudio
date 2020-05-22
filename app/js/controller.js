import {
    ScrollElem,
    setZindex,
    portfolio,
    TapPopup,
    focusField,
    blurField,
    tabsSwitch,
    feedbackSwiper,
    burgerMenu,
    listenSound,
    playVideo,
    animate,
    telPopup,
    smoothScroll,
    feedbackPopup,
    sendForm
} from './model';

import {
    preview,
    prevBg,
    scrollmagic,
    circleSections,
    circleHidden,
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
    anim,
    headerTopBtn,
    circleLink,
    afterHidden,
    feedbackScreenshots
} from './view';

import {
    swiper,
    waves,
    Swal,
    Lazyload
} from '../libs/libs';


let app = {
    init() {
        this.scroll();
        this.scrollmagic();
        this.setzindex();
        this.portfolio();
        this.swiper();
        this.waves();
        this.tapTarget();
        this.textFields();
        this.tabs();
        this.burger();
        this.sound();
        this.video();
        this.animation();
        this.popups();
        this.preloader();
        this.smoothScroll();
        this.ajaxForms();
        this.lazyload();
    },
    scroll() {
        let el = new ScrollElem(preview, prevBg, circleHidden, header, afterHidden);
        el.scroll();
    },
    scrollmagic() {
        ScrollElem.wrapperHeight(scrollmagic, lastElem);
    },

    setzindex() {
        setZindex(circleSections);
    },

    portfolio() {
        portfolio(portfolioCards);
    },

    swiper() {
        let mySwiper = new swiper('.swiper-container', {
            // Optional parameters
            // direction: 'vertical',
            // init: false,
            slidesPerView: 2,
            preloadImages: false,
            // Enable lazy loading
            lazy: true,
            loop: true,
            spaceBetween: 0,

            // If we need pagination
            pagination: {
                el: '.swiper-pagination',
                type: 'fraction',
                renderFraction: function(currentClass, totalClass) {
                    return '<span class="swiper-count ' + currentClass + '"></span>' + ' <span class="pagination-divider"> из </span>' + '<span class="swiper-count ' + totalClass + '"></span>';
                }

            },


            // Navigation arrows
            navigation: {
                nextEl: '.swiper-control-next',
                prevEl: '.swiper-control-prev',
            },

            on: {
                resize: function() {
                    mySwiper.changeDirection(getDirection());
                },
                init: function() {
                    this.changeDirection(getDirection());
                }
            },

            breakpoints: {
                768: {
                    spaceBetween: 30,
                },
            }

        })
        mySwiper.on('slideChange', function() {

            [].forEach.call(this.slides, function(el, ind, arr) {
                // this.slides[this.realIndex]
                el.style.pointerEvents = `none`;
            })


            this.slides[this.activeIndex].style.pointerEvents = 'all';


        });

        function getDirection() {
            let windowWidth = window.innerWidth;
            let direction = window.innerWidth <= 767 ? 'vertical' : 'horizontal';

            return direction;
        }

    },

    waves() {
        waves.init();
        waves.attach('.wave', ['waves-button', 'waves-float']);

        // console.log(document.querySelector('.leave-contact__img').getBoundingClientRect().top + document.body.scrollTop);
    },

    tapTarget() {
        let myTapPopup = new TapPopup(tapOpen);
        myTapPopup.init();
    },

    textFields() {
        focusField(textFields);
        blurField(textFields);
    },

    tabs() {
        tabsSwitch(tabs);
    },

    burger() {
        burgerMenu(burger, closeBurger);
    },

    sound() {
        listenSound();
    },

    video() {
        playVideo(playBtns);
    },

    animation() {
        // opacityTransformAnimate(opacTaransform);
        animate(anim);
    },

    popups() {
        document.querySelectorAll('.portfolio-content').forEach((el, ind) => {
            el.addEventListener('click', function() {
                let img = el.querySelector('img').getAttribute('src');
                Swal.fire({
                    html: `
					<div class="center">
            <div class="f-container">
							<img src="${img}"></img>
							<div class="main-btn close-alert"><span class="btn-overlay"></span><span class="btn-text">Окей</span></div>
						</div>
					</div>
					`,
                    showClass: {
                        popup: 'swal2-noanimation portfolio-popup',
                        backdrop: 'swal2-noanimation'
                    },
                    hideClass: {
                        popup: 'swal2-noanimation-out portfolio-popup ',
                        backdrop: 'swal2-noanimation-out'
                    },
                    showConfirmButton: false,
                })
                let btn = document.querySelector('.close-alert');
                btn.addEventListener('click', function() {
                    Swal.close();
                })
            })
        })

        telPopup(headerTopBtn);
        feedbackPopup(feedbackScreenshots);

        // document.querySelector('.header__top-nav-link').addEventListener('click', function(){
        // 	window.scroll({
        // 		  top: window.innerHeight, 
        // 		  left: 0, 
        // 		  behavior: 'smooth'
        // 		});
        // })

    },
    preloader() {
        window.addEventListener('load', function() {
            document.body.classList.add('loaded_hiding');
            window.setTimeout(function() {
                document.body.classList.add('loaded');
                document.body.classList.remove('loaded_hiding');
            }, 1500);
        })

    },

    smoothScroll() {
        smoothScroll(circleLink);
    },

    ajaxForms() {
        document.querySelectorAll('form').forEach((el, ind) => {
            sendForm("#" + el.id, '/mail/mail.php')
        })
    },

    lazyload(){
    	let lazyLoadInstance = new Lazyload({
    		elements_selector: ".lazy",
    		use_native: true
    // ... more custom settings?
			});
    }

}




export {
    app
}