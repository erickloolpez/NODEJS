
import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { Dictionary } from "generated/prisma";
import { DictionaryService } from "./dictionary.service";


@Controller('dictionary')
export class DictionaryController {

  constructor(private readonly dictionaryService: DictionaryService) {

  }

  @Get()
  async getAllTasks() {
    return await this.dictionaryService.getAllTasks();
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string) {
    const taskFound = await this.dictionaryService.getTaskById(+id);
    if (!taskFound) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return taskFound
  }

  @Post()
  async createTask(@Body() data: Dictionary) {
    try {
      return await this.dictionaryService.createTask(data)
    } catch (error) {
      throw new BadRequestException(`Error creating the dictionary: ${error.message}`);
    }
  }

  @Put(':id')
  async updateTask(@Param('id') id: string, @Body() data: Dictionary) {
    return await this.dictionaryService.updateTask(+id, data);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    try {
      return await this.dictionaryService.deleteTask(+id);
    } catch (error) {
      throw new BadRequestException(`Error deleting task with id ${id}: ${error.message}`);
    }
  }
}