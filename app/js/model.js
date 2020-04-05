 class ScrollElem {
	constructor(el, bg, hidden, header) {
		this.el = el;
		this.bg = bg;
		this.hidden = hidden;
		this.header = header;
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

				
				count%2 == 0 ? this.header.classList.remove('active'): this.header.classList.add('active');


				let diff = (window.pageYOffset/ (this.summHeigth()[count]/ (count + 1)) - count) < 0.3;
			
      // console.log((count+1) - (window.pageYOffset/this.checkSize()[count] * 1.3));
      console.log(((window.pageYOffset - +this.summHeigth()[count]) * -1) / this.checkSize()[count] / 1.3);

				diff ? this.el[count].style.opacity = `${(((window.pageYOffset - +this.summHeigth()[count]) * -1) / this.checkSize()[count]) + 0.1}` : this.el[count].style.opacity = `${(((window.pageYOffset - +this.summHeigth()[count]) * -1) / this.checkSize()[count]) - 0.4}`;
				this.bg[count].style.transform = `translate(-50%, -50%) scale(${(count+1) - (window.pageYOffset/this.checkSize()[count])})`;
				if(this.hidden[count + 1] !== undefined) {
					this.hidden[count + 1].style.pointerEvents = 'all';
					this.hidden[count + 1].style.opacity = '1';
					this.hidden[count + 1].style.background = 'rgba(0,0,0,0.8)';
				}
				

				if(window.pageYOffset >= this.summHeigth()[count]) {
						this.el[count].style.opacity = '0';
						this.bg[count].style.transform = 'translate(-50%, -50%) scale(0)';
						if(this.hidden[count + 1] !== undefined) {
						this.hidden[count + 1].style.opacity = '0';
						this.hidden[count + 1].style.pointerEvents = 'none';
					}

						if(count < this.el.length - 1) {
							this.el[count].parentNode.style.pointerEvents = `none`;
							count++;
						}

					} else if(window.pageYOffset < this.summHeigth()[count] - this.summHeigth()[0] && count > 0){
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
			setTimeout(()=>{window.addEventListener('load', circleFunc)}, 0);
			window.addEventListener('scroll', circleFunc);
			window.addEventListener('resize', circleFunc)

		}
	}	



	let setZindex = (el) => {
		el.forEach(function(item, ind){
			item.style.zIndex = el.length - ind;
		})
	}



	let portfolio = (cards) => {

		// cards.forEach(card=>{
		// 	let count = 0,
		// 	flag = false,
		// 	timer;
		// 	card.addEventListener('mouseover', function(e){
		// 		 	timer = setTimeout(function innerFunc(){
		// 			count++;
		// 			card.querySelector('img').style.transform = `translateY(${-count}px)`;
		// 			setTimeout(innerFunc, 10)
		// 		}, 10)
				
		// 	})

		// 	card.addEventListener('mouseleave', function(e){
		// 		clearTimeout(timer);
		// 	})
		// })
	}



 let drawCanvas = function(canvas) {

  let ctx, circ, nodes, mouse, SENSITIVITY, SIBLINGS_LIMIT, DENSITY, NODES_QTY, ANCHOR_LENGTH, MOUSE_RADIUS;

  // how close next node must be to activate connection (in px)
  // shorter distance == better connection (line width)
  SENSITIVITY = 50;
  // note that siblings limit is not 'accurate' as the node can actually have more connections than this value that's because the node accepts sibling nodes with no regard to their current connections this is acceptable because potential fix would not result in significant visual difference 
  // more siblings == bigger node
  SIBLINGS_LIMIT = 10;
  // default node margin
  DENSITY = 50;
  // total number of nodes used (incremented after creation)
  NODES_QTY = 0;
  // avoid nodes spreading
  ANCHOR_LENGTH = 20;
  // highlight radius
  MOUSE_RADIUS = 250;

  circ = 2 * Math.PI;
  nodes = [];

  
  resizeWindow();
  mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2
  };
  ctx = canvas.getContext('2d');
  if (!ctx) {
    alert("Ooops! Your browser does not support canvas :'(");
  }

  class Node {
  	constructor(x, y) {
  	this.anchorX = x;
    this.anchorY = y;
    this.x = Math.random() * (x - (x - ANCHOR_LENGTH)) + (x - ANCHOR_LENGTH);
    this.y = Math.random() * (y - (y - ANCHOR_LENGTH)) + (y - ANCHOR_LENGTH);
    this.vx = Math.random() * 2 - 1;
    this.vy = Math.random() * 2 - 1;
    this.energy = Math.random() * 100;
    this.radius = Math.random();
    this.siblings = [];
    this.brightness = 0;
  	}
   
  }

  Node.prototype.drawNode = function() {
    let color = "rgba(99, 50, 246, " + this.brightness + ")";
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2 * this.radius + 2 * this.siblings.length / SIBLINGS_LIMIT, 0, circ);
    ctx.fillStyle = color;
    ctx.fill();
  };

  Node.prototype.drawConnections = function() {
    for (let i = 0; i < this.siblings.length; i++) {
      let color = "rgba(99, 50, 246, " + this.brightness + ")";
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.siblings[i].x, this.siblings[i].y);
      ctx.lineWidth = 1 - calcDistance(this, this.siblings[i]) / SENSITIVITY;
      ctx.strokeStyle = color;
      ctx.stroke();
    }
  };

  Node.prototype.moveNode = function() {
    this.energy -= 2;
    if (this.energy < 1) {
      this.energy = Math.random() * 100;
      if (this.x - this.anchorX < -ANCHOR_LENGTH) {
        this.vx = Math.random() * 2;
      } else if (this.x - this.anchorX > ANCHOR_LENGTH) {
        this.vx = Math.random() * -2;
      } else {
        this.vx = Math.random() * 4 - 2;
      }
      if (this.y - this.anchorY < -ANCHOR_LENGTH) {
        this.vy = Math.random() * 2;
      } else if (this.y - this.anchorY > ANCHOR_LENGTH) {
        this.vy = Math.random() * -2;
      } else {
        this.vy = Math.random() * 4 - 2;
      }
    }
    this.x += this.vx * this.energy / 100;
    this.y += this.vy * this.energy / 100;
  };

  function initNodes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    nodes = [];
    for (let i = DENSITY; i < canvas.width; i += DENSITY) {
      for (let j = DENSITY; j < canvas.height; j += DENSITY) {
        nodes.push(new Node(i, j));
        NODES_QTY++;
      }
    }
  }

  function calcDistance(node1, node2) {
    return Math.sqrt(Math.pow(node1.x - node2.x, 2) + (Math.pow(node1.y - node2.y, 2)));
  }

  function findSiblings() {
    let node1, node2, distance;
    for (let i = 0; i < NODES_QTY; i++) {
      node1 = nodes[i];
      node1.siblings = [];
      for (let j = 0; j < NODES_QTY; j++) {
        node2 = nodes[j];
        if (node1 !== node2) {
          distance = calcDistance(node1, node2);
          if (distance < SENSITIVITY) {
            if (node1.siblings.length < SIBLINGS_LIMIT) {
              node1.siblings.push(node2);
            } else {
              let node_sibling_distance = 0;
              let max_distance = 0;
              let s;
              for (let k = 0; k < SIBLINGS_LIMIT; k++) {
                node_sibling_distance = calcDistance(node1, node1.siblings[k]);
                if (node_sibling_distance > max_distance) {
                  max_distance = node_sibling_distance;
                  s = k;
                }
              }
              if (distance < max_distance) {
                node1.siblings.splice(s, 1);
                node1.siblings.push(node2);
              }
            }
          }
        }
      }
    }
  }

  function redrawScene() {
    resizeWindow();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    findSiblings();
    let i, node, distance;
    for (i = 0; i < NODES_QTY; i++) {
      node = nodes[i];
      distance = calcDistance({
        x: mouse.x,
        y: mouse.y
      }, node);
      if (distance < MOUSE_RADIUS) {
        node.brightness = 1 - distance / MOUSE_RADIUS;
      } else {
        node.brightness = 0;
      }
    }
    for (i = 0; i < NODES_QTY; i++) {
      node = nodes[i];
      if (node.brightness) {
        node.drawNode();
        node.drawConnections();
      }
      node.moveNode();
    }
    requestAnimationFrame(redrawScene);
  }

  function initHandlers() {
    document.addEventListener('resize', resizeWindow, false);
    canvas.addEventListener('mousemove', mousemoveHandler, false);
  }

  function resizeWindow() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function mousemoveHandler(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }

  initHandlers();
  initNodes();
  redrawScene();

}


	export {
		ScrollElem,
		setZindex,
		portfolio,
		drawCanvas
	}