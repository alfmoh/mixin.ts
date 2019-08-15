"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function mixin(classes, initialize) {
    if (initialize === void 0) { initialize = false; }
    var _func = function () { }, getType = function (element) { return typeof element === "function"; };
    if (!Array.isArray(classes)) {
        throw new Error("classes should be put in an array");
    }
    if (!classes || classes.length === 0 || !classes.every(getType)) {
        throw new Error("No class specified to extend from");
    }
    function applyMixins(derivedCtor, baseCtors) {
        baseCtors.forEach(function (baseCtor) {
            Object.getOwnPropertyNames(baseCtor.prototype).forEach(function (name) {
                Object.defineProperty(derivedCtor.prototype, name, (Object.getOwnPropertyDescriptor(baseCtor.prototype, name)));
            });
        });
    }
    applyMixins(_func, classes);
    if (!initialize) {
        return new _func();
    }
    return _func;
}
exports.mixin = mixin;
