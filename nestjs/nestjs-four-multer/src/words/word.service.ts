import { Injectable } from "@nestjs/common";
import { Association } from "generated/prisma/client";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class WordService {

  constructor(private prisma: PrismaService) {

  }

  async getAllAssociations(): Promise<Association[]> {
    return this.prisma.association.findMany()
  }

  async getAssocitionById(id: number): Promise<Association | null> {
    return this.prisma.association.findUnique({
      where: {
        association_id: id
      }
    })
  }
  async createAssociation(data: Association): Promise<Association> {
    return this.prisma.association.create({
      data
    })
  }
  async updateAssociation(id: number, data: Association): Promise<Association> {
    return this.prisma.association.update({
      where: {
        association_id: id
      },
      data
    })
  }
  async deleteAssociation(id: number): Promise<Association> {
    return this.prisma.association.delete({
      where: {
        association_id: id
      }
    })
  }
  async getAssociationsByWord(letter: string): Promise<Association[]> {
    return this.prisma.association.findMany({
      where: {
        word: {
          equals: letter, // Cambiado a equals para buscar la palabra completa
          mode: 'insensitive' // Hace que la búsqueda no distinga entre mayúsculas y minúsculas
        }
      }
    });
  }
}