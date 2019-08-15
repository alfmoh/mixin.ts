import { mixin } from "./mixin";

import * as sinon from "sinon";
import { expect } from "chai";
// tslint:disable:typedef
describe("mixin", () => {
  it("should have a working test", () => {
    expect(true).to.not.equal(false);
  });
  it("should be a function", () => {
    expect(typeof mixin).to.equal("function");
  });
  it("should return an object if second argument isn't passed", () => {
    // arrange
    let callback = sinon.spy(),
      arr = [callback],
      proxy = mixin(arr);

    // act

    // assert
    expect(typeof proxy).to.equal("object");
  });
  it("should return a function if second argument is passed", () => {
    // arrange
    let callback = sinon.spy(),
      arr = [callback],
      proxy = mixin(arr, true);

    // act
    // assert
    expect(typeof proxy).to.equal("function");
  });
  it("should return a function that contains methods of passed functions", () => {
    // arrange
    let func1 = function(name) {
      this.name = name;
    };
    func1.prototype.greet = () => "hello";

    let func2 = function(name) {
      this.name = name;
    };
    func2.prototype.speak = () => "hello";
    const arr = [func1, func2];
    let proxy = mixin(arr);

    // act
    // assert
    expect(proxy.greet).to.be.a("function");
    expect(proxy.speak).to.be.a("function");
  });
  it("should return a function that contains properties of passed functions", () => {
    // arrange
    let func1 = () => {};
    func1.prototype.greet = () => "hello";
    func1.prototype.person = "Alf";

    let func2 = () => {};
    func2.prototype.speak = () => "hello";
    func2.prototype.num = 1;

    // act
    const arr = [func1, func2];
    let proxy = mixin(arr);

    // assert
    expect(proxy.person).to.equal("Alf");
    expect(proxy.num).to.equal(1);
  });
  it("should return an error if passed in argument isn't an array", () => {
    // arrange
    let proxy = () => mixin.call(null, () => {});
    // act
    // assert
    expect(proxy).to.throw("classes should be put in an array");
  });
  it("should return an error passed in array contains no classes", () => {
    // arrange
    let proxy = () => mixin.call(null, []);
    // act
    // assert
    expect(proxy).to.throw("No class specified to extend from");
  });
});
