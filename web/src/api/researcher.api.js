import { CommonApi } from "./common.api";

export class ResearcherApi extends CommonApi {
    constructor() {
        super('/researchers')
    }
}
export const myResearcherApi = new ResearcherApi()