type CustomTag = HTMLElement | null;
interface RegistryItem {
    [x: string]: string
}

class joro {
	registry: any; // TODO: this typing is wrong
	render: (_key: string, _custom: CustomTag) => boolean;
	getElement: (_key: string) => Element | null;
	add: (_key: string, _inner: string, _custom: CustomTag, _render: boolean) => boolean;
	isNotRendered: (_key: string) => boolean;
	remove: (_key: string, _unrender: boolean) => boolean;

	constructor() {
		this.registry = <RegistryItem>{};
		this.getElement = (key: string) => document.querySelector(`[data-joro-id=${key}]`);
		this.render = (key: string, custom: CustomTag = null) => {
			if (this.isNotRendered(key)) {
				// Get the data that should be stored in the key
				const inner: string = this.registry[key];
				if (custom instanceof HTMLElement) {
					// Html auto converts camel-case to dash case
					custom.dataset.joroId = key;
					custom.innerHTML = inner;
					document.head.appendChild(custom);
					return true;
				}
			}
			return false;
		},
		this.add = (key: string, inner: string, custom: CustomTag = null, render = true) => {
			if (this.registry[key] === undefined) {
				this.registry[key] = inner;
				if (render) {
					this.render(key, custom);
					return true;
				}
			}

			return false;
		};

		this.remove = (key: string, unrender = false) => {
			delete this.registry[key];
			if (unrender && !this.isNotRendered(key)) {
				this.getElement(key)?.remove();
				return true;
			}

			return false;
		};

		this.isNotRendered = (key: string) => this.getElement(key) === null;
	}
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
	module.exports = joro;
} else {
	window['joro'] = joro;
}
