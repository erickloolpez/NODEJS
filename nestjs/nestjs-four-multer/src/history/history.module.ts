import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { HistoryController } from "./history.controller";
import { HistoryService } from "./history.service";
import { UserModule } from "src/users/user.module";
import { DictionaryModule } from "src/dictionary/dictionary.module";

@Module({
  controllers: [HistoryController],
  providers: [HistoryService],
  imports: [PrismaModule, UserModule]
})
export class HistoryModule {
}