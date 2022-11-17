/* globals it:false, describe:false, it:false, before:false */
var _ = require("../lib/underscore-keypath");
require("should");
var Person = require("./fixture").Person;

describe("collection", function () {
	var fixture;

	before(function () {
		fixture = [
			new Person("foo", 1, {
				company : {
					name : "AAA",
					since : 1995
				}
			}),
			new Person("bar", 2, {
				company : {
					name : "BBB",
					since : 1990
				}
			}),
			new Person("zar", 3, {
				company : {
					name : "AAA",
					since : 1998
				}
			})
		];
	});

	describe("pluckByKeyPath", function () {
		it("pluckByKeyPath should have to pluck by keypath mechanism", function () {
			_(fixture).pluckByKeyPath("name")
				.should.be.an.Array
				.and.containEql("foo")
				.and.containEql("bar")
				.and.containEql("zar")
				.and.have.lengthOf(3);
		});
	});

	describe("whereByKeyPath", function () {
		it("whereByKeyPath should act as where with key-value mechanism", function () {
			_(fixture).whereByKeyPath({
				"options.company.name" : "AAA"
			}).should.be.an.Array
				.and.containEql(fixture[0])
				.and.containEql(fixture[2])
				.and.have.lengthOf(2);
		});

		it("findWhere should act as _.findWhere with key-value mechanism", function () {
			_(fixture).findWhereByKeyPath({
				"age" : 1
			}).should.be.an.Object
				.and.be.exactly(fixture[0]);
		});
	});

	describe("@property", function () {
		it("@first", function () {
			_(fixture).valueForKeyPath("@first.name")
				.should.be.exactly("foo");
		});
		
		it("@max", function () {
			_.chain(fixture)
				.pluckByKeyPath("age")
				.valueForKeyPath("@max")
				.value()
					.should.be.an.Number
					.and.be.exactly(3);
		});

		it("@min", function () {
			_.chain(fixture)
				.pluckByKeyPath("age")
				.valueForKeyPath("@min")
				.value()
					.should.be.exactly(1);
		});

		it("@size", function () {
			_(fixture).valueForKeyPath("@size")
				.should.be.exactly(3);
		});

		it("@last", function () {
			_(fixture).valueForKeyPath("@last.name")
				.should.be.exactly("zar");
		});
	});

	describe("grouping and indexing", function () {
		it("sortByKeyPath", function () {
			var sorted = _(fixture).sortByKeyPath("options.company.since");
			_(sorted).pluckByKeyPath("name").join(",")
				.should.be.exactly("bar,foo,zar");
		});

		it("countByKeyPath", function () {
			/* jshint sub:true */
			var countMap = _(fixture).countByKeyPath("options.company.name");
			countMap["AAA"].should.be.exactly(2);
			countMap["BBB"].should.be.exactly(1);
		});

		it("indexByKeyPath", function () {
			/* jshint sub:true */
			var index = _(fixture).indexByKeyPath("options.company.name");
			index["BBB"].should.be.exactly(fixture[1]);
		});

		it("groupByKeyPath", function () {
			/* jshint sub:true */
			var group = _(fixture).groupByKeyPath("options.company.name");
			group["AAA"].should.be.an.Array
				.and.have.lengthOf(2);
			group["BBB"].should.be.an.Array
				.and.have.lengthOf(1);
		});
	});
});


