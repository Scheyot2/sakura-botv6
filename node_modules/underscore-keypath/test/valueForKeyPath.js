/* globals it:false, describe:false, it:false, before:false */
var _ = require("../lib/underscore-keypath");
var Person = require("./fixture").Person;
require("should");

describe("valueForKeyPath", function () {
	var fixture;

	before(function () {
		fixture = {
			foo : new Person("aaa", 1),
			bar : new Person("bar", 2)
		};

		fixture.foo.data = "sample data";
		fixture.count = function () {
			return 2;
		};
	});

	describe("empty-keypath", function () {
		it("what if keypath is empty, result must be current context", function () {
			_(fixture).valueForKeyPath("").should.be.exactly(fixture);
		});

		it("key path as an empty array", function () {
			_(fixture).valueForKeyPath([]).should.be.exactly(fixture);
		});
	});

	describe("fallback", function () {
		it("should return fallback value when there is no value for give keypath", function () {
			_(fixture).valueForKeyPath("zar.whatever", "fallback")
				.should.be.exactly("fallback");
		});
	});

	describe("function", function () {
		it("what if property is function, it's result have to be returned.", function () {
			_(fixture).valueForKeyPath("count").should.be.exactly(2);
		});
		it("key path as an array", function () {
			_(fixture).valueForKeyPath(["count"]).should.be.exactly(2);
		});
	});

	describe("getter", function () {
		it("what if there is a getter for given key, it must be call", function () {
			_(fixture).valueForKeyPath("foo.name")
				.should.be.exactly(fixture.foo._name);

			_(fixture).valueForKeyPath("foo.male")
				.should.be.exactly(fixture.foo._male);
		});

		it("keypath as an array", function () {
			_(fixture).valueForKeyPath(["foo", "name"])
				.should.be.exactly(fixture.foo._name);

			_(fixture).valueForKeyPath(["foo", "male"])
				.should.be.exactly(fixture.foo._male);
		});
	});

	describe("plain property", function () {
		it("valueForKeyPath returns value of given keypath", function () {
			_(fixture).valueForKeyPath("foo.data")
				.should.be.exactly(fixture.foo.data);
		});

		it("keypath as an array", function () {
			_(fixture).valueForKeyPath(["foo", "data"])
				.should.be.exactly(fixture.foo.data);
		});
	});

	describe("alias", function () {
		it("getValueForKeyPath must be act same as valueForKeyPath", function () {
			_(fixture).getValueForKeyPath("foo.data")
				.should.be.exactly("sample data");
		});

	});
});
