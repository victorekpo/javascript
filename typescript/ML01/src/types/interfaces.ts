import { Human } from "../classes/persons";

export interface Person {
    bankBalance?: string | undefined
}

export interface Personality {
    attitude: string
}

export interface Environment {
    city: string
    state: string
    statistics: EnvironmentStats,
    affectResident(resident: Human, options: any): void
}

export interface EnvironmentStats {
    restaurants: string[],
    population: number
}

export interface Residents {
    total: number
}