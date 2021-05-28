import { AxiosResponse, AxiosError, AxiosInstance } from "axios";
import CommonAPI, { generateResponse } from "./common";
import { MyResponse } from "./commondApi";
export class UserAPI extends CommonAPI {
  // protected prefix = '/categories'
  public userLogoutUrl: string;
  public userLoginUrl: string;
  public currentUserUrl: string;
  public imgUploadUrl: string;
  constructor() {
    super("/users");
    this.imgUploadUrl = this.prefix + "/img";
    this.userLogoutUrl = this.prefix + "/logout";
    this.currentUserUrl = this.prefix + "/currentUser";
    this.userLoginUrl = this.prefix + "/login";
  }

  public async loginAPI(
    axios: AxiosInstance,
    user: object
  ): Promise<MyResponse> {
    let res = await axios.post(this.userLoginUrl, user);
    return generateResponse(res as AxiosResponse);
  }
  public async findAllAPI(
    axios: AxiosInstance,
    pageSize?: number,
    page?: number,
    withRelation?: boolean
  ): Promise<MyResponse> {
    let res = await axios.get(`${this.prefix}`, {
      params: {
        pageSize: pageSize,
        page: page,
        withRelation: withRelation,
      },
    });
    return generateResponse(res as AxiosResponse);
  }
  public async findOneAPI(
    axios: AxiosInstance,
    id: string,
    withRelation?: boolean
  ): Promise<MyResponse> {
    let res = await axios.get(`${this.prefix}/${id}`, {
      params: { withRelation: withRelation },
    });
    return generateResponse(res as AxiosResponse);
  }
  public async findAllUserNameApi(axios: AxiosInstance): Promise<MyResponse> {
    let res = await axios.get(`${this.prefix}/allName`);
    return generateResponse(res as AxiosResponse);
  }
  public async findOneByNameApi(
    axios: AxiosInstance,
    username: string,
    withRelation?: boolean
  ): Promise<MyResponse> {
    let res = await axios.get(`${this.prefix}/name/${username}`, {
      params: { withRelation: withRelation },
    });
    return generateResponse(res as AxiosResponse);
  }
  public async getCurrentUser(axios: AxiosInstance): Promise<MyResponse> {
    let res = await axios.get(`${this.prefix}/currentUser`);
    return generateResponse(res as AxiosResponse);
  }
  public async findAllRelationsAPI(
    axios: AxiosInstance,
    id: string,
    relation_name: string,
    pageSize?: number,
    page?: number
  ): Promise<MyResponse> {
    let res = await axios.get(`${this.prefix}/relations/${id}`, {
      params: {
        pageSize: pageSize,
        page: page,
        relation: relation_name,
      },
    });
    return generateResponse(res as AxiosResponse);
  }

  public async updatePasswd(
    axios: AxiosInstance,
    id: string | number,
    newpasswd: string
  ): Promise<MyResponse> {
    let res = await axios.put(`${this.prefix}/pass/${id}`, {
      password: newpasswd,
    });
    return generateResponse(res as AxiosResponse);
  }
}
const MyUserAPI = new UserAPI();
export default MyUserAPI;
