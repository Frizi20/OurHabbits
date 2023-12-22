export interface IPerson {
    userId:string
    name:string
    image:string,
    email:string
}

export interface OnlinePeople {
    [ket:string]:IPerson
}