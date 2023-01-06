import { implementMessage } from './interfaces/imessage';
import { StringValidator } from "./interfaces/stringValidator";
import { LettersOnlyValidator } from "./classes/lettersValidator";
import { ZipCodeValidator } from "./classes/zipcodeValidator";
import { helloStr, isLearning, isLearningTS, isRich, myAge, myName } from './basics/basicTypes';
import { Student } from "./basics/typeAliases";
import { IStudent } from "./interfaces/people";
import { PersonClass, StudentClass } from "./classes/peopleClasses";

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
    calculate(): number {
        return 0;
    }, greet(): void {
    }, study(): void {
    },
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

// Classes & Extended Classes
const person01 = {
    name: 'Vic',
    age: 35,
    height: "5'07\"",
    weight: "175",
    skills: ["Java", "Typescript"]
};
const student01 = {
    ...person01,
    major: "Computer Science",
    minor: "Information Systems",
    GPA: 4.0
}
const newPerson = new PersonClass(person01);
console.log(newPerson);

const student2 = new StudentClass(student01);
console.log(student2);
student2.greet();
