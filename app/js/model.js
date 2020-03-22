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
			// el.style.paddingTop = window.pageYOffset + 'px';
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
			window.addEventListener('scroll', () => {
				console.log(window.pageYOffset >= this.summHeigth()[count]);
				// console.log(typeof this.checkSize());
				// console.log(this.el);

				this.el[count].style.opacity = `${(count+1) - ((window.pageYOffset)/this.checkSize()[count])}`;
				this.bg[count].style.transform = `translate(-50%, -50%) scale(${(count+1) - (window.pageYOffset/this.checkSize()[count])})`;

				if(window.pageYOffset >= this.summHeigth()[count]) {
						
						this.el[count].style.opacity = '0';
						this.bg[count].style.transform = 'translate(-50%, -50%) scale(0)';
						count++;
					} else if (window.pageYOffset >= this.summHeigth()[count] && window.pageYOffset <= this.summHeigth()[count + 1] && !flag){
						count--;
						// flag = true;
					}

					console.log(+( window.pageYOffset/this.checkSize()[1]));
				// this.el.forEach((item, ind, arr) => {
				
				// 		console.log(window.pageYOffset >= this.checkSize()[ind]);
							
				// 	// if(window.pageYOffset <= this.checkSize()[ind] && window.pageYOffset) {
				// 			arr[ind].style.opacity = `${1 - ((window.pageYOffset)/this.checkSize()[ind])}`;

				// 			// console.log(window.pageYOffset);
				// 	// }
				

				// 		if(window.pageYOffset >= this.checkSize()[ind]) {

				// 			item.style.opacity = '0';
				// 		}
				// })

				// this.bg.forEach((item, ind)=> {
				// 	item.style.transform = `translate(-50%, -50%) scale(${1 - (window.pageYOffset/this.checkSize()[ind])})`;

				// 		if(window.pageYOffset >= this.checkSize()[ind]) {
					
				
				// 		}
				// })
		

				// if(window.pageYOffset >= this.checkSize()) {
				// 	this.bg.style.transform = 'translate(-50%, -50%) scale(0)';
				// 	this.el.style.opacity = '0';
				// }
			})
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