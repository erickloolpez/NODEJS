import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return await this.appService.processFileUpload(file);
  }

  @Post('genesis')
  async creation(@Body() data: any) {
    const resultado = await this.appService.processEntry(
      data,
      1,
      1,
      "Mi historia sobre ética"
    );
    return resultado
  }
}
