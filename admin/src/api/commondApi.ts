import {AxiosResponse,AxiosInstance} from 'axios'
export class MyResponse<T = any> { 
    success: boolean = true
    data!: T
    constructor() { 
        this.success = true
    }
}
export interface ICommonAPI { 
    findAllAPI(axios: AxiosInstance, pageSize: number, page: number): Promise<MyResponse>
    createAPI(axios:AxiosInstance ,formdata:object): Promise<MyResponse>
    findOneAPI(axios:AxiosInstance,id:string): Promise<MyResponse>
    deleteAPI(axios:AxiosInstance,id:string): Promise<MyResponse>
    updateAPI(axios:AxiosInstance,id:string,formdata:object):Promise<MyResponse>
}
