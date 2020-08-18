function joro(){
    this.registry = {}
    this.getElement = (key:string) => {
      return document.querySelector(`[data-joro-id=${key}]`)
    }
    this.render = (key:string, custom:HTMLElement = null) => {
      if (this.isNotRendered(key)) {
        //Get the data that should be stored in the key
        const inner = this.registry[key];
        if(custom instanceof HTMLElement) {
            //html auto converts camel-case to dash case
            custom.dataset.joroId = key;
            custom.innerHTML = inner;
            document.head.appendChild(custom);
        }
      }
    },
    this.add = (key:string, inner:string, custom: HTMLElement = null, render:boolean = true) => {
      if(this.registry[key] === undefined){
          this.registry[key] = inner;
          if (render) {
            this.render(key, custom);
          }
      }
    }
    this.remove = (key: string, unrender:boolean = false) => {
      delete this.registry[key];
      if(unrender && !this.isNotRendered(key)){
        this.getElement(key).remove()
      }
  }

  this.isNotRendered = (key) => {
    return this.getElement(key) == null;
  }
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
	module.exports = joro;
} else {
	window['joro'] = joro;
}