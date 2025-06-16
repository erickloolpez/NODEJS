import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { TaskService } from "./task.service";
import { Task } from "generated/prisma";


@Controller('tasks')
export class TaskController {

  constructor(private readonly taskService: TaskService) {

  }

  @Get()
  async getAllTasks() {
    return await this.taskService.getAllTasks();
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string) {
    const taskFound = await this.taskService.getTaskById(+id);
    if (!taskFound) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return taskFound
  }

  @Post()
  async createTask(@Body() data: Task) {
    return await this.taskService.createTask(data)
  }

  @Put(':id')
  async updateTask(@Param('id') id: string, @Body() data: Task) {
    return await this.taskService.updateTask(+id, data);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    try {
      return await this.taskService.deleteTask(+id);
    } catch (error) {
      throw new BadRequestException(`Error deleting task with id ${id}: ${error.message}`);
    }
  }
}