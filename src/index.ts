let webs = {
  key1: `body { color: red; }`,
};

function createSheet(key, styles) {
  if (isNotRegistered(key)) {
    var styleNode = document.createElement("style");
    styleNode.type = "text/css";
    styleNode.id = key;
    styleNode.innerHTML = styles;
    document.head.appendChild(styleNode);
  }
}

function isNotRegistered(key) {
  return document.getElementById(key) == null;
}

function addToSheet(key, styles, render) {
  webs[key] = styles;
  if (render) {
    renderSheet(key);
  }
}

function renderSheet(key) {
  createSheet(key, webs[key]);
}
