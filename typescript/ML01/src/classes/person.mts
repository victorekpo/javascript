import { Personality } from 'interfaces.mjs'

export class Human {
    constructor(
        public name: string,
        protected age: number,
        public personality: Personality
    ) {
        console.log(`new human, name: ${this.name}, personality: ${JSON.stringify(personality, null, 2)}`);
    }
}