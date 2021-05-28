import { AxiosResponse, AxiosError, AxiosInstance } from 'axios'
import CommonAPI, { generateResponse } from './common';
import { MyResponse } from './commondApi';
export class ProjectAPI extends CommonAPI {
  // protected prefix = '/categories'
  public uploadProjectUrl: string
  constructor() {
    super('/projects');
    this.uploadProjectUrl = this.prefix + '/upload'
  }
}
const MyProjectAPI = new ProjectAPI()
export default MyProjectAPI