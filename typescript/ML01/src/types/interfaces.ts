import { Robot } from "../classes/bots";

export interface Machine {
    bankBalance?: string | undefined
}

export interface Personality {
    attitude: string
}

export interface Environment {
    city: string
    state: string
    statistics: EnvironmentStats,
    affectResident(resident: Robot, options: any): void
}

export interface EnvironmentStats {
    restaurants: string[],
    population: number
}

export interface Residents {
    total: number
}