import { Injectable } from "@nestjs/common";
import { Usuario } from "generated/prisma/client";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class UserService {

  constructor(private prisma: PrismaService) {

  }

  async getAllTasks(): Promise<Usuario[]> {
    return this.prisma.usuario.findMany()
  }

  async getTaskById(id: number): Promise<Usuario | null> {
    return this.prisma.usuario.findUnique({
      where: {
        id_usuario: id
      }
    })
  }
  async createTask(data: Usuario): Promise<Usuario> {
    return this.prisma.usuario.create({
      data
    })
  }
  async updateTask(id: number, data: Usuario): Promise<Usuario> {
    return this.prisma.usuario.update({
      where: {
        id_usuario: id
      },
      data
    })
  }
  async deleteTask(id: number): Promise<Usuario> {
    return this.prisma.usuario.delete({
      where: {
        id_usuario: id
      }
    })
  }
}