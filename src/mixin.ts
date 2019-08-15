export function mixin(classes: Function[], initialize: boolean = false): any {
  let _func: () => void = function(): void {},
    getType = element => typeof element === "function";
  if (!Array.isArray(classes)) {
    throw new Error("classes should be put in an array");
  }
  if (!classes || classes.length === 0 || !classes.every(getType)) {
    throw new Error("No class specified to extend from");
  }

  function applyMixins(derivedCtor: any, baseCtors: any[]): void {
    baseCtors.forEach(baseCtor => {
      Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
        Object.defineProperty(derivedCtor.prototype, name, <any>(
          Object.getOwnPropertyDescriptor(baseCtor.prototype, name)
        ));
      });
    });
  }

  applyMixins(_func, classes);
  if (!initialize) {
    return new _func();
  }

  return _func;
}
