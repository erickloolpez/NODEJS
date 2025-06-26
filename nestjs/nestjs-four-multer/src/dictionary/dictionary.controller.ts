
import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { StoryAssociation } from "generated/prisma";
import { DictionaryService } from "./dictionary.service";


@Controller('story-associations')
export class DictionaryController {

  constructor(private readonly dictionaryService: DictionaryService) {

  }

  @Get()
  async getAllTasks() {
    return await this.dictionaryService.getAllStoryAssociations();
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string) {
    const dictionaryFound = await this.dictionaryService.getStoryAssociationById(+id);
    if (!dictionaryFound) {
      throw new NotFoundException(`StoryAssociation with id ${id} not found`);
    }
    return dictionaryFound
  }

  @Get('word/:letter')
  async getStoryAssociationByWord(@Param('letter') letter: string) {
    try {
      return await this.dictionaryService.getStoryAssociationByWord(letter);
    } catch (error) {
      throw new BadRequestException(`Error fetching story associations by word: ${error.message}`);
    }
  }

  @Get(':id/content')
  async getContentStory(@Param('id') id: string) {
    return await this.dictionaryService.getContentStory(+id);
  }

  @Post()
  async createTask(@Body() data: StoryAssociation) {
    try {
      return await this.dictionaryService.createStoryAssociation(data)
    } catch (error) {
      throw new BadRequestException(`Error creating the story association: ${error.message}`);
    }
  }

  @Put(':id')
  async updateTask(@Param('id') id: string, @Body() data: StoryAssociation) {
    return await this.dictionaryService.updateStoryAssociation(+id, data);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    try {
      return await this.dictionaryService.deleteStoryAssociation(+id);
    } catch (error) {
      throw new BadRequestException(`Error deleting story association with id ${id}: ${error.message}`);
    }
  }
}