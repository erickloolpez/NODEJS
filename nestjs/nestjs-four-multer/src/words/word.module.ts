import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { WordController } from "./word.controller";
import { WordService } from "./word.service";

@Module({
  controllers: [WordController],
  providers: [WordService],
  imports: [PrismaModule]
})
export class WordModule {
}