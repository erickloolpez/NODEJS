import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "generated/prisma";


@Controller('users')
export class UserController {

  constructor(private readonly userService: UserService) {

  }

  @Get()
  async getAllTasks() {
    return await this.userService.getAllTasks();
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string) {
    const taskFound = await this.userService.getTaskById(+id);
    if (!taskFound) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return taskFound
  }

  @Post()
  async createTask(@Body() data: User) {
    return await this.userService.createTask(data)
  }

  @Put(':id')
  async updateTask(@Param('id') id: string, @Body() data: User) {
    return await this.userService.updateTask(+id, data);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    try {
      return await this.userService.deleteTask(+id);
    } catch (error) {
      throw new BadRequestException(`Error deleting task with id ${id}: ${error.message}`);
    }
  }
}