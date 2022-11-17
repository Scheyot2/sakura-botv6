# underscore-keypath
[![Build Status](https://travis-ci.org/jeeeyul/underscore-keypath.png?branch=master)](https://travis-ci.org/jeeeyul/underscore-keypath)

key-path mechanism extensions for underscore (mixin).

**underscore-keypath** let you access JavaScript objects and arrays with keypath easily.

```javascript
var foo = {
  bar : {
    name : "Cool!"
  },
  scores : [55, 27, 100, 33]
};

_(foo).valueForKeyPath("bar.name");           // --> "Cool!"
_(foo).setValueForKeyPath("bar.name", "BAR"); // --> sets foo.bar.name as "BAR"
_(foo).valueForKeyPath("scores.@max");        // --> 100
```

## Install
### NodeJS
```bash
$ npm install underscore-keypath
```

```javascript
var _ = require("underscore-keypath");
```

or you may want to use origianl underscore:

```javascript
var _ = require("underscore");
require("underscore-keypath"); // it will extend original underscore
```
in this case, please install "underscore" first.
```bash
$ npm install underscore
$ npm install underscore-keypath
```
Otherwise, underscore-keypath extends separated underscore in sandbox.

### Meteor
```bash
$ meteor add jeeeyul:underscore-keypath
```

### Front-end
```bash
$ bower install underscore-keypath
```
Or just download [underscore-keypath.js](https://github.com/jeeeyul/underscore-keypath/tree/master/lib/underscore-keypath.js) manually.

## Examples
```javascript
var list = [{
  name : "foo",
  info : {
    favoriteColor : "red",
    age : 20
  }
},{
  name : "bar",
  info : {
    favoriteColor : "green",
    age : 17
  }
},{
  name : "zar",
  info : {
    favoriteColor : "red",
    age : 34
  }
}];

_(list).pluckByKeyPath("info.age");           // --> [20, 17, 34]
_(list).sortByKeyPath("info.age");            // --> [{name:"bar", ..}, {name:"foo", ..}, {name:"zar", ..}]
_(list).groupByKeyPath("info.favoriteColor"); // --> {red:2, green:1}

```

See [API Document](https://github.com/jeeeyul/underscore-keypath/wiki/API)
