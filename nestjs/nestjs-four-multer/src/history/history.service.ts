import { Injectable } from "@nestjs/common";
import { Historia } from "generated/prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class HistoryService {

  constructor(private prisma: PrismaService) { }

  async getAllHistorias(): Promise<Historia[]> {
    return this.prisma.historia.findMany();
  }

  async getHistoriaById(id: number): Promise<Historia | null> {
    return this.prisma.historia.findUnique({
      where: {
        id_historia: id
      }
    });
  }

  async createHistoria(data: Omit<Historia, 'id_historia'>): Promise<Historia> {
    return this.prisma.historia.create({
      data
    });
  }

  async updateHistoria(id: number, data: Partial<Historia>): Promise<Historia> {
    return this.prisma.historia.update({
      where: {
        id_historia: id
      },
      data
    });
  }

  async deleteHistoria(id: number): Promise<Historia> {
    return this.prisma.historia.delete({
      where: {
        id_historia: id
      }
    });
  }
}