export class MyResponse {
  data = null;
  success = true;
  constructor() {
    this.success = true;
  }
}
export class CommonApi {
  constructor(prefix) {
      this.BASE_URL = process.env.VUE_APP_BASE_URL;
      this.prefix =  `${this.BASE_URL}${prefix}`
      console.log( process.env.VUE_APP_BASE_URL)
      console.log( this.prefix)
  }
  async findAllAPI(axios, pageSize, page) {
    let error = false;
    let res = await axios.get(`${this.prefix}`, {
      params: {
        pageSize: pageSize,
        page: page,
      },
    });
    return generateResponse(res);
  }
  async findOneAPI(axios, id) {
    let error = false;
    let res = await axios.get(`${this.prefix}/${id}`);
    return generateResponse(res);
  }
}
import _ from "lodash";
export function isRequestSucceed(res) {
	return _.get(res, "status") == 201 || _.get(res, "status") == 200;

}
export function generateResponse(res) {
  let myResponse = new MyResponse();
  myResponse.success = isRequestSucceed(res);
  myResponse.data = res.data;
  return myResponse;
}
