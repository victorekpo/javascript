import { IPerson, IStudent } from '../interfaces/people';

export class PersonClass implements IPerson {
    public name: string;
    public age: number;
    public height: string;
    public weight: string;
    public skills: string[];

    constructor(obj: IPerson){
        this.name = obj.name;
        this.age = obj.age;
        this.height = obj.height;
        this.weight = obj.weight;
        this.skills = obj.skills;
    }
    greet(): void {
        console.log("Hello",this.name,"how are you doing today? Maybe working on some",this.skills,"?");
    }

    calculate(): number {
        return 0;
    }

    study(): void {
    }
};

export class StudentClass extends PersonClass {
    public major: string;
    public minor: string | undefined;
    public GPA: number;

    constructor(obj: IStudent) {
        super(obj);
        this.major = obj.major;
        obj.minor && (this.minor = obj.minor);
        this.GPA = obj.GPA;
    }
};