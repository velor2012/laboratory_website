import { CommonApi } from "./common.api";

export class PatentApi extends CommonApi {
    constructor() {
        super('/patents')
    }
}
export const myPatentApi = new PatentApi()