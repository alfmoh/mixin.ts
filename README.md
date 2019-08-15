# Mixin.ts
A typescript library which allows a class to extend multiple classes. 

## Import
`import { mixin } from "mixin.ts"`

## Usage

```ts
let className = mixin([classToInheritFrom1, classToInheritFrom2,...])
```

*classes can be written as TypeScript classes or just functions*
```ts
// function
function Car () {}
Car.prototype.drive = (name: string) {
    console.log(`This ${name} can drive very fast`);
}
Car.prototype.model = "Toyota";


// TypeScript class
class Lorry {
    carry(weight:number) {
        console.log(`This vehicle can carry ${weight} kg`);
    }
}

// Truck contains methods and properites from both Car and lorry
const Truck = mixin([Car,Lorry]);

Truck.drive("truck"); // This truck can drive very fast
Truck.carry(10); // This vehicle can carry 10 kg

console.log(Truck.model) // Toyota
```

By default, `mixin` returns an instance of the created class. To return the created class or function itself, pass `true` as the second argument to `mixin`.

```ts
const Truck = mixin([Car,Lorry],true);
const truck = new Truck();
truck.drive("new truck"); // This new truck can drive very fast
truck.carry(100); // This vehicle can carry 100 kg
```

## Install Choices
- `npm install mixin.ts`
- [download the zip](https://github.com/alfmoh/mixin.ts/archive/master.zip)
- [clone the repo](https://github.com/alfmoh/mixin.ts.git)

## License

(The MIT License)

[MIT License](https://alfmo.mit-license.org/)