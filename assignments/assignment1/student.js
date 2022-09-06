import Person from './person.js';
class Student extends Person {
    constructor(name) {
        super(17);
        this.name = name;
    }
    sayHi = () => `Hi. I am ${this.name} and ${this.age} years old`;
}
export default Student;