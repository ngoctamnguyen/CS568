import Student from './student.js';
import { minutesInHour } from './helper.js';
import { sayHi } from './helper.js';

const student1 = new Student('Bob');
console.log(student1.sayHi());
console.log(student1.sayYourAge());
console.log(sayHi());
console.log(minutesInHour);