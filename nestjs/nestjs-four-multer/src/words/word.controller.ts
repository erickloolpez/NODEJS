import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { Association } from "generated/prisma";
import { WordService } from "./word.service";


@Controller('associations')
export class WordController {

  constructor(private readonly wordService: WordService) {

  }

  @Get()
  async getAllTasks() {
    return await this.wordService.getAllAssociations();
  }

  @Get(':id')
  async getAssociationById(@Param('id') id: string) {
    const taskFound = await this.wordService.getAssocitionById(+id);
    if (!taskFound) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return taskFound
  }
  @Get('starting-letter/:letter')
  async getAssociationsByStartingLetter(@Param('letter') letter: string) {
    return await this.wordService.getAssociationsByWord(letter);
  }

  @Post()
  async createTask(@Body() data: Association) {
    return await this.wordService.createAssociation(data)
  }

  @Put(':id')
  async updateTask(@Param('id') id: string, @Body() data: Association) {
    return await this.wordService.updateAssociation(+id, data);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    try {
      return await this.wordService.deleteAssociation(+id);
    } catch (error) {
      throw new BadRequestException(`Error deleting task with id ${id}: ${error.message}`);
    }
  }
}