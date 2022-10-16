import { implementMessage } from './interfaces/imessage';
import { StringValidator } from "./interfaces/stringValidator";
import { LettersOnlyValidator } from "./classes/lettersValidator";
import { ZipCodeValidator } from "./classes/zipcodeValidator";
import { helloStr, isLearning, isLearningTS, isRich, myAge, myName } from './basics/basicTypes';
import { Student } from "./basics/typeAliases";
import { IStudent } from "./interfaces/people";

// Basic Types
console.log("Testing Basic Types");
console.log(helloStr, myName, myAge, isRich, isLearning, isLearningTS);


// Basic Interface
let objTest = {
    name: 'Victor',
    id: 7,
    message: "Hello world"
}
const interfaceTest = implementMessage(objTest);
console.log("Testing Interfaces");
console.log(interfaceTest);

let vicStudent: IStudent = {
    name: "Victor E",
    age: 35,
    height: "5'7",
    weight: "175",
    skills: ["coding"],
    major: "Computer Science",
    GPA: 4.0
};
console.log(vicStudent);

// Classes
// Some samples to try
let strings = ["Hello", "98052", "101"];
// Validators to use
let validators: { [s: string]: StringValidator } = {};
validators["ZIP code"] = new ZipCodeValidator();
validators["Letters only"] = new LettersOnlyValidator();
// Show whether each string passed each validator
strings.forEach((s) => {
    for (let name in validators) {
        console.log(
            `"${s}" - ${
                validators[name]?.isAcceptable(s) ? "matches" : "does not match"
            } ${name}`
        );
    }
});

//Type Aliases
let newStudent: Student = {
    name: "Victor",
    age: 35,
    height: "5'7",
    weight: "175",
    skills: ["programming/coding", "photography", "DJing", "working out"],
    major: "Computer Science",
    GPA: 4.0
}
console.log("this is a new student", newStudent)