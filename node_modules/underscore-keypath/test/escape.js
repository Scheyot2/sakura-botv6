/* globals it:false, describe:false, it:false, before:false */
var _ = require("../lib/underscore-keypath");
require("should");

describe("Internal Logic", function () {
	var fixture = {};

	before(function () {
		fixture = {
			"bar.foo" : {
				"zar" : "test",
				"aaa.bbb" : "aaa.bbb"
			}
		};
	});

	it("function notation", function () {
		_(fixture).valueForKeyPath("bar..foo.zar")
			.should.be.exactly("test");

		_(fixture).valueForKeyPath("['bar.foo'].zar")
			.should.be.exactly("test");

		_(fixture).valueForKeyPath("[\"bar.foo\"].zar")
			.should.be.exactly("test");

		_(fixture).valueForKeyPath("bar..foo.aaa..bbb")
			.should.be.exactly("aaa.bbb");

		_(fixture).valueForKeyPath("bar..foo['aaa.bbb']")
			.should.be.exactly("aaa.bbb");

		_(fixture).valueForKeyPath("['bar.foo']['aaa.bbb']")
			.should.be.exactly("aaa.bbb");
	});

});
