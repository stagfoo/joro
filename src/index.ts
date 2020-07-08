function joro(){
    this.registry = {}
    this.render = render,
    this.add = add
    this.remove = remove


function render(key:string, custom = null) {
  if (isNotRegistered(key)) {
    const inner = this.registry[key];
    if(custom instanceof HTMLElement) {
        custom.id = key;
        custom.innerHTML = inner;
        document.head.appendChild(custom);
    } else {
        const node = makeStylesheet(key, inner)
        document.head.appendChild(node);
    }
  }
}

function makeStylesheet(key:string, inner:string){
    const styleNode = document.createElement("style");
    styleNode.type = "text/css";
    styleNode.id = key;
    styleNode.innerHTML = inner;
    return styleNode
}

function isNotRegistered(key) {
  return document.getElementById(key) == null;
}

function add(key:string, inner:string, render = true) {
  if(this.registry[key] === undefined){
      this.registry[key] = inner;
      if (render) {
        this.render(key);
      }
  }
}
function remove(key: string, unrender = false){
    delete this.registry[key];
    if(unrender){
        document.getElementById(key).remove()
    }
}
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
	module.exports = joro;
} else {
	window['joro'] = joro;
}