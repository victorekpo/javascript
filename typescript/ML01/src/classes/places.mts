import { Environment, EnvironmentStats } from 'interfaces.mjs';

export class Neighborhood implements Environment {
    constructor(
        public city: string,
        public state: string,
        public statistics: EnvironmentStats
    ) {
        console.log('new environment')
    }
}