(function () {
	var underscore;
	if (typeof _ !== "undefined") {
		underscore = _;
	}

	var root = this, isNodeJS, arrayPropertyResolvers, arrayPropertyWriters, mixins, aliases;
	isNodeJS = typeof module !== "undefined" && typeof require !== "undefined";

	// what if this runs on meteor, underscore is already defined
	if (typeof underscore == "undefined") {
		if (isNodeJS) {
			underscore = require("underscore");
		} else {
			underscore = root.underscore;
		}
	}

	if (typeof underscore === "undefined") {
		throw new Error("underscore.js is not found!");
	}

	arrayPropertyResolvers = {
		"@first" : function (array) {
			return underscore.first(array);
		},
		"@last" : function (array) {
			return underscore.last(array);
		},
		"@max" : function (array) {
			return underscore.max(array);
		},
		"@min" : function (array) {
			return underscore.min(array);
		},
		"@size" : function (array) {
			return underscore.size(array);
		}
	};

	arrayPropertyWriters = {
		"@first" : function (array, value) {
			array[0] = value;
			return value;
		},
		"@last" : function (array, value) {
			array[Math.max(array.length - 1, 0)] = value;
			return value;
		}
	};

	function replaceBracketContent(capture, g1, g2, offset) {
		return (offset !== 0 ? "." : "") + g1.replace(/\./g, "«dot»");
	}

	function toSegments(keypath) {
		"use strict";
		if (typeof keypath === "object" && keypath.constructor.name === "Array") {
			return Array.prototype.slice.call(keypath);
		}
		if (typeof keypath === "string") {
			keypath = keypath.replace(/\.\./g, "«dot»");

			// issue #1 https://github.com/jeeeyul/underscore-keypath/issues/1
			keypath = keypath.replace(/\['(([^']|\\')*)'\]/g, replaceBracketContent);
			keypath = keypath.replace(/\["(([^"]|\\")*)"\]/g, replaceBracketContent);

			keypath = keypath.replace(/([$A-Za-z_][0-9A-Za-z_$]*)\(\)/, "$1");

			var result = keypath.split(".");

			result = underscore(result).map(function (each) {
				return each.replace(/«dot»/g, ".");
			});

			return result;
		}
		throw new Error("keypath must be an array or a string");
	}

	function capitalize(str) {
		"use strict";
		str = str === null ? '' : String(str);
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	function getArrayProperty(array, name) {
		"use strict";
		var resolver = arrayPropertyResolvers[name];

		if (resolver) {
			return resolver(array);
		}

		return undefined;
	}

	function setArrayProperty(array, name, value) {
		"use strict";
		if (!(array instanceof Array)) {
			return undefined;
		}

		var setter = arrayPropertyWriters[name];
		if (setter) {
			return setter(array, value);
		} else {
			return undefined;
		}
	}

	function getProperty(obj, name) {
		"use strict";
		if (name === "") {
			return obj;
		}

		if (name.indexOf("@") === 0) {
			return getArrayProperty(obj, name);
		}

		var target = obj["get" + capitalize(name)];

		if (target === undefined) {
			target = obj["is" + capitalize(name)];
		}

		if (target === undefined) {
			target = obj[name];
		}

		if (typeof target === "function") {
			target = target.call(obj);
		}

		return target;
	}

	function hasProperty(obj, name) {
		"use strict";
		if (name === "") {
			return true;
		}

		return typeof obj["get" + capitalize(name)] === "function" ||
			typeof obj["is" + capitalize(name)] === "function" ||
			underscore.has(obj, name);
	}

	function setProperty(obj, name, value) {
		"use strict";
		var setter = obj["set" + capitalize(name)];
		if (setter) {
			return setter.call(obj, value);
		}

		if (name.indexOf("@") === 0) {
			return setArrayProperty(obj, name, value);
		}

		obj[name] = value;
		return value;
	}

	function matchQuery(obj, query) {
		"use strict";
		var match = true, eachKeyPath, expected;

		for (eachKeyPath in query) {
			if (query.hasOwnProperty(eachKeyPath)) {
				expected = query[eachKeyPath];
				if (underscore(obj).valueForKeyPath(eachKeyPath) !== expected) {
					match = false;
					break;
				}
			}
		}

		return match;
	}


	mixins = {
		valueForKeyPath : function (obj, keypath, fallback) {
			"use strict";
			var finger = obj, segments, next, parent;

			if (obj === null || obj === undefined) {
				return fallback;
			}

			segments = toSegments(keypath);
			next = segments.shift();
			parent = undefined;

			while (finger !== null && finger !== undefined && typeof next === "string") {
				parent = finger;
				finger = getProperty(finger, next);
				if (typeof finger === "function") {
					finger = finger.call(parent);
				}
				next = segments.shift();
			}

			if (finger === null || finger === undefined) {
				return fallback;
			} else {
				return finger;
			}
		},

		setValueForKeyPath : function (obj, keypath, newValue) {
			"use strict";
			var segments = toSegments(keypath), lastPropertyName, target;

			lastPropertyName = segments.pop();
			target = underscore(obj).valueForKeyPath(segments.join("."));

			if (target !== null && target !== undefined) {
				return setProperty(target, lastPropertyName, newValue);
			}

			return undefined;
		},

		pluckByKeyPath : function (array, keypath) {
			"use strict";
			var result = [], i, each;

			for (i = 0; i < array.length; i += 1) {
				each = array[i];
				result[i] = underscore(each).valueForKeyPath(keypath);
			}

			return result;
		},

		whereByKeyPath : function (array, query) {
			"use strict";
			var result = [], i, each;

			for (i = 0; i < array.length; i += 1) {
				each = array[i];
				if (matchQuery(each, query)) {
					result.push(each);
				}
			}
			return result;
		},

		findWhereByKeyPath : function (array, query) {
			"use strict";
			var i, each;

			for (i = 0; i < array.length; i += 1) {
				each = array[i];
				if (matchQuery(each, query)) {
					return each;
				}
			}

			return null;
		},

		sortByKeyPath : function (array, keyPath) {
			"use strict";
			if (typeof keyPath !== "string") {
				return underscore.sortBy(array, keyPath);
			}
			return underscore.sortBy(array, function (it) {
				return underscore.valueForKeyPath(it, keyPath);
			});
		},

		groupByKeyPath : function (array, keyPath) {
			"use strict";
			if (typeof keyPath !== "string") {
				return underscore.groupBy(array, keyPath);
			}
			return underscore.groupBy(array, function (it) {
				return underscore.valueForKeyPath(it, keyPath);
			});
		},

		indexByKeyPath : function (array, keyPath) {
			"use strict";
			if (typeof keyPath !== "string") {
				return underscore.indexBy(array, keyPath);
			}
			return underscore.indexBy(array, function (it) {
				return underscore.valueForKeyPath(it, keyPath);
			});
		},

		countByKeyPath : function (array, keyPath) {
			"use strict";
			if (typeof keyPath !== "string") {
				return underscore.countBy(array, keyPath);
			}
			return underscore.countBy(array, function (it) {
				return underscore.valueForKeyPath(it, keyPath);
			});
		},

		hasKeyPath : function (obj, keyPath) {
			"use strict";
			var segments, last, target;
			if (obj === null || obj === undefined) {
				return false;
			}

			segments = toSegments(keyPath);
			last = segments.pop();
			target = this.valueForKeyPath(obj, segments);

			if (target !== null && target !== undefined) {
				return hasProperty(target, last);
			}

			return false;
		}

	};

	aliases = {
		"getValueForKeyPath" : mixins.valueForKeyPath
	};

	underscore.mixin(mixins);
	underscore.mixin(aliases);

	if (isNodeJS) {
		module.exports = underscore;
		module.exports.__debug__ = {
			toSegments : toSegments
		};
	}
}());
