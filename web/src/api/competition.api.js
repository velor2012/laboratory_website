import { CommonApi } from "./common.api";

export class CompetitionApi extends CommonApi {
    constructor() {
        super('/competitions')
    }
}
export const myCompetitionApi = new CompetitionApi()