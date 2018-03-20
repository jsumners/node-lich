# node-lich

This is an implementation of Wolf Rentzsch's [lich format][lich] in JavaScript.
For more information on what that means, read his introduction.

[lich]: https://github.com/rentzsch/lich

## Example

```js
const lich = require('@jsumners/lich')
console.log(
  lich.encode({greeting: 'hello world'})
) // 26{8<greeting>11<hello world>}
```

## License

[MIT License](http://jsumners.mit-license.org/)
