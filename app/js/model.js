 class ScrollElem {
	constructor(el, bg) {
		this.el = el;
		this.bg = bg;
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
			let arr = [];
			let circleFunc = () => {


				this.el[count].style.opacity = `${(count+1) - ((window.pageYOffset)/this.checkSize()[count] * 1.2)}`;
				this.bg[count].style.transform = `translate(-50%, -50%) scale(${(count+1) - (window.pageYOffset/this.checkSize()[count])})`;
				if(window.pageYOffset >= this.summHeigth()[count]) {
						arr[count] = count;
						this.el[count].style.opacity = '0';
						this.bg[count].style.transform = 'translate(-50%, -50%) scale(0)';
						if(count < this.el.length - 1) count++;
						
					} else if(window.pageYOffset < this.summHeigth()[count] && count > 0){
						count = arr[count - 1];
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


	export {
		ScrollElem,
		setZindex
	}