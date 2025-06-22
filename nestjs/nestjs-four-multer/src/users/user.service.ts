import { Injectable } from "@nestjs/common";
import { User } from "generated/prisma/client";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class UserService {

  constructor(private prisma: PrismaService) {

  }

  async getAllTasks(): Promise<User[]> {
    return this.prisma.user.findMany()
  }

  async getTaskById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        user_id: id
      }
    })
  }
  async createTask(data: User): Promise<User> {
    return this.prisma.user.create({
      data
    })
  }
  async updateTask(id: number, data: User): Promise<User> {
    return this.prisma.user.update({
      where: {
        user_id: id
      },
      data
    })
  }
  async deleteTask(id: number): Promise<User> {
    return this.prisma.user.delete({
      where: {
        user_id: id
      }
    })
  }
}