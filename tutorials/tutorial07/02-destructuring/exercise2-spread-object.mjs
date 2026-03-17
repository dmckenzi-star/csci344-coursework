const basicInfo = { name: "Diana", age: 22 };
const contactInfo = { email: "diana@example.com", phone: "555-1234" };

const merged = { ...basicInfo, ...contactInfo };
console.log(merged);
