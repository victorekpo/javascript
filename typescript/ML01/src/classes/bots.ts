import { Machine, Personality } from 'bots'
import { Neighborhood } from "./places";
import * as fs from 'fs';

const botsDB = './json/bots.json';
const ExistingBots = JSON.parse(fs.readFileSync(botsDB).toString() || '{}');

const searchBot = (botName: string) => ExistingBots[botName];

const randNum = (): number => Math.floor(Math.random()*10);

export class Robot implements Machine {
    public id: string;
    public chronId: number;
    public name: string;
    protected dob: string;
    public brain: any = {};
    public personality?: Personality;
    public residence?: Neighborhood;
    public bankBalance?: string;
    public cached?: boolean;
    static total: number = 0;

    constructor(name: string) {
        const botExists = searchBot(name);
        if(botExists) {
            console.log("Bot with same name already exists, loading now...")
            this.id = botExists.id;
            this.chronId = botExists.chronId;
            this.name = botExists.name;
            this.dob = botExists.dob;
            this.brain = botExists.brain;
            this.personality = botExists.personality;
            Robot.total = Math.max(Robot.total, botExists.chronId)
            this.cached = true;
        } else {
            this.dob = new Date().toLocaleString();
            this.id = (this.dob[0] || '0') + randNum() + '' + randNum() + 'A' + randNum() + 'B' + randNum() + '' + (this.dob[16] || '9') + 'C';
            this.chronId = Robot.total + 1;
            this.name = name;
            this.personality = { mood: 'discovery', attitude: 'none', currentIQ: 1 }
            this.cached = false;
            Robot.total = Robot.total + 1;
            console.log("Bot",this.name,"is born","\r\n", JSON.stringify(this,null,2));

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
        const result=`${day ? " "+day + "days" : ""}${hr ? " "+hr + "hrs" : ""}${min ? " "+min + "mins" : ""}${sec ? " "+sec + "secs" : ""}${ms ? " "+ms + "ms" : ""}`
        console.log("my name is",this.name, "my age is"+result+".", "I was born", this.dob)
        return result;
    }

    live(neighborhood: Neighborhood): string {
        console.log(`${this.name} just moved into ${neighborhood.name} on ${new Date().toLocaleString()}`);
        this.residence = neighborhood;
        // neighborhood.residents.directory['']
        return neighborhood.toString();
    }

    learn(options: any): any {
        const { type, item, value, limit=-1 } = options;
        this.processInformation(type, item, value, limit);
    }

    read(): any {
        const fs = require('fs');
        const md5 = require('md5');

        const watchedDir = 'C:\\Users\\Victor\\projects\\vic\\Programming\\Robot_Library\\';
        const watchedFile = '';
        const watched = watchedDir.concat(watchedFile);

        console.log(`\n**Watching for file changes on ${watched}**\n`);

        const md5HashTable: any = {}; // md5 hash table
        let fsWait: any = false;

        fs.watch(watched, (event: any, filename: any) => {
            console.log('event',event, filename);
            if (filename) {
                if (fsWait) return;
                fsWait = setTimeout(() => {
                    fsWait = false;
                }, 100);

                try {
                        const newFileContents = fs.readFileSync(watchedDir.concat(filename)).toString();
                    // MD5 Checks
                    const md5Current = md5(newFileContents);
                    if (md5Current === md5HashTable[filename] || md5HashTable[filename]?.includes(md5Current)) {
                        return;
                    }
                    if(!md5HashTable[filename]) md5HashTable[filename] = [md5Current]
                    else if (md5HashTable[filename]) md5HashTable[filename].push(md5Current);
                    if(md5HashTable[filename].length > 100) md5HashTable[filename] = md5HashTable[filename].splice(1);

                    console.log(`${filename} file Changed`);
                    console.log(`File Contents ${newFileContents}`)
                    console.log("MD5 table",md5HashTable)

                    this.processInformation('library',filename.split('.')[0],newFileContents);

                } catch (err) {
                    console.log(err)
                }
            }
        });
    }

    private processInformation(type: any, key: any, rawValue: any, limit: number = -1): any {
        const value = rawValue.length > 0 && typeof(rawValue) === 'object' ? rawValue.join('\r\n') : rawValue;
       // console.log("VALUE",value, rawValue)

        const formattedValue = value//.split('\r\n');

        const tryToParse = (obj:any) => {
            try {
                const fixObj = JSON.parse(obj);
                // console.log("obj",fixObj);
                return fixObj;
            } catch(err) {
               // console.log("err1",err)
            } try {
                const fixObj = JSON.parse("["+obj+"]");
                return fixObj;
            } catch(err) {
               // console.log("err2",err);
            }
        };

        if(value && limit !== 0) {
            if (!this.brain[type] || this.brain[type][key] === '{}' || this.brain[type][key] === '[]')
                this.brain[type] = {}; // form thoughts lol
            if (!this.brain[type][key] || this.brain[type][key] === '{}' || this.brain[type][key] === '[]')
                this.brain[type][key] = [];
            const itemExists = this.brain[type]?.[key]?.find(({value: val}: any) => ([val].flat().join('~') == [formattedValue].flat().join('~')
                    || val === formattedValue || val === value))
                || formattedValue.split('\r\n').every((line:any) => this.brain[type][key].includes({value:line})
                    || this.brain[type][key].reduce((exists: any,check: any) => {
                        if(check['value'].split('\r\n').find((i: any) => i === line))
                            exists = true;
                        return !!exists
                    },false)
                )
            console.log('exists?',!!itemExists);
            if(!itemExists && formattedValue.length === 1 && this.brain[type][key]?.length < 1)
                this.brain[type][key] = [{time: new Date(), value}];
            if(!itemExists && (formattedValue.length > 1 || (typeof(tryToParse(this.brain[type][key]?.[value])) === 'object'))) {
                const toAdd = [formattedValue].flat().join('~').split(/\r\n|~/)
                    .filter(x => { return x.includes('@@') ? true : !this.brain[type][key]
                        .find(({value}: any) => {
                           // console.log("COMPARISON",value,"COMPARISON 2", x);
                           //  console.log("term found",value.split('\r\n')
                           //      .find((y: any)=> {console.log(y,x,y===x);return y===x}));
                            return x === value || (value.split('\r\n')
                                .find((y: any)=> y===x))
                        })
                    }).join('\r\n') || null
                console.log('value TO ADD',toAdd)
                if(toAdd) {
                    this.brain[type][key] = Array.from(new Set([(this.brain[type][key].length > 0 ? this.brain[type][key] : []),{time: new Date(), value: toAdd}].flat()))
                }
            }
            if(limit > 0 && (typeof(tryToParse(this.brain[type][key])) === 'object') && this.brain[type][key].length > limit) {
                this.brain[type][key].splice(0,1);
            }
        }

        const currentBotsInJSON = JSON.parse(fs.readFileSync(botsDB).toString() || '{}');
        const allBots = {
            ...currentBotsInJSON,
            [this.name]: this
        };
        fs.writeFileSync(botsDB, JSON.stringify(allBots, null, 2));

        console.log(`\nwhats in my brain', ${JSON.stringify(this.brain)}`); //util.inspect(this.brain, {showHidden: false, depth: null, colors: true}))
    }
}