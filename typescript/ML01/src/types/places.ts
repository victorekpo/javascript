import { Robot } from "../classes/bots";

export interface Environment {
    name: string,
    city: string,
    state: string,
    statistics?: EnvironmentStats,
    affectResident(resident: Robot, options: any): void
}

export interface EnvironmentStats {
    restaurants: string[],
    population: number
}

export interface Resident {
    [k: string]: Robot
}