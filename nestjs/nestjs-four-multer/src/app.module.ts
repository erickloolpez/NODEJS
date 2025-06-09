import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { diskStorage } from 'multer';
import { editFileName } from './utils/file-upload.utils';


@Module({
  imports: [MulterModule.register({
    storage: diskStorage({
      destination: './uploads',
      filename: editFileName,
    }),
  }),
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'uploads'),
    serveRoot: '/public',
  })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
