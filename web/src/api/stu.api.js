import { CommonApi,generateResponse } from "./common.api";

export class StuApi extends CommonApi {
    constructor() {
        super('/stus')
    }
    async findAllInSchoolAPI(axios, pageSize, page) {
        let error = false;
        let res = await axios.get(`${this.prefix}/state/在读`, {
          params: {
            pageSize: pageSize,
            page: page,
          },
        });
        return generateResponse(res);
      }
    async findAllGraduatedAPI(axios, pageSize, page) {
        let error = false;
        let res = await axios.get(`${this.prefix}/state/毕业`, {
          params: {
            pageSize: pageSize,
            page: page,
          },
        });
        return generateResponse(res);
      }
}
export const myStuApi = new StuApi()