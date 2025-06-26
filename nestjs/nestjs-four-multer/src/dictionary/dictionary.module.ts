
import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { DictionaryController } from "./dictionary.controller";
import { DictionaryService } from "./dictionary.service";
import { UserModule } from "src/users/user.module";

@Module({
  controllers: [DictionaryController],
  providers: [DictionaryService],
  imports: [PrismaModule, UserModule],
  exports: [DictionaryService]
})
export class DictionaryModule {
}