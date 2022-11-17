/* globals it:false, describe:false, it:false */
var _ = require("../lib/underscore-keypath");
require("should");

describe("issue3", function () {
	var foo = {
		bar : {
			id: 0,
			name : "foo"
		}
	};

	var keypath = ["bar", "name"];

	it("array keypath should not be modified 1", function () {
		_(foo).valueForKeyPath(keypath);
		keypath.should.eql(["bar", "name"]);
	});

	it("array keypath should not be modified 2", function () {
		_(foo).hasKeyPath(keypath);
		keypath.should.eql(["bar", "name"]);
	});
});
