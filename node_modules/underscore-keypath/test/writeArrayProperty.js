/* globals it:false, describe:false, it:false, beforeEach:false */
var _ = require("../lib/underscore-keypath");

describe("Array Write", function () {
	describe("Normal Array", function () {
		var fixture;

		beforeEach(function () {
			fixture = [1, 2, 3, 4];
		});

		it("first", function () {
			_(fixture).setValueForKeyPath("@first", 9);
			fixture.should.be.eql([9, 2, 3, 4]);
		});

		it("last", function () {
			_(fixture).setValueForKeyPath("@last", 9);
			fixture.should.be.eql([1, 2, 3, 9]);
		});
	});

	describe("Empty Array", function () {
		var fixture;

		beforeEach(function () {
			fixture = [];
		});

		it("first", function () {
			_(fixture).setValueForKeyPath("@first", 9);
			fixture.should.be.eql([9]);
		});

		it("last", function () {
			_(fixture).setValueForKeyPath("@last", 9);
			fixture.should.be.eql([9]);
		});
	});

	describe("Complex Array", function () {
		var fixture = {
			foo : {
				bar : []
			}
		};

		beforeEach(function () {
			fixture.foo.bar = [1, 2, 3, 4];
		});

		it("first", function () {
			_(fixture).setValueForKeyPath("foo.bar.@first", 9);
			_(fixture).valueForKeyPath("foo.bar").should.be.eql([9, 2, 3, 4]);
		});

		it("last", function () {
			_(fixture).setValueForKeyPath("foo.bar.@last", 9);
			_(fixture).valueForKeyPath("foo.bar").should.be.eql([1, 2, 3, 9]);
		});
	});
});
