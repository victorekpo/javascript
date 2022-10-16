export interface IPerson {
    name: string,
    age: number,
    height: string,
    weight: string,
    skills: string[],
    relations?: IFamily
}

export interface IFamily {
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

export interface IStudent extends IPerson {
    major: string,
    minor?: string,
    GPA: number
}