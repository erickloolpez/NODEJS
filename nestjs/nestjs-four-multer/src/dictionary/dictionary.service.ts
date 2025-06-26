
import { Injectable } from "@nestjs/common";
import { StoryAssociation } from "generated/prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { UserService } from "src/users/user.service";
import { WordService } from "src/words/word.service";


@Injectable()
export class DictionaryService {

  constructor(private prisma: PrismaService, private associationService: WordService) {

  }

  async getAllStoryAssociations(): Promise<StoryAssociation[]> {
    return this.prisma.storyAssociation.findMany()
  }

  async getStoryAssociationById(id: number): Promise<StoryAssociation | null> {
    return this.prisma.storyAssociation.findUnique({
      where: {
        story_association_id: id
      }
    })
  }
  async createStoryAssociation(data: StoryAssociation): Promise<StoryAssociation> {
    return this.prisma.storyAssociation.create({
      data
    })
  }
  async updateStoryAssociation(id: number, data: StoryAssociation): Promise<StoryAssociation> {
    return this.prisma.storyAssociation.update({
      where: {
        story_association_id: id
      },
      data
    })
  }
  async deleteStoryAssociation(id: number): Promise<StoryAssociation> {
    return this.prisma.storyAssociation.delete({
      where: {
        story_association_id: id
      }
    })
  }

  async getContentStory(associationId: number): Promise<StoryAssociation[] | null> {
    return this.prisma.storyAssociation.findMany({
      where: {
        association_id: associationId, // Filtramos por association_id
      },
      include: {
        storyDetails: true, // Incluimos los detalles de la historia relacionada
      },
    });
  }
  async getStoryAssociationByWord(associationLetter: string): Promise<StoryAssociation[]> {
    const word = await this.associationService.getAssociationsByWord(associationLetter);
    if (!word) {
      throw new Error(`Word with letter ${associationLetter} not found`);
    }
    return this.prisma.storyAssociation.findMany({
      where: {
        association_id: {
          in: word.map(w => w.association_id)
        }
      },
      include: {
        storyDetails: true, // Incluimos los detalles de la historia relacionada
      },
    })
  }
}