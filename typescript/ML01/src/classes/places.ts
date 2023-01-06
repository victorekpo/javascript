import { Environment, EnvironmentStats, Residents } from 'interfaces';
import { Human } from "./persons";

export class Neighborhood implements Environment {
    constructor(
        public name: string,
        public city: string,
        public state: string,
        public statistics: EnvironmentStats,
        public residents: Residents
    ) {
        console.log('new environment')
    }
    public affectResident(resident: Human, options: any) {
        const { type = null, newPersonality = null, newBankBalance = null } = options;
        console.log("\r\n****",type,"affected",resident.name,"****\r\n")
        console.log("effects",options,"\r\n")
        resident.personality = newPersonality;
        resident.bankBalance = newBankBalance;
    }
}