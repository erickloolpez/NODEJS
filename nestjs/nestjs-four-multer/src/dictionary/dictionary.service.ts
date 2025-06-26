
import { Injectable } from "@nestjs/common";
import { Dictionary } from "generated/prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { UserService } from "src/users/user.service";


@Injectable()
export class DictionaryService {

  constructor(private prisma: PrismaService, private userService: UserService) {

  }

  async getAllDictionaries(): Promise<Dictionary[]> {
    return this.prisma.dictionary.findMany()
  }

  async getDictionaryById(id: number): Promise<Dictionary | null> {
    return this.prisma.dictionary.findUnique({
      where: {
        dictionary_id: id
      }
    })
  }
  async createDictionary(data: Dictionary): Promise<Dictionary> {
    return this.prisma.dictionary.create({
      data
    })
  }
  async updateDictionary(id: number, data: Dictionary): Promise<Dictionary> {
    return this.prisma.dictionary.update({
      where: {
        dictionary_id: id
      },
      data
    })
  }
  async deleteDictionary(id: number): Promise<Dictionary> {
    return this.prisma.dictionary.delete({
      where: {
        dictionary_id: id
      }
    })
  }
  async getDictionariesByUserId(userId: number): Promise<Dictionary[]> {
    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new Error(`User with id ${userId} not found`);
    }
    return this.prisma.dictionary.findMany({
      where: {
        user_id: userId
      }
    })
  }
}