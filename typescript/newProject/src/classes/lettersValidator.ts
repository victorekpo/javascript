import { StringValidator } from "../interfaces/stringValidator";
import { lettersRegexp } from "../utils/regex";

export class LettersOnlyValidator implements StringValidator {
    isAcceptable(s: string) {
        return lettersRegexp.test(s);
    }
}