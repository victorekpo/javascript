export interface Personality {
    attitude: string
}

export interface Environment {
    city: string
    state: string
    statistics: EnvironmentStats
}

export interface EnvironmentStats {
    restaurants: string[],
    population: number
}