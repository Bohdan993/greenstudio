let preview = document.querySelectorAll('.circle__layer');

preview = [...preview];

let prevBg = [].map.call(preview, function(el, ind) {
  return el.parentNode.querySelector('.circle-bg');
})

let scrollmagic = document.querySelector('.scrollmagic');
let circleSections = document.querySelectorAll('.circle-section');

export {
	preview,
	prevBg,
	scrollmagic,
	circleSections
}