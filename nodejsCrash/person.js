// (function(exports, require, module, __filename, __dirname) {

// })()   wrapper fn

// console.log(__dirname, __filename)

class Person {
    constructor(...personProp) {
        this.name = personProp[0];
        this.age = personProp[1];
    }

    greeting() {
        console.log(`my name is ${this.name} and I'm ${this.age} years old`)
    }
}

module.exports = Person;