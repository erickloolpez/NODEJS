import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { diskStorage } from 'multer';
import { editFileName } from './utils/file-upload.utils';
import { UserModule } from './users/user.module';
import { WordModule } from './words/word.module';
import { DictionaryModule } from './dictionary/dictionary.module';
import { HistoryModule } from './history/history.module';


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
  }),
    UserModule,
    WordModule,
    DictionaryModule,
    HistoryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
