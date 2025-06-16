
import { Injectable } from "@nestjs/common";
import { Diccionario } from "generated/prisma/client";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class DictionaryService {

  constructor(private prisma: PrismaService) {

  }

  async getAllTasks(): Promise<Diccionario[]> {
    return this.prisma.diccionario.findMany()
  }

  async getTaskById(id: number): Promise<Diccionario | null> {
    return this.prisma.diccionario.findUnique({
      where: {
        id_diccionario: id
      }
    })
  }
  async createTask(data: Diccionario): Promise<Diccionario> {
    return this.prisma.diccionario.create({
      data
    })
  }
  async updateTask(id: number, data: Diccionario): Promise<Diccionario> {
    return this.prisma.diccionario.update({
      where: {
        id_diccionario: id
      },
      data
    })
  }
  async deleteTask(id: number): Promise<Diccionario> {
    return this.prisma.diccionario.delete({
      where: {
        id_diccionario: id
      }
    })
  }
}