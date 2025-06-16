import { Injectable } from "@nestjs/common";
import { Palabra } from "generated/prisma/client";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class WordService {

  constructor(private prisma: PrismaService) {

  }

  async getAllTasks(): Promise<Palabra[]> {
    return this.prisma.palabra.findMany()
  }

  async getTaskById(id: number): Promise<Palabra | null> {
    return this.prisma.palabra.findUnique({
      where: {
        id_palabra: id
      }
    })
  }
  async createTask(data: Palabra): Promise<Palabra> {
    return this.prisma.palabra.create({
      data
    })
  }
  async updateTask(id: number, data: Palabra): Promise<Palabra> {
    return this.prisma.palabra.update({
      where: {
        id_palabra: id
      },
      data
    })
  }
  async deleteTask(id: number): Promise<Palabra> {
    return this.prisma.palabra.delete({
      where: {
        id_palabra: id
      }
    })
  }
}