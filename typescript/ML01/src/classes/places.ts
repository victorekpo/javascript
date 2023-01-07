import { Environment, EnvironmentStats, Resident } from 'places';
import { Robot } from "./bots";

export class Neighborhood implements Environment {
    public name: string;
    public city: string;
    public state: string;
    public restaurants?: string[];
    public statistics?: EnvironmentStats;
    public residents?: Resident[];

    constructor(name: string, options: any) {
        const { city, state, restaurants = [] } = options;
        this.name = name;
        this.city = city;
        this.state = state;
        this.restaurants = restaurants;
        console.log('new environment', this)
    }
    public affectResident(resident: Robot, options: any) {
        const { type = null, newPersonality = null, newBankBalance = null } = options;
        console.log("\r\n****",type,"affected",resident.name,"****\r\n")
        console.log("effects",options,"\r\n")
        resident.personality = newPersonality;
        resident.bankBalance = newBankBalance;
    }
}