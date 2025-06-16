
import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { DictionaryController } from "./dictionary.controller";
import { DictionaryService } from "./dictionary.service";

@Module({
  controllers: [DictionaryController],
  providers: [DictionaryService],
  imports: [PrismaModule]
})
export class DictionaryModule {
}