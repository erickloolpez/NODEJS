import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { Palabra } from "generated/prisma";
import { WordService } from "./word.service";


@Controller('words')
export class WordController {

  constructor(private readonly wordService: WordService) {

  }

  @Get()
  async getAllTasks() {
    return await this.wordService.getAllTasks();
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string) {
    const taskFound = await this.wordService.getTaskById(+id);
    if (!taskFound) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return taskFound
  }

  @Post()
  async createTask(@Body() data: Palabra) {
    return await this.wordService.createTask(data)
  }

  @Put(':id')
  async updateTask(@Param('id') id: string, @Body() data: Palabra) {
    return await this.wordService.updateTask(+id, data);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    try {
      return await this.wordService.deleteTask(+id);
    } catch (error) {
      throw new BadRequestException(`Error deleting task with id ${id}: ${error.message}`);
    }
  }
}