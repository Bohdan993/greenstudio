 class ScrollElem {
	constructor(el, bg) {
		this.el = el;
		this.bg = bg;
	}

	static wrapperHeight(el){
		el.style.top = 'auto';
		el.style.left = 'auto';
		el.style.bottom = 'auto';
		el.style.right = 'auto';
		el.style.display = 'block';
		el.style.boxSizing = 'content-box';
		el.style.minHeight = '1500px';
		el.style.height = '1500px';
		el.style.paddingTop = '0px';
		el.style.position = 'relative';
		el.style.paddingBottom = '3000px';
	}

	checkSize(){
		return this.el.offsetHeight;
	}



	scroll() {
				window.addEventListener('scroll', () => {
				console.log(window.pageYOffset);
				console.log(this.checkSize());
				this.checkSize();
				this.el.style.opacity = `${1 - ((window.pageYOffset)/this.checkSize() * 1.2)}`;
				this.bg.style.transform = `translate(-50%, -50%) scale(${1 - (window.pageYOffset/this.checkSize())})`;

				if(window.pageYOffset >= this.checkSize()) {
					this.bg.style.transform = 'translate(-50%, -50%) scale(0)';
					this.el.style.opacity = '0';
				}
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