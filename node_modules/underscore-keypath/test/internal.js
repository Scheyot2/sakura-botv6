/* globals it:false, describe:false, it:false, before:false */
var _ = require("../lib/underscore-keypath");
require("should");

describe("Internal Logic", function () {
	var fixture = {};
	var debug = _.__debug__;

	before(function () {
		fixture = {
			"bar.foo" : {
				"zar" : "test"
			}
		};
	});

	it("function notation", function () {
		debug.toSegments("a.b.c").should.eql(["a", "b", "c"]);
		debug.toSegments("a['b']['c']").should.eql(["a", "b", "c"]);
		debug.toSegments("a..b.c").should.eql(["a.b", "c"]);
		debug.toSegments("['a.b.c']").should.eql(["a.b.c"]);
		debug.toSegments("c['a.b.c'][\"a.b\"]").should.eql(["c", "a.b.c", "a.b"]);
	});

});
