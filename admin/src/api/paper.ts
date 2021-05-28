import { AxiosResponse, AxiosError, AxiosInstance } from 'axios'
import CommonAPI, { generateResponse } from './common';
import { MyResponse } from './commondApi';
export class PaperAPI extends CommonAPI {
  // protected prefix = '/categories'
  public uploadPaperUrl: string
  constructor() {
    super('/papers');
    this.uploadPaperUrl = this.prefix + '/upload'
  }
  public async findAllPaperNameApi(
    axios: AxiosInstance,
  ): Promise<MyResponse> {
    let res = await axios
      .get(`${this.prefix}/allName`)
    return generateResponse(res as AxiosResponse);
  }
}
const MyPaperAPI = new PaperAPI()
export default MyPaperAPI