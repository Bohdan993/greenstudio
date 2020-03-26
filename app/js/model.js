 class ScrollElem {
	constructor(el, bg, hidden) {
		this.el = el;
		this.bg = bg;
		this.hidden = hidden;
	}

	static wrapperHeight(el){
 	let addSizes = () => {

			el.style.top = 'auto';
			el.style.left = 'auto';
			el.style.bottom = 'auto';
			el.style.right = 'auto';
			el.style.display = 'block';
			el.style.boxSizing = 'content-box';
			el.style.minHeight = el.style.height = document.documentElement.clientHeight + 'px';
			el.style.position = 'relative';
			let pb = [...el.querySelectorAll('.circle__layer')].map(function(item, ind){
				return item.offsetHeight;
			})
			let pbSum = pb.reduce(function(previousValue, currentValue){
				return previousValue + currentValue;
			})

			el.style.paddingBottom = pbSum + 'px';
		}
		
		window.addEventListener('resize', addSizes);
		window.addEventListener('load', addSizes);
	}

	checkSize(){
		let arr = this.el.map(function(elem, ind){
			return elem.offsetHeight;
		})
		return arr;
	}


	summHeigth(){
		let acc = [];
		let arr = this.checkSize().reduce(function(previousValue, currentValue){
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
					// console.log(this.hidden);

					
				if(window.pageYOffset/this.checkSize()[count] >= 0.5 && !flag) {
							document.querySelector('.header').classList.add('active');
							flag = true;
						} else if (window.pageYOffset/this.checkSize()[count] <= 0.5 && flag){
								document.querySelector('.header').classList.remove('active');
								flag = false;
						}


				this.el[count].style.opacity = `${(count+1) - ((window.pageYOffset)/this.checkSize()[count] * 1.1)}`;
				this.bg[count].style.transform = `translate(-50%, -50%) scale(${(count+1) - (window.pageYOffset/this.checkSize()[count])})`;
				if(this.hidden[count + 1] !== undefined) {
					this.hidden[count + 1].style.pointerEvents = 'all';
					this.hidden[count + 1].style.opacity = '1';
					this.hidden[count + 1].style.background = 'rgba(0,0,0,0.8)';
				}
				

				if(window.pageYOffset >= this.summHeigth()[count]) {
						arr[count] = count;
						this.el[count].style.opacity = '0';
						this.bg[count].style.transform = 'translate(-50%, -50%) scale(0)';
						if(this.hidden[count + 1] !== undefined) {
						this.hidden[count + 1].style.opacity = '0';
						this.hidden[count + 1].style.pointerEvents = 'none';
					}

						if(count < this.el.length - 1) {
							this.el[count].parentNode.style.pointerEvents = `none`;
							count++;
							// this.bg[count].style.transform = 'translate(-50%, -50%) scale(1)';
						}
						
					} else if(window.pageYOffset < this.summHeigth()[count] - this.summHeigth()[count - 1] && count > 0){
						count--;
						this.el[count].parentNode.style.pointerEvents = `all`;
					}

				if(this.el[count].parentNode.parentNode.clientHeight - this.el[count].clientHeight === window.pageYOffset){
					this.el.forEach((el, index)=>{
						el.style.opacity = '0';
					})
					this.bg.forEach((el, index)=>{
						el.style.transform = 'translate(-50%, -50%) scale(0)';
					})
				}
			}
			window.addEventListener('scroll', circleFunc);
			window.addEventListener('resize', circleFunc);
		}
	}	



	let setZindex = (el) => {
		el.forEach(function(item, ind){
			item.style.zIndex = el.length - ind;
		})
	}



	let portfolio = () => {
		document.querySelector('.portfolio-card').addEventListener('click', function(){

		})
	}


	export {
		ScrollElem,
		setZindex,
		portfolio
	}