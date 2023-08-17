class Car {
    constructor(make, model) {
        this.make = make;
        this.model = model;
    }

    getInfo() {
        return `The car is a ${this.make} ${this.model}`;
    }
}

// Object
let myCar1 = new Car ("Tesla", "Model Y");
let myCar2 = new Car("Toyota", "Camry");
let myCar3 = new Car("Honda", "Freed");

console.log(myCar1.getInfo());
console.log(myCar2.getInfo());
console.log(myCar3.getInfo());