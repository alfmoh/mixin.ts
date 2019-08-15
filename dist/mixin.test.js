"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mixin_1 = require("./mixin");
var sinon = require("sinon");
var chai_1 = require("chai");
// tslint:disable:typedef
describe("mixin", function () {
    it("should have a working test", function () {
        chai_1.expect(true).to.not.equal(false);
    });
    it("should be a function", function () {
        chai_1.expect(typeof mixin_1.mixin).to.equal("function");
    });
    it("should return an object if second argument isn't passed", function () {
        // arrange
        var callback = sinon.spy(), arr = [callback], proxy = mixin_1.mixin(arr);
        // act
        // assert
        chai_1.expect(typeof proxy).to.equal("object");
    });
    it("should return a function if second argument is passed", function () {
        // arrange
        var callback = sinon.spy(), arr = [callback], proxy = mixin_1.mixin(arr, true);
        // act
        // assert
        chai_1.expect(typeof proxy).to.equal("function");
    });
    it("should return a function that contains methods of passed functions", function () {
        // arrange
        var func1 = function (name) {
            this.name = name;
        };
        func1.prototype.greet = function () { return "hello"; };
        var func2 = function (name) {
            this.name = name;
        };
        func2.prototype.speak = function () { return "hello"; };
        var arr = [func1, func2];
        var proxy = mixin_1.mixin(arr);
        // act
        // assert
        chai_1.expect(proxy.greet).to.be.a("function");
        chai_1.expect(proxy.speak).to.be.a("function");
    });
    it("should return a function that contains properties of passed functions", function () {
        // arrange
        var func1 = function () { };
        func1.prototype.greet = function () { return "hello"; };
        func1.prototype.person = "Alf";
        var func2 = function () { };
        func2.prototype.speak = function () { return "hello"; };
        func2.prototype.num = 1;
        // act
        var arr = [func1, func2];
        var proxy = mixin_1.mixin(arr);
        // assert
        chai_1.expect(proxy.person).to.equal("Alf");
        chai_1.expect(proxy.num).to.equal(1);
    });
    it("should return an error if passed in argument isn't an array", function () {
        // arrange
        var proxy = function () { return mixin_1.mixin.call(null, function () { }); };
        // act
        // assert
        chai_1.expect(proxy).to.throw("classes should be put in an array");
    });
    it("should return an error passed in array contains no classes", function () {
        // arrange
        var proxy = function () { return mixin_1.mixin.call(null, []); };
        // act
        // assert
        chai_1.expect(proxy).to.throw("No class specified to extend from");
    });
});
