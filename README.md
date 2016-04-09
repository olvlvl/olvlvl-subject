# Subject

[![npm](https://img.shields.io/npm/v/olvlvl-subjects.svg)](https://www.npmjs.com/package/olvlvl-subject)

This package implements the [subject/observer][] pattern in ECMAScript 6.

This implementation differs from classic event emitter implementations because its **events are typed** and they are **not identified using magic strings** but their constructor, symbols are used under the hood. This removes errors due to typos or usage of deprecated events.





## Usage

```js
"use strict";

const Subject = require('olvlvl-subject')

// create an event type
const MyEvent = Subject.createEvent(function (param1, param2) {

    this.param1 = param1
    this.param2 = param2

})

// create a constructor and mixin Subject prototype
function MySubject()
{

}

Object.assign(MySubject.prototype, Subject.prototype)

// instantiate a subject
const subject = new MySubject

// observe subject to notify MyEvent
subject.observe(MyEvent, ev => {

    console.log('MyEvent:', ev.param1, ev.param2)

})

// notify observers
subject.notify(new MyEvent(Math.random(), Math.random()))
```





----------





## Requirement

ECMAScript 6.





## Installation

The recommended way to install the package in through [npm](https://www.npmjs.com/):

```bash
$ npm install olvlvl-subjects --save
```





## Cloning the repository

The package is [available on GitHub](https://github.com/olvlvl/subject), its repository can be cloned with the following command line:

```bash
$ git clone https://github.com/olvlvl/subject.git
```





## Testing

The test suite is ran with the `make test` command.





## License

**olvlvl-subject** is licensed under the New BSD License - See the [LICENSE](LICENSE) file for details.





[subject/observer]: https://en.wikipedia.org/wiki/Observer_pattern
