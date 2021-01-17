import { Module, Global } from "@nestjs/common";
import { DbModule } from "./db/db.module";
import { JwtModule } from '@nestjs/jwt';
// import { ImgUploadService, githubUploader, localUploader } from './common/uploadImg.service';
// //判断使用过何种图片上传方法
// const configServiceProvider = {
//     provide: ImgUploadService,
//     useClass:
//       process.env.USEGITHUB == "1"
//         ? githubUploader
//         : localUploader,
// };
  

@Module({
    imports: [
        DbModule
    ]

})
export class CommonModule {}
