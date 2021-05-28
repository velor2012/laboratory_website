
declare class User {
    constructor(id: string, role: number, username: string, password: string, last_time: string, 
        relation: number, state: number=0, projects: any[], patents: any[], papers: any[], 
        competitions: any[]
        ){}
    id:string
    role:number
    username:string
    password:string
    last_time: string
    relation: number
    state: number
    projects: any[]
    papers: any[]
    competitions: any[]
    patents: any[]
}
