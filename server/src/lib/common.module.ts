import { Module, Global } from "@nestjs/common";
import { DbModule } from "./db/db.module";
import { AuthModule } from "./auth/jwt_auth.module";
import { UploadModule } from "./upload/upload.module";
import {localUploader, ImgUploadService } from "./upload/upload.sevice";
//判断使用过何种图片上传方法
const configServiceProvider = {
    provide: ImgUploadService,
    useClass:localUploader
      // process.env.USEGITHUB == "1"
      //   ? githubUploader
      //   : localUploader,
  };
@Global()
@Module({
    imports: [
        DbModule,
        AuthModule,
        UploadModule
    ],
    providers:[configServiceProvider],
    exports:[configServiceProvider]
})
export class CommonModule {}
