import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from "@nestjs/common";
// import { Story } from "generated/prisma";
import { HistoryService } from "./history.service";
import { StoryDetails } from "generated/prisma";

@Controller('story-details')
export class HistoryController {

  constructor(private readonly historiaService: HistoryService) { }

  @Get()
  async getAllStoriesDetails() {
    return await this.historiaService.getAllStoriesDetails();
  }

  @Get(':id')
  async getStoryDetailsById(@Param('id') id: string) {
    const historiaFound = await this.historiaService.getStoryDetailsById(+id);
    if (!historiaFound) {
      throw new NotFoundException(`StoryDetails with id ${id} not found`);
    }
    return historiaFound;
  }

  @Get('user/:userId')
  async getHistoriasByUserId(@Param('userId') userId: string) {
    const historias = await this.historiaService.getStoryDetailsByUser(+userId);
    if (!historias || historias.length === 0) {
      throw new NotFoundException(`No historias found for user with id ${userId}`);
    }
    return historias;
  }

  @Post()
  async createStoryDetails(@Body() data: StoryDetails) {
    return await this.historiaService.createStoryDetails(data);
  }

  @Put(':id')
  async updateStoryDetails(@Param('id') id: string, @Body() data: StoryDetails) {
    return await this.historiaService.updateStoryDetails(+id, data);
  }

  @Delete(':id')
  async deleteStoryDetails(@Param('id') id: string) {
    try {
      return await this.historiaService.deleteStoryDetails(+id);
    } catch (error) {
      throw new BadRequestException(`Error deleting story details with id ${id}: ${error.message}`);
    }
  }
}