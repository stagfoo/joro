"use strict";
class joro {
    constructor() {
        this.registry = {};
        this.getElement = (key) => document.querySelector(`[data-joro-id=${key}]`);
        this.render = (key, custom = null) => {
            if (this.isNotRendered(key)) {
                const inner = this.registry[key];
                if (custom instanceof HTMLElement) {
                    custom.dataset.joroId = key;
                    custom.innerHTML = inner;
                    document.head.appendChild(custom);
                    return true;
                }
            }
            return false;
        },
            this.add = (key, inner, custom = null, render = true) => {
                if (this.registry[key] === undefined) {
                    this.registry[key] = inner;
                    if (render) {
                        this.render(key, custom);
                        return true;
                    }
                }
                return false;
            };
        this.remove = (key, unrender = false) => {
            var _a;
            delete this.registry[key];
            if (unrender && !this.isNotRendered(key)) {
                (_a = this.getElement(key)) === null || _a === void 0 ? void 0 : _a.remove();
                return true;
            }
            return false;
        };
        this.isNotRendered = (key) => this.getElement(key) === null;
    }
}
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = joro;
}
else {
    window['joro'] = joro;
}
