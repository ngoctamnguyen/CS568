const sayHello = () => {
    return "Hello everyone!";
};
console.log(sayHello());

const sayHelloName = (name) => {
    return "Hello " + name;
};
console.log(sayHelloName("John"));

const sayHelloFullName = (fname, lname) => {
    return "Hello " + fname + " " + lname;
};
console.log(sayHelloFullName("John", "Smith"));

const sayHelloFullName1 = (fname, lname) => "Hello " + fname + " " + lname;
console.log(sayHelloFullName1("John", "Smith"));


