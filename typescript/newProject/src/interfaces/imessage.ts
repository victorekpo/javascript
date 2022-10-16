interface IMessage {
    name: string,
    id: number,
    message?: string
}

export const implementMessage = (obj: IMessage): any => {
    return obj;
}