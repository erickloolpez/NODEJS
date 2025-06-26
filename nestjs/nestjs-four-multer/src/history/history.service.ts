import { Injectable } from "@nestjs/common";
import { StoryDetails } from "generated/prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { UserService } from "src/users/user.service";

@Injectable()
export class HistoryService {

  constructor(private prisma: PrismaService, private userService: UserService) { }

  async getAllStoriesDetails(): Promise<StoryDetails[]> {
    return this.prisma.storyDetails.findMany();
  }

  async getStoryDetailsById(id: number): Promise<StoryDetails | null> {
    return this.prisma.storyDetails.findUnique({
      where: {
        story_details_id: id
      }
    });
  }

  async createStoryDetails(data: Omit<StoryDetails, 'id_historia'>): Promise<StoryDetails> {
    return this.prisma.storyDetails.create({
      data
    });
  }

  async updateStoryDetails(id: number, data: Partial<StoryDetails>): Promise<StoryDetails> {
    return this.prisma.storyDetails.update({
      where: {
        story_details_id: id
      },
      data
    });
  }

  async deleteStoryDetails(id: number): Promise<StoryDetails> {
    return this.prisma.storyDetails.delete({
      where: {
        story_details_id: id
      }
    });
  }

  async getStoryDetailsByUser(userId: number): Promise<StoryDetails[]> {
    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new Error(`User with id ${userId} not found`);
    }
    return this.prisma.storyDetails.findMany({
      where: {
        user_id: user.user_id
      }
    });
  }
}