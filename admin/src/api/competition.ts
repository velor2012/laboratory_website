import { AxiosResponse, AxiosError, AxiosInstance } from 'axios'
import CommonAPI, { generateResponse } from './common';
import { MyResponse } from './commondApi';
export class CompetitionAPI extends CommonAPI {
  // protected prefix = '/categories'
  public uploadCompetitionUrl: string
  constructor() {
    super('/competitions');
    this.uploadCompetitionUrl = this.prefix + '/upload'
  }
}
const MyCompetitionAPI = new CompetitionAPI()
export default MyCompetitionAPI