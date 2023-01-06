import { Person, Personality } from 'interfaces'
import { Neighborhood } from "./places";

export class Human implements Person {
    public bankBalance: string | undefined;

    constructor(
        public name: string,
        protected age: number,
        public personality: Personality,
        public residence: Neighborhood | null
    ) {
        console.log(`new human, name: ${this.name}, personality: ${JSON.stringify(personality, null, 2)}`);
    }

    public live(neighborhood: Neighborhood): string {
        console.log(`${this.name} just moved into ${neighborhood.name} on ${new Date().toLocaleString()}`);
        this.residence = neighborhood;
        return neighborhood.toString();
    }
}