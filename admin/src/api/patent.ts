import { AxiosResponse, AxiosError, AxiosInstance } from 'axios'
import CommonAPI, { generateResponse } from './common';
import { MyResponse } from './commondApi';
export class PatentAPI extends CommonAPI {
  // protected prefix = '/categories'
  public uploadPatentUrl: string
  constructor() {
    super('/patents');
    this.uploadPatentUrl = this.prefix + '/upload'
  }
}
const MyPatentAPI = new PatentAPI()
export default MyPatentAPI