import { CommonApi } from "./common.api";

export class TeacherApi extends CommonApi {
    constructor() {
        super('/teachers')
    }
}
export const myTeacherApi = new TeacherApi()