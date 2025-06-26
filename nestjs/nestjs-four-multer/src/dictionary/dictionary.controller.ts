
import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { Dictionary } from "generated/prisma";
import { DictionaryService } from "./dictionary.service";


@Controller('dictionary')
export class DictionaryController {

  constructor(private readonly dictionaryService: DictionaryService) {

  }

  @Get()
  async getAllTasks() {
    return await this.dictionaryService.getAllDictionaries();
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string) {
    const dictionaryFound = await this.dictionaryService.getDictionaryById(+id);
    if (!dictionaryFound) {
      throw new NotFoundException(`Dictionary with id ${id} not found`);
    }
    return dictionaryFound
  }

  @Post()
  async createTask(@Body() data: Dictionary) {
    try {
      return await this.dictionaryService.createDictionary(data)
    } catch (error) {
      throw new BadRequestException(`Error creating the dictionary: ${error.message}`);
    }
  }

  @Put(':id')
  async updateTask(@Param('id') id: string, @Body() data: Dictionary) {
    return await this.dictionaryService.updateDictionary(+id, data);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    try {
      return await this.dictionaryService.deleteDictionary(+id);
    } catch (error) {
      throw new BadRequestException(`Error deleting dictionary with id ${id}: ${error.message}`);
    }
  }
}