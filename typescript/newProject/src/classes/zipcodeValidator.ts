import { StringValidator } from "../interfaces/stringValidator";
import { numberRegexp } from "../utils/regex";

export class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string) {
        return s.length === 5 && numberRegexp.test(s);
    }
}