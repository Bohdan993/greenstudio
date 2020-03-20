import {ScrollElem, setZindex} from './model';
import {preview, prevBg, scrollmagic, circleSections} from './view';


let app = {
	init(){
		this.scroll();
		this.scrollmagic();
		this.setzindex();
	},
	scroll(){
		let el = new ScrollElem(preview, prevBg);
		console.log(el.checkSize());
		el.scroll();
	},
	scrollmagic(){
		ScrollElem.wrapperHeight(scrollmagic);
	},

	setzindex() {
		setZindex(circleSections);
	}
}




export {
	app
}