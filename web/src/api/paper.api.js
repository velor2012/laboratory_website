import { CommonApi,generateResponse } from "./common.api";

export class PaperApi extends CommonApi {
    constructor() {
        super('/papers')
    }
    async findByYearAPI(axios, year) {
        let res = await axios.get(`${this.prefix}/year/${year}`);
        return generateResponse(res);
      }
}
export const myPaperApi = new PaperApi()