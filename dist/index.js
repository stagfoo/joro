function joro() {
    this.registry = {};
    this.render = (key, custom = null) => {
        if (isNotRegistered(key)) {
            const inner = this.registry[key];
            if (custom instanceof HTMLElement) {
                custom.id = key;
                custom.innerHTML = inner;
                document.head.appendChild(custom);
            }
            else {
                const node = makeStylesheet(key, inner);
                document.head.appendChild(node);
            }
        }
    },
        this.add = (key, inner, render = true) => {
            if (this.registry[key] === undefined) {
                this.registry[key] = inner;
                if (render) {
                    this.render(key);
                }
            }
        };
    this.remove = (key, unrender = false) => {
        delete this.registry[key];
        if (unrender) {
            document.getElementById(key).remove();
        }
    };
    function makeStylesheet(key, inner) {
        const styleNode = document.createElement("style");
        styleNode.type = "text/css";
        styleNode.id = key;
        styleNode.innerHTML = inner;
        return styleNode;
    }
    function isNotRegistered(key) {
        return document.getElementById(key) == null;
    }
}
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = joro;
}
else {
    window['joro'] = joro;
}