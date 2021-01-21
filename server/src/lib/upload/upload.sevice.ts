import { Injectable } from "@nestjs/common";
import * as fs from 'fs';
import { v1 as uuidv1 } from 'uuid';
import {configService} from '../config.service'
export class imgUploadReturn {
    constructor(public originName: string,public fileName: string,public filePath: string) {}
  }
  @Injectable()
  export abstract class ImgUploadService {
      public abstract upload(file: any): Promise<imgUploadReturn>;
  }
@Injectable()
export class localUploader extends ImgUploadService {
  async upload(file: any, prefix: string = '') {
    let uuid: string = uuidv1();
    let extName: string = file.originalname.split('.').pop();
    fs.writeFileSync(`static/${uuid}.${extName}`, file.buffer);
    return new imgUploadReturn(
      file.originalname,
      `${uuid}.${extName}`,
      `http://${configService.getValue('HOST')}:${configService.getValue('PORT')}/${uuid}.${extName}`,
    )
  }
}