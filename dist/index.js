function joro() {
    this.registry = {};
    this.getElement = (key) => {
        return document.querySelector(`[data-joro-id=${key}]`);
    };
    this.render = (key, custom = null) => {
        if (this.isNotRendered(key)) {
            const inner = this.registry[key];
            if (custom instanceof HTMLElement) {
                custom['data-joro-id'] = key;
                custom.innerHTML = inner;
                document.head.appendChild(custom);
            }
        }
    },
        this.add = (key, inner, custom = null, render = true) => {
            if (this.registry[key] === undefined) {
                this.registry[key] = inner;
                if (render) {
                    this.render(key, custom);
                }
            }
        };
    this.remove = (key, unrender = false) => {
        delete this.registry[key];
        if (unrender && !this.isNotRendered(key)) {
            this.getElement(key).remove();
        }
    };
    this.isNotRendered = (key) => {
        return this.getElement(key) == null;
    };
}
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = joro;
}
else {
    window['joro'] = joro;
}
