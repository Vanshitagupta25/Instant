import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

export const multerConfig = MulterModule.register({
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const uniqueName =
        Date.now() + '-' + file.originalname;

      cb(null, uniqueName);
      console.log(file);
    },
  }),
});