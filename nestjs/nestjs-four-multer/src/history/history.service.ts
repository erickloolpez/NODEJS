import { Injectable } from "@nestjs/common";
import { Story } from "generated/prisma/client";
import { DictionaryService } from "src/dictionary/dictionary.service";
import { PrismaService } from "src/prisma/prisma.service";
import { UserService } from "src/users/user.service";

@Injectable()
export class HistoryService {

  constructor(private prisma: PrismaService, private dictionaryService: DictionaryService) { }

  async getAllHistorias(): Promise<Story[]> {
    return this.prisma.story.findMany();
  }

  async getHistoriaById(id: number): Promise<Story | null> {
    return this.prisma.story.findUnique({
      where: {
        story_id: id
      }
    });
  }

  async createHistoria(data: Omit<Story, 'id_historia'>): Promise<Story> {
    return this.prisma.story.create({
      data
    });
  }

  async updateHistoria(id: number, data: Partial<Story>): Promise<Story> {
    return this.prisma.story.update({
      where: {
        story_id: id
      },
      data
    });
  }

  async deleteHistoria(id: number): Promise<Story> {
    return this.prisma.story.delete({
      where: {
        story_id: id
      }
    });
  }

  async getHistoriasByUserId(dictionaryId: number): Promise<Story[]> {
    const dictionary = await this.dictionaryService.getDictionaryById(dictionaryId);
    if (!dictionary) {
      throw new Error(`Dictionary with id ${dictionaryId} not found`);
    }
    return this.prisma.story.findMany({
      where: {
        dictionary_id: dictionary.dictionary_id
      }
    });
  }
}