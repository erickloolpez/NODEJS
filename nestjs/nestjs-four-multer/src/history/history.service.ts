import { Injectable } from "@nestjs/common";
import { Story } from "generated/prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class HistoryService {

  constructor(private prisma: PrismaService) { }

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
}