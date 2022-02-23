type CustomTag = HTMLElement | null;

interface Registry {
  [x: string]: string;
}

type Add = (
  _key: string,
  _inner: string,
  _custom: CustomTag,
  _render: boolean,
  _location: 'head' | 'body',
) => boolean;

type render = (_key: string, _custom: CustomTag, _location: 'head' | 'body') => boolean;

type Joro = {
  new (): {
    registry: Registry;
    render: render
    getElement: (_key: string) => Element | null;
    add: Add
  };
}

interface Window {
  joro: Joro;
}

class joro {
  registry: Registry;
  getElement: (_key: string) => Element | null;
  render: render;
  add: Add;
  isNotRendered: (_key: string) => boolean;
  remove: (_key: string, _unrender: boolean) => boolean;

  constructor() {
    this.registry = {};
    this.getElement = (key: string) =>
      document.querySelector(`[data-joro-id=${key}]`);
    (this.render = (key: string, tag: CustomTag = null, location = 'head') => {
      if (this.isNotRendered(key)) {
        // Get the data that should be stored in the key
        const inner: string = this.registry[key];
        if (tag instanceof HTMLElement) {
          // Html auto converts camel-case to dash case
          tag.dataset.joroId = key;
          tag.innerHTML = inner;
          document[location].appendChild(tag);
          return true;
        }

        console.error('ヾ( `3´)シ GET: tag is not an instanceof HTMLElement');
      }

      console.error('ヾ( `3´)シ GET: That tag is not rendered');
      return false;
    });

    (this.add = (
      key: string,
      inner: string,
      tag: CustomTag = null,
      render = true,
      location = 'head',
    ) => {
      if (this.registry[key] === undefined) {
        this.registry[key] = inner;
        if (render) {
          this.render(key, tag, location);
        }
      } else {
        console.error('ヾ( `3´)シ ADD: That key already exists');
        return false;
      }

      return true;
    });

    this.remove = (key: string, unrender = false) => {
      delete this.registry[key];
      if (unrender && !this.isNotRendered(key)) {
        this.getElement(key)?.remove();
        return true;
      }

      console.error('ヾ( `3´)シ REMOVE: That key is not rendered');
      return false;
    };

    this.isNotRendered = (key: string) => this.getElement(key) === null;
  }
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = joro;
} else {
  (window as Window).joro = joro;
}
