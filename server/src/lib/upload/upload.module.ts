import { MulterModule } from "@nestjs/platform-express";
import {configService} from '../config.service'
import { Module } from "@nestjs/common";
import { ImgUploadService, localUploader } from "./upload.sevice";
const my_module = MulterModule.registerAsync({
    useFactory: async () => ({
    //   dest: configService.getValue('MULTER_DEST'),
    }),
  });

@Module({
    imports: [my_module],
    exports: [my_module]
})
export class UploadModule {}