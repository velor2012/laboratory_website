// import { ICommonAPI, MyResponse } from "@/types/commondApi";
import { AxiosResponse, AxiosError, AxiosInstance } from "axios";
import _ from "lodash";
import { ICommonAPI, MyResponse } from "./commondApi";
export function isRequestSucceed(res: AxiosResponse) {
  return _.get(res, "status") == 201 || _.get(res, "status") == 200;
}
export default class CommonAPI implements ICommonAPI {
  protected prefix: string;
  constructor(prefix: string) {
    this.prefix = prefix;
  }
  public async findAllAPI(
    axios: AxiosInstance,
    pageSize?: number,
    page?: number
  ): Promise<MyResponse> {
    let res = await axios.get(`${this.prefix}`, {
      params: {
        pageSize: pageSize,
        page: page,
      },
    });
    return generateResponse(res as AxiosResponse);
  }
  public async findOneAPI(
    axios: AxiosInstance,
    id: string
  ): Promise<MyResponse> {
    let res = await axios.get(`${this.prefix}/${id}`);
    return generateResponse(res as AxiosResponse);
  }

  public async getTotalAPI(
    axios: AxiosInstance,
  ): Promise<MyResponse> {
    let res = await axios.get(`${this.prefix}/total`);
    return generateResponse(res as AxiosResponse);
  }

  public async createAPI(
    axios: AxiosInstance,
    formdata: object
  ): Promise<MyResponse> {
    let res = await axios.post(`${this.prefix}`, formdata);
    return generateResponse(res as AxiosResponse);
  }

  public async updateAPI(
    axios: AxiosInstance,
    id: string,
    formdata: object
  ): Promise<MyResponse> {
    let res = await axios.put(`${this.prefix}/${id}`, formdata);
    return generateResponse(res as AxiosResponse);
  }

  public async deleteAPI(
    axios: AxiosInstance,
    id: string
  ): Promise<MyResponse> {
    let res = await axios.delete(`${this.prefix}/${id}`);
    return generateResponse(res as AxiosResponse);
  }

  public async uploadImg(
    url: string,
    axios: AxiosInstance,
    file: File
  ): Promise<MyResponse> {
    var formData = new FormData();
    formData.append("file", file);
    let res = await axios.post(url, formData);
    return generateResponse(res as AxiosResponse);
  }
}
export function generateResponse(res: AxiosResponse): MyResponse {
  let myResponse = new MyResponse();
  myResponse.success = isRequestSucceed(res);
  myResponse.data = res.data;
  return myResponse;
}
