/* globals it:false, describe:false, it:false, before:false */
var _ = require("../lib/underscore-keypath");
require("should");

describe("issue1", function () {
	var fixture = {};

	before(function () {
		fixture.bar = function () {
			return {
				"baz" : {
					"foo" : "bar-baz-foo"
				},
				"foo" : "bar-foo"
			};
		};
	});

	it("function notation", function () {
		_(fixture).valueForKeyPath("bar().foo")
			.should.be.exactly("bar-foo");
	});

	it("bracket notation", function () {
		_(fixture).valueForKeyPath('bar["baz"].foo')
			.should.be.exactly("bar-baz-foo");

		_(fixture).valueForKeyPath("bar['baz'].foo")
			.should.be.exactly("bar-baz-foo");
	});

	it("bracket and function notation", function () {
		_(fixture).valueForKeyPath('bar()["baz"].foo')
			.should.be.exactly("bar-baz-foo");
		_(fixture).valueForKeyPath("bar()['baz'].foo")
			.should.be.exactly("bar-baz-foo");

	});
});
