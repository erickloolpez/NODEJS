
import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { DictionaryController } from "./dictionary.controller";
import { DictionaryService } from "./dictionary.service";
import { WordModule } from "src/words/word.module";

@Module({
  controllers: [DictionaryController],
  providers: [DictionaryService],
  imports: [PrismaModule, WordModule],
})
export class DictionaryModule {
}