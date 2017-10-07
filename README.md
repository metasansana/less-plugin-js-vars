
Less Plugin JS Vars
===================

A less css plugin that let's use js vars all over the place.


## Installation

```
npm install --save-dev less-plugin-js-vars

```

## Usage
```
lessc file.less --js-vars="vars.js"

```

In the above, the file vars.js must export an object with key value pairs.
Inside your less files all occurences of {{variable}} will be replaced with the value
of the 'variable' property on the exported object.

vars.js:

```js

module.exports = {

   fruit: 'mango'

};

```

file.less:
```less

.__fruit__ {

   color: red;

}

```

result:
```css

.mango {

  color: red;

}

```
