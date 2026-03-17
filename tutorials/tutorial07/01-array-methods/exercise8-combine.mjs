const students = [
    { name: "Alice", age: 20, grade: 85, major: "Computer Science" },
    { name: "Bob", age: 21, grade: 92, major: "Mathematics" },
    { name: "Charlie", age: 19, grade: 78, major: "Computer Science" },
    { name: "Diana", age: 22, grade: 95, major: "Physics" },
    { name: "Eve", age: 20, grade: 88, major: "Computer Science" }
];

const result = students
    .filter((student) => student.major === "Computer Science" && student.grade >= 85)
    .map((student) => student.name);
console.log(result);
