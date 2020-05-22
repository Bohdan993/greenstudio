import {
    swiper,
    Swal
} from '../libs/libs';
import {
    throttle,
    serialize
} from './helpers'




class ScrollElem {
    constructor(el, bg, hidden, header, afterHidden) {
        this.el = el;
        this.bg = bg;
        this.hidden = hidden;
        this.header = header;
        this.afterHidden = afterHidden;
    }




    static wrapperHeight(el, lastElem) {




        //   let unwrap = function (wrapper) {
        //     // place childNodes in document fragment
        //     var docFrag = document.createDocumentFragment();
        //     while (wrapper.firstChild) {
        //         var child = wrapper.removeChild(wrapper.firstChild);
        //         docFrag.appendChild(child);
        //     }

        //     // replace wrapper with document fragment
        //     wrapper.parentNode.replaceChild(docFrag, wrapper);
        // }


        // let wrap = function (tagname, classname, nodes, where) {
        //   let elem = document.createElement(tagname);
        //   elem.classList.add(classname);
        //   let children = document.querySelectorAll(nodes);

        //   console.log(children);
        //   children.forEach((el, ind)=>{
        //     elem.appendChild(el);
        //   })

        //   document.querySelector(where).insertAdjacentHTML('afterEnd', elem);

        // }




        let addSizes = function() {
            // let offset = 0;
            let flag = false;
            el.style.top = 'auto';
            el.style.left = 'auto';
            el.style.bottom = 'auto';
            el.style.right = 'auto';
            el.style.display = 'block';
            el.style.width = '100%';
            el.style.boxSizing = 'content-box';
            el.style.minHeight = el.style.height = document.documentElement.clientHeight + 'px';
            el.style.position = 'relative';
            let pb = [...el.querySelectorAll('.circle__layer')].map(function(item, ind) {
                return item.offsetHeight;
            })
            let pbSum = pb.reduce(function(previousValue, currentValue) {
                return previousValue + currentValue;
            })

            // console.log(pbSum);

            el.style.paddingBottom = pbSum + 'px';



            let addSizes2 = function(a) {
                // console.log(a);
                // console.log(this);
                let pb = [...el.querySelectorAll('.circle__layer')].map(function(item, ind) {
                    return item.offsetHeight;
                })
                // console.log(pb);
                let pbSum = pb.reduce(function(previousValue, currentValue) {
                    return previousValue + currentValue;
                })
                if (this.pageYOffset > pbSum && !flag) {

                    lastElem.style.position = 'relative';
                    el.style.paddingTop = pbSum + 'px';
                    el.style.paddingBottom = 0 + 'px';
                    // console.log(flag);
                    flag = true;
                } else if (this.pageYOffset < pbSum && flag) {
                    // flag = false;
                    lastElem.style.position = 'fixed';
                    el.style.paddingBottom = pbSum + 'px';
                    el.style.paddingTop = 0 + 'px';
                    flag = false;
                }
            }

            addSizes2 = throttle(addSizes2, 20);
            window.addEventListener('scroll', function(e) {
                if (this.innerWidth > 767 && this.innerHeight > 720) {
                    addSizes2.call(this);
                }
            });
            window.addEventListener('resize', function(e) {
                if (this.innerWidth > 767 && this.innerHeight > 720) {
                    addSizes2.call(this);
                }
            });
            // console.log(offset);

        }
        window.addEventListener('resize', function(e) {
            if (this.innerWidth > 767 && this.innerHeight > 720) {
                addSizes.call(this);
                // wrap('div', '.scrollmagic', '.scrollmagic-elem', '.header');
            } else {
                // unwrap(document.querySelector('.scrollmagic'));
            }

        });
        window.addEventListener('load', function(e) {
            if (this.innerWidth > 767 && this.innerHeight > 720) {
                addSizes.call(this);
            } else {
                // unwrap(document.querySelector('.scrollmagic'));
            }
        });
    }

    checkSize() {
        let arr = this.el.map(function(elem, ind) {
            return elem.offsetHeight;
        })
        return arr;
    }


    summHeigth() {
        let acc = [];
        let arr = this.checkSize().reduce(function(previousValue, currentValue) {
            acc.push(previousValue);
            return previousValue + currentValue;
        })
        acc.push(arr);
        return acc;
    }


    scroll() {

        let count = 0;
        let flag = false;
        let arr = [];
        let circleFunc = () => {

            if (window.pageYOffset === 0) {
                this.el.forEach((el, ind) => {
                    el.style.opacity = '1';
                    el.parentNode.style.pointerEvents = 'all';
                })

                count = 0;
            }




            let diff = (window.pageYOffset / (this.summHeigth()[count] / (count + 1)) - count) < 0.3;

            diff ? this.el[count].style.opacity = `${(((window.pageYOffset - +this.summHeigth()[count]) * -1) / this.checkSize()[count]) + 0.05}` : this.el[count].style.opacity = `${(((window.pageYOffset - +this.summHeigth()[count]) * -1) / this.checkSize()[count]) - 0.5}`;
            diff ? this.bg[count].style.transform = `translate(-50%, -50%) scale(${(count+1) - ((window.pageYOffset * 0.8)/this.checkSize()[count])})` : this.bg[count].style.transform = `translate(-50%, -50%) scale(${(count+1) - (window.pageYOffset/this.checkSize()[count])})`;
            if (this.hidden[count + 1] !== undefined) {
                this.hidden[count + 1].style.pointerEvents = 'all';
                this.hidden[count + 1].style.opacity = '1';
                this.hidden[count + 1].style.background = 'rgba(0,0,0,0.94)';
            }


            if (window.pageYOffset >= this.summHeigth()[count]) {
                this.el[count].style.opacity = '0';
                this.bg[count].style.transform = 'translate(-50%, -50%) scale(0)';
                if (this.hidden[count + 1] !== undefined) {
                    this.hidden[count + 1].style.opacity = '0';
                    this.hidden[count + 1].style.pointerEvents = 'none';
                }

                if (count < this.el.length - 1) {
                    this.el[count].parentNode.style.pointerEvents = `none`;
                    this.el[count].parentNode.querySelectorAll('.swiper-container-fade').forEach((item, index) => {
                        item.style.pointerEvents = `none`;
                    })

                    this.el[count].parentNode.querySelectorAll('.swiper-slide-active').forEach((item, index) => {
                        item.style.pointerEvents = `none`;
                    })
                    count++;

                }

            } else if (window.pageYOffset < this.summHeigth()[count] - this.summHeigth()[0] && count > 0) {
                count--;

                this.el[count].parentNode.style.pointerEvents = `all`;
                this.hidden[count + 1].style.pointerEvents = 'all';
                this.hidden[count + 1].style.opacity = '1';
                this.hidden[count + 1].style.background = 'rgba(0,0,0,0.94)';
                this.bg[count].style.transform = `translate(-50%, -50%) scale(${(count+1) - (window.pageYOffset/this.checkSize()[count])})`;

                this.el[count].parentNode.querySelectorAll('.swiper-container-fade').forEach((item, index) => {
                    item.style.pointerEvents = `auto`;
                })

                this.el[count].parentNode.querySelectorAll('.swiper-slide-active').forEach((item, index) => {
                    item.style.pointerEvents = `auto`;
                })

                // console.log(this.el[count].parentNode);
            }

            // console.log(count);

            if (window.pageYOffset > 1200 * this.el.length) {
                console.log(1);
                this.afterHidden.style.opacity = '0';
                this.afterHidden.style.pointerEvents = 'none';
            } else if (window.pageYOffset < 1200 * this.el.length && window.innerHeight > 1200) {
                this.afterHidden.style.opacity = '1';
                this.afterHidden.style.pointerEvents = 'all';
                console.log(2);
            }

            if (this.el[count].parentNode.parentNode.clientHeight - this.el[count].clientHeight <= window.pageYOffset && !flag) {
                // this.header.classList.add('active');
                // console.log(this.header);
                this.el.forEach((el, index) => {
                    el.style.opacity = '0';
                })
                this.bg.forEach((el, index) => {
                    el.style.transform = 'translate(-50%, -50%) scale(0)';
                })

                this.el.forEach((el, index) => {
                    el.parentNode.style.pointerEvents = 'none';

                })

                this.afterHidden.style.opacity = '0';
                this.afterHidden.style.pointerEvents = 'none';


                flag = true;
            } else if (this.el[count].parentNode.parentNode.clientHeight - this.el[count].clientHeight >= window.pageYOffset && flag) {
                this.el[this.el.length - 1].parentNode.style.pointerEvents = 'all';
                this.afterHidden.style.opacity = '1';
                this.afterHidden.style.pointerEvents = 'all';
                if (window.pageYOffset < 1200 * this.el.length) {
                    this.afterHidden.style.opacity = '1';
                    this.afterHidden.style.pointerEvents = 'all';
                }
                flag = false;
            }
        }
        setTimeout(() => {
            window.addEventListener('load', function() {
                if (this.innerWidth > 767 && this.innerHeight > 720) {
                    circleFunc();
                }
            })
        }, 0);
        window.addEventListener('scroll', function() {
            if (this.innerWidth > 767 && this.innerHeight > 720) {
                circleFunc();
            }
        });
        window.addEventListener('resize', function() {
            if (this.innerWidth > 767 && this.innerHeight > 720) {
                circleFunc();
            }
        })

    }

}



class TapPopup {
    constructor(openBtns, closeBtns) {
        this.openBtns = openBtns;
        this.closeBtns = closeBtns;
    }


    init() {
        this.open();
        // this.close();
    }

    open() {

        this.openBtns.forEach((el, ind) => {
            let flag = false
            let attr = el.getAttribute("data-open");
            el.addEventListener('click', () => {
                let elem = document.querySelector(attr);
                // console.log(el);
                elem.classList.toggle('open');
                if (!flag) {
                    el.querySelector('.tap-close-ico').textContent = 'close';
                    el.parentNode.classList.add('open');
                    flag = true;
                } else {
                    el.querySelector('.tap-close-ico').textContent = 'phone';
                    el.parentNode.classList.remove('open');
                    flag = false;
                }

            })
        })
    }
}




let setZindex = (el) => {
    el.forEach(function(item, ind) {
        item.style.zIndex = el.length - ind;
    })
}



let portfolio = (cards) => {

    // cards.forEach(card=>{
    //  let count = 0,
    //  flag = false,
    //  timer;
    //  card.addEventListener('mouseover', function(e){
    //      timer = setTimeout(function innerFunc(){
    //      count++;
    //      card.querySelector('img').style.transform = `translateY(${-count}px)`;
    //      setTimeout(innerFunc, 10)
    //    }, 10)

    //  })

    //  card.addEventListener('mouseleave', function(e){
    //    clearTimeout(timer);
    //  })
    // })
}


let focusField = (fields) => {
    fields.forEach((el, ind) => {
        el.addEventListener('focus', function() {
            el.parentNode.querySelector('label').classList.remove('active-label_g');
            el.parentNode.querySelector('label').classList.add('active-label');
            el.parentNode.parentNode.querySelector('.tap-popup__form-ico').style.color = '#2ac3ad';
        })
    })
}


let blurField = (fields) => {
    fields.forEach((el, ind) => {
        el.addEventListener('blur', function() {
            el.parentNode.querySelector('label').classList.remove('active-label');
            el.parentNode.parentNode.querySelector('.tap-popup__form-ico').style.color = '#1a8374';

            if (el.value !== "") {
                el.parentNode.querySelector('label').classList.add('active-label_g');
            } else {
                el.parentNode.querySelector('label').classList.remove('active-label_g');
            }
        })
    })
}

let feedbackSwiper = new swiper('.feedback__tabs', {
    // direction: 'vertical',
    observer: true,
    // loop: true,
    spaceBetween: 30,
    lazy: true,
    grabCursor: true,
    preloadImages: false,
    // centeredSlides: true,
    centerInsufficientSlides: true,
    slidesPerView: 1,
    breakpoints: {
        768: {
            slidesPerView: 2,
            spaceBetween: 40,
        },
    }
    // fadeEffect: {
    // crossFade: true
    // },
    // effect: 'fade',
});


let tabsSwitch = (tabs) => {
    let slides = document.querySelectorAll('.feedback-slide');
    slides = [...slides];
    tabs.forEach((el, ind) => {
        if (el.classList.contains('active')) {
            let attr = el.getAttribute('data-tab');
            slides.forEach((el, ind) => {
                let filter = el.getAttribute('data-card');
                if (filter !== attr) {
                    el.style.display = 'none';
                } else {
                    el.style.display = 'flex';
                }
            })
        }

        feedbackSwiper.update();
        feedbackSwiper.slideToLoop(0);
        el.addEventListener('click', function() {
            tabs.forEach((elem) => {
                elem.classList.remove('active');
            })
            el.classList.add('active');
            let attr = el.getAttribute('data-tab');
            el.parentNode.setAttribute('data-active', attr);

            slides.forEach((el, ind) => {
                let filter = el.getAttribute('data-card');
                if (filter !== attr) {
                    el.style.display = 'none';
                } else {
                    el.style.display = 'flex';
                }
            })


            feedbackSwiper.update();
            feedbackSwiper.slideToLoop(0);
            // feedbackSwiper.scrollbar.updateSize();
        })
    })
}



let burgerMenu = (open, close) => {
    open.addEventListener('click', function() {
        document.querySelector('body').classList.add('fixed');
        document.querySelector('body').classList.add('open-menu');
    })

    close.addEventListener('click', function() {
        let promise = new Promise(function(res, rej) {
            let interval = setTimeout(() => {
                document.querySelector('body').classList.remove('fixed');
                res(interval);
            }, 700)

        })

        promise.then(res => clearTimeout(res));


        document.querySelector('body').classList.remove('open-menu');
    })
}




let listenSound = () => {
    document.addEventListener("click", function(e) {
        playSound(e);
    });
    let audioSounds = document.querySelectorAll(".audio-sound");
    let playState = [];
    audioSounds.forEach(el => playState.push(false));

    function playSound(e) {


        if (e.target.classList.contains('feedback-audio__sound-play')) {
            let audio = e.target.parentNode.parentNode.querySelector(".audio-sound");
            audioSounds.forEach((el, i) => {
                if (el == audio) {
                    let interval;
                    console.log(i);
                    if (!playState[i]) {
                        document.querySelectorAll('.audio-sound').forEach((el, ind) => {
                            el.pause();
                            playState[ind] = false;
                            el.parentNode.querySelector('.feedback-audio__sound-play').classList.remove('paused');
                            el.parentNode.querySelector('.feedback-audio__sound-play').setAttribute('title', 'Воспроизвести');
                            el.parentNode.querySelectorAll('svg').forEach((el, ind) => {
                                el.classList.remove('active-state');
                            })
                            el.parentNode.querySelector('svg:nth-child(1)').classList.add('active-state');
                            el.previousElementSibling.style.color = '#fafafa';
                            el.parentNode.querySelector('.feedback-audio__sound-progress').style.background = '#f2f3f3';
                        })
                        audio.play();
                        playState[i] = true;

                        e.target.classList.add('paused');
                        e.target.setAttribute('title', 'Приостановить');

                        e.target.querySelectorAll('svg').forEach((el, ind) => {
                            el.classList.remove('active-state');
                        })

                        e.target.querySelector('svg:nth-child(2)').classList.add('active-state');

                        e.target.parentNode.nextElementSibling.style.color = '#f2f3f3';
                        e.target.parentNode.parentNode.querySelector('.feedback-audio__sound-progress').style.background = '#1a8374';
                        e.target.parentNode.parentNode.querySelector('.feedback-audio__sound-progress').style.display = 'block';

                        interval = setInterval(() => {
                            e.target.parentNode.parentNode.querySelector('.feedback-audio__sound-progress').style.width = `${(audio.currentTime / audio.duration) * 100}%`;
                            if (audio.paused) {
                                clearInterval(interval);
                            }
                        }, 100);

                        audio.addEventListener("ended", function() {
                            playState[i] = false;
                            console.log(playState);

                            e.target.parentNode.parentNode.querySelector('.feedback-audio__sound-progress').style.display = 'none';

                            e.target.classList.remove('paused');
                            e.target.setAttribute('title', 'Воспроизвести');


                            e.target.parentNode.nextElementSibling.style.color = '#fafafa';

                            e.target.querySelectorAll('svg').forEach((el, ind) => {
                                el.classList.remove('active-state');
                            })
                            e.target.querySelector('svg:nth-child(1)').classList.add('active-state');
                        });
                    } else {
                        audio.pause();
                        playState[i] = false;

                        e.target.classList.remove('paused');
                        e.target.setAttribute('title', 'Воспроизвести');

                        e.target.querySelectorAll('svg').forEach((el, ind) => {
                            el.classList.remove('active-state');
                        })

                        e.target.querySelector('svg:nth-child(1)').classList.add('active-state');

                        e.target.parentNode.nextElementSibling.style.color = '#fafafa';

                        e.target.parentNode.parentNode.querySelector('.feedback-audio__sound-progress').style.background = '#f2f3f3';

                    }
                }
            })
        }
    }



    document.querySelectorAll('.feedback-audio__sound-progress-wrap').forEach((el, ind) => {
        el.addEventListener('click', function(e) {

            let audioTime = el.parentNode.querySelector('.audio-sound');
            let duration = audioTime.duration;


            if (
                el.parentNode.querySelector('.feedback-audio__sound-play svg:first-child').classList.contains('active-state')
            ) {
                el.querySelector('.feedback-audio__sound-progress').style.background = '#f2f3f3';
            }


            if (duration > 0) {
                // let offset = $(this).offset();
                let box = el.getBoundingClientRect();
                let offsetLeft = box.left + pageXOffset;

                let left = e.clientX - offsetLeft;

                let width = el.offsetWidth;

                el.querySelector(".feedback-audio__sound-progress").style.width = `${(left / width) * 100}%`;
                el.querySelector(".feedback-audio__sound-progress").style.display = "block";
                audioTime.currentTime = ((duration * left) / width);
            }

            return false;

        })
    })

}


let playVideo = (btn) => {
    btn.forEach((el, ind) => {
        el.addEventListener('click', function() {
            let video = el.parentNode.getAttribute('data-video');
            let youtube = '<iframe src="https://www.youtube.com/embed/' + video + '?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>';
            el.parentNode.insertAdjacentHTML('beforeend', youtube);
        })

    })
}





let animate = (elems) => {
    let constantOffset = window.innerHeight * 0.6;
    // console.log(constantOffset);
    elems.forEach((el, ind) => {
        function anim() {
            let offsetTop = el.getBoundingClientRect().top;
            if (offsetTop < constantOffset) {
                el.classList.add('animation');
            }
        }
        anim = throttle(anim, 100);
        window.addEventListener('scroll', anim)
    })

}



let telPopup = (elem) => {

    elem.addEventListener('click', function() {
        Swal.fire({
            html: `<div id="tel-popup" class="tel-popup">
                  <div class="center">
                    <h2 class="h2-title">
                      Наш номер
                    </h2>
                    <div class="f-container">
                      <select name="phone-select" id="phone-select" class="phone-select">
                        <option value="tel:+380954631629">+38 (095) 463 16 29</option>
                      </select>
                      <div class="popup-links-block">
                        <div class="main-btn close-alert"><span class="btn-overlay"></span><span class="btn-text">Отменить</span></div>
                        <a href="tel:+380637865328" class="main-btn tel-popup__btn"><span class="btn-overlay"></span><span class="btn-text">Вызвать</span></a>
                      </div>
                    </div>
                  </div>
                </div>`,
            showClass: {
                popup: 'swal2-noanimation',
                backdrop: 'swal2-noanimation'
            },
            hideClass: {
                popup: 'swal2-noanimation-out',
                backdrop: 'swal2-noanimation-out'
            },
            showConfirmButton: false,
        })
        let btn = document.querySelector('.close-alert');
        btn.addEventListener('click', function() {
            Swal.close();
        })

        let telVal = (select, link) => {
            console.log(2323);
            let telSelect = select.querySelector('option:checked').value;
            link.setAttribute('href', telSelect);

            select.addEventListener('change', function() {
                let telSelect = select.querySelector('option:checked').value;
                link.setAttribute('href', telSelect);
            })
        }

        let select = document.querySelector('#phone-select');
        let phoneBtn = document.querySelector('.tel-popup__btn');

        telVal(select, phoneBtn);
    })

}

let feedbackPopup = (elem) => {
    elem.forEach((el, ind) => {
        el.addEventListener('click', function() {
            let img = el.querySelector('img').getAttribute('src');
            Swal.fire({
                html: `
        <div class="center">
          <div class="f-container">
            <img src="${img}"></img>
            <div class="feedback__social social-items">
                      <i>
                          <a href="https://www.facebook.com/mavka.clothing" target="_blank" rel="nofollow noreffer noopener">
                            <img src="img/sprites/svg/facebook.svg">
                          </a>
                      </i>
                      <i>
                          <a href="https://www.instagram.com/mavka.style/" target="_blank" rel="nofollow noreffer noopener">
                            <img src="img/sprites/svg/instagram.svg">
                          </a>
                      </i>

                        
                        </div>
            <div class="main-btn close-alert"><span class="btn-overlay"></span><span class="btn-text">Окей</span></div>
          </div>
        </div>
        `,
                showClass: {
                    popup: 'swal2-noanimation feedback-popup',
                    backdrop: 'swal2-noanimation'
                },
                hideClass: {
                    popup: 'swal2-noanimation-out feedback-popup ',
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
}

let getCoords = (elem) => {
    let box = elem.getBoundingClientRect();

    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };
}


let smoothScroll = (elem) => {
    elem.forEach((el, ind) => {
        el.addEventListener('click', function() {

            let attr = +el.getAttribute('data-index');

            if (el.classList.contains('mobile__nav-link')) {

                let attr = +el.getAttribute('data-index') || null;
                let href = el.getAttribute('href');
                let htmlElem = document.querySelector(href);
                let coords = getCoords(htmlElem);
                let promise = new Promise(function(res, rej) {
                    let interval = setTimeout(() => {
                        document.querySelector('body').classList.remove('fixed');
                        res(interval);
                    }, 850)
                })

                promise.then(res => clearTimeout(res))
                    .then(() => {
                        if (window.innerWidth > 767) {
                            window.scroll({
                                top: window.innerHeight * attr || coords.top - 64,
                                left: 0,
                                behavior: 'smooth'
                            });
                        } else {
                            window.scroll({
                                top: coords.top,
                                left: 0,
                                behavior: 'smooth'
                            });
                        }
                    });
                document.querySelector('body').classList.remove('open-menu');
            }


            window.scroll({
                top: window.innerHeight * attr,
                left: 0,
                behavior: 'smooth'
            });



        })
    })
}









let sendForm = (formid, urlname) => {

    let form = document.querySelector(formid);



    form.addEventListener("submit", function(event) {
        event.preventDefault();
        let data = serialize(form);
        let request = new XMLHttpRequest();
        request.open("POST", urlname, true);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send(data);

        request.addEventListener('readystatechange', () => {
            if (request.readyState != 4) return;

            if (request.status != 200 && request.readyState != 4) {
                alert(request.status + ': ' + request.statusText);
            } else {
                if (request.responseText === 'send_success') {
                    form.reset();
                    form.querySelectorAll('label').forEach((el) => {
                        el.classList.remove('active-label');
                        el.classList.remove('active-label_g');
                    })
                    Swal.fire({
                        // position: 'top-end',
                        icon: 'success',
                        title: 'Cпасибо!',
                        text: 'Ваша заявка отправлена',
                        showConfirmButton: false,
                        timer: 8500,
                        showClass: {
                            popup: 'swal2-noanimation',
                            backdrop: 'swal2-noanimation'
                        },
                        hideClass: {
                            popup: 'swal2-noanimation-out',
                            backdrop: 'swal2-noanimation-out'
                        },
                    })
                } else if (request.responseText === 'send_error') {
                    Swal.fire({
                        // position: 'top-end',
                        icon: 'error',
                        title: 'Ошибка!',
                        text: 'Попробуйте, пожалуйста, еще раз',
                        showConfirmButton: false,
                        timer: 4500,
                        showClass: {
                            popup: 'swal2-noanimation',
                            backdrop: 'swal2-noanimation'
                        },
                        hideClass: {
                            popup: 'swal2-noanimation-out',
                            backdrop: 'swal2-noanimation-out'
                        },
                    })
                }
            }
        })


    });
}




export {
    ScrollElem,
    setZindex,
    portfolio,
    // drawCanvas,
    TapPopup,
    focusField,
    blurField,
    tabsSwitch,
    feedbackSwiper,
    burgerMenu,
    listenSound,
    playVideo,
    // opacityTransformAnimate,
    animate,
    telPopup,
    smoothScroll,
    feedbackPopup,
    sendForm
    // telVal
}