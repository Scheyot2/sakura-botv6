var _ = require("underscore");

function Person(name, age, options) {
	this._name = name;
	this._age = age;
	this._male = true;
	this.options = _.extend({}, options);
}

Person.prototype.getName = function () {
	return this._name;
};

Person.prototype.setName = function (newName) {
	this._name = newName;
	return newName;
};

Person.prototype.getAge = function () {
	return this._age;
};

Person.prototype.setAge = function (newAge) {
	this._age = newAge;
	return newAge;
};

Person.prototype.isMale = function () {
	return this._male;
};

Person.prototype.setMail = function (newMale) {
	this._male = newMale;
	return newMale;
};

exports.Person = Person;
