```
  ,-,              ,-,
/∞|<\  ~~JŌRŌ~~  /∞|<\
```

# Why is this useful?

In a very basic way this allows you to load dom nodes like dependencies.

For example add required styles or libraries in any component
```js

var html = require('nanohtml')
var joro = require('joro');

var styles = new joro();

function HeaderComponent(){
    styles.add("HeaderComponent", `
        h1 { color: hotpink }
    `)
    var el = html`
        <h1>Hello planet</h1>
    `
    document.body.appendChild(el)
}
```

You can add nodes on route change

 ```js
var page = require('pagejs')
var styles = new joro();

page('/user', () => {
    styles.add("HeaderComponent", `
        .user-profile { color: hotpink }
    `)
    loadTheUI();
})
 ```
