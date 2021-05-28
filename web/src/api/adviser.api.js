import { CommonApi } from "./common.api";

export class AdviserApi extends CommonApi {
    constructor() {
        super('/advisers')
    }
}
export const myAdviserApi = new AdviserApi()