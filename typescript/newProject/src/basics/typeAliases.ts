export type Person = {
    name: string,
    age: number,
    height: string,
    weight: string,
    skills: string[],
    relations?: Family
}

export type Family = {
    mother: string,
    father: string,
    brothers?: string[],
    sisters?: string[],
    aunties?: string[],
    uncles?: string[],
    cousins?: string[],
    nieces?: string[],
    nephews?: string[]
}

export type Student = Person & {
    major: string,
    minor?: string,
    GPA: number
}