import { Injectable } from "@nestjs/common";
import { Word } from "generated/prisma/client";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class WordService {

  constructor(private prisma: PrismaService) {

  }

  async getAllTasks(): Promise<Word[]> {
    return this.prisma.word.findMany()
  }

  async getTaskById(id: number): Promise<Word | null> {
    return this.prisma.word.findUnique({
      where: {
        word_id: id
      }
    })
  }
  async createTask(data: Word): Promise<Word> {
    return this.prisma.word.create({
      data
    })
  }
  async updateTask(id: number, data: Word): Promise<Word> {
    return this.prisma.word.update({
      where: {
        word_id: id
      },
      data
    })
  }
  async deleteTask(id: number): Promise<Word> {
    return this.prisma.word.delete({
      where: {
        word_id: id
      }
    })
  }
}