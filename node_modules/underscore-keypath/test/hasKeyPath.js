/* globals describe:false, before:false, it:false */
var _ = require("../lib/underscore-keypath");
var Person = require("./fixture").Person;
require("should");

describe("hasKeyPath", function () {
	var fixture;
	before(function () {
		fixture = {
			foo : new Person("foo", 1),
			bar : new Person("bar", 2)
		};
	});

	it("plain property", function () {
		_(fixture).hasKeyPath("foo._name")
			.should.be.exactly(true);
		_(fixture).hasKeyPath(["foo", "_name"])
			.should.be.exactly(true);
		_(fixture).hasKeyPath("foo._not_exist_.more")
			.should.be.exactly(false);
	});

	it("getter", function () {
		_(fixture).hasKeyPath("foo.name")
			.should.be.exactly(true);
	});
});
