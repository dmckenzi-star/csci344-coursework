const original = {
    name: "Eve",
    age: 20,
    courses: ['CSCI 182', 'CSCI 344']
};

const copy = { ...original };
copy.name = "Eve Modified";
copy.courses.push("CSCI 370");

console.log("Original:", original);
console.log("Copy:", copy);
