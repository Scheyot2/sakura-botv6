/* globals it:false, describe:false, it:false, before:false */
var _ = require("../lib/underscore-keypath");
require("should");
var Person = require("./fixture.js").Person;

describe("setValueForKeyPath", function () {
	var fixture;

	before(function () {
		fixture = {
			foo : new Person("foo", 1),
			bar : new Person("bar", 2)
		};
	});

	describe("set plain property", function () {
		it("plain property must be updated", function () {
			_(fixture).setValueForKeyPath("foo.alias", "FOO")
				.should.be.exactly("FOO");
			fixture.foo.alias.should.be.exactly("FOO");
		});

		it("keypath as an array", function () {
			_(fixture).setValueForKeyPath(["foo", "alias"], "FOO")
				.should.be.exactly("FOO");
			fixture.foo.alias.should.be.exactly("FOO");
		});
	});

	describe("set property by setter", function () {
		it("what if there is setter for given keypath, it must be called", function () {
			_(fixture).setValueForKeyPath("bar.age", 99)
				.should.be.exactly(99);
			fixture.bar._age.should.be.exactly(99);
		});

		it("key path as an array", function () {
			_(fixture).setValueForKeyPath(["bar", "age"], 99)
				.should.be.exactly(99);
			fixture.bar._age.should.be.exactly(99);
		});
	});
});
