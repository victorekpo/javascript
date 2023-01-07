import { Machine, Personality } from 'interfaces'
import { Neighborhood } from "./places";
import ExistingBots from '../json/bots.json';

const searchBot = (botName: string) => ExistingBots.find(({ name }: any) => name === botName);

export class Robot implements Machine {
    public id: string;
    public chronId: number;
    public name: string;
    protected dob: string;
    public brain: any = {};
    public personality: Personality;
    public residence?: Neighborhood;
    public bankBalance?: string;
    public cached?: boolean;
    static total: number = 0;

    constructor(name: string, personality: Personality) {
        const botExists = searchBot(name);
        if(botExists) {
            this.id = botExists.id;
            this.chronId = botExists.chronId;
            this.name = botExists.name;
            this.dob = botExists.dob;
            this.personality = botExists.personality;
            Robot.total = Math.max(Robot.total, botExists.chronId)
            this.cached = true;
        } else {
            this.id = '1';
            this.chronId = Robot.total++;
            this.name = name;
            this.dob = new Date().toLocaleString();
            this.personality = personality;
            this.cached = false;
            Robot.total = Robot.total++;
            console.log(`new human, name: ${this.name}, dob: ${this.dob}, personality: ${JSON.stringify(personality, null, 2)}`);
        }
        console.log('total robots',Robot.total);
    }

    getAge(): string {
        let ms, sec, min, hr, day;
        let diff = new Date().valueOf() - new Date(this.dob).valueOf();

        const calcTime = (ms: any) => {
            diff = diff % ms;
        }

        while (diff > 0) {
            if (diff >= 86400000) {
                day = Math.floor(diff / 86400000);
                calcTime(86400000);
            }
            if (diff >= 3600000) {
                hr = Math.floor(diff /3600000);
                calcTime(3600000);
            }
            if (diff >= 60000) {
                min = Math.floor(diff /60000);
                calcTime(60000);
            }
            if (diff >= 1000) {
                sec = Math.floor(diff /1000);
                calcTime(1000);
            }
            if (diff < 1000) {
                ms = diff;
                diff = 0;
            }
        }
        const result=`${day ? day + "days" : ""} ${hr ? hr + "hrs" : ""} ${min ? min + "mins" : ""} ${sec ? sec + "secs" : ""} ${ms ? ms + "ms" : ""}`
        console.log("my age is",result, "\nI was born", this.dob)
        return result;
    }

    live(neighborhood: Neighborhood): string {
        console.log(`${this.name} just moved into ${neighborhood.name} on ${new Date().toLocaleString()}`);
        this.residence = neighborhood;
        // neighborhood.residents.directory['']
        return neighborhood.toString();
    }

    learn(options: any): any {
        const { type, item, value } = options;
        if(!this.brain[type]) this.brain[type] = {};
        this.brain[type][item] = value;
        console.log('whats in my brain',this.brain);
    }
}