
import { Injectable } from "@nestjs/common";
import { Dictionary } from "generated/prisma/client";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class DictionaryService {

  constructor(private prisma: PrismaService) {

  }

  async getAllTasks(): Promise<Dictionary[]> {
    return this.prisma.dictionary.findMany()
  }

  async getTaskById(id: number): Promise<Dictionary | null> {
    return this.prisma.dictionary.findUnique({
      where: {
        dictionary_id: id
      }
    })
  }
  async createTask(data: Dictionary): Promise<Dictionary> {
    return this.prisma.dictionary.create({
      data
    })
  }
  async updateTask(id: number, data: Dictionary): Promise<Dictionary> {
    return this.prisma.dictionary.update({
      where: {
        dictionary_id: id
      },
      data
    })
  }
  async deleteTask(id: number): Promise<Dictionary> {
    return this.prisma.dictionary.delete({
      where: {
        dictionary_id: id
      }
    })
  }
}