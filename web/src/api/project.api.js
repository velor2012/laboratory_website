import { CommonApi } from "./common.api";

export class ProjectApi extends CommonApi {
    constructor() {
        super('/projects')
    }
}
export const myProjectApi = new ProjectApi()