type CustomTag = HTMLElement | null;
interface RegistryItem {
  [x: string]: CustomTag
}

class joro {
  [x: string]: any; //TODO fix me
  render: (key: string, custom: CustomTag) => boolean;
  getElement: (key: string) => Element | null;
  add: (key: string, inner: string, custom: CustomTag, render: boolean) => boolean;
  isNotRendered:(key: string) => boolean;
  remove: (key: string, unrender: boolean) => boolean;
  
  constructor() {
    this.registry = <RegistryItem>{}
    this.getElement = (key: string) => {
      return document.querySelector(`[data-joro-id=${key}]`)
    }
    this.render = (key: string, custom: CustomTag = null) => {
      if (this.isNotRendered(key)) {
        //Get the data that should be stored in the key
        const inner:string = this.registry[key];
        if (custom instanceof HTMLElement) {
          //html auto converts camel-case to dash case
          custom.dataset.joroId = key;
          custom.innerHTML = inner;
          document.head.appendChild(custom);
          return true;
        }
      }
      return false;
    },
      this.add = (key: string, inner: string, custom: CustomTag = null, render: boolean = true) => {
        if (this.registry[key] === undefined) {
          this.registry[key] = inner;
          if (render) {
            this.render(key, custom);
            return true;
          }
        }
        return false
      }
    this.remove = (key: string, unrender: boolean = false) => {
      delete this.registry[key];
      if (unrender && !this.isNotRendered(key)) {
        this.getElement(key)?.remove()
        return true
      }
      return false;
    }

    this.isNotRendered = (key: any) => {
      return this.getElement(key) == null;
    }
  }


}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = joro;
} else {
  (window as any).joro = joro;
}