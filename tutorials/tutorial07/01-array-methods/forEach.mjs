const students = [
    { name: "Alice", age: 20, grade: 85, major: "Computer Science" },
    { name: "Bob", age: 21, grade: 92, major: "Mathematics" },
    { name: "Charlie", age: 19, grade: 78, major: "Computer Science" },
    { name: "Diana", age: 22, grade: 95, major: "Physics" },
    { name: "Eve", age: 20, grade: 88, major: "Computer Science" }
];

// you can defined the callback function in advance:
const printName = (students) => {
    console.log(name);  // Prints: 2, 4, 6
}
students.forEach(myCallback);

// you can also define the callback function as an anonymous function:
numbers.forEach((num) => {
    console.log(num * 2)
});