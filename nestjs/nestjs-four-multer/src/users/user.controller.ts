import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "generated/prisma";


@Controller('users')
export class UserController {

  constructor(private readonly userService: UserService) {

  }

  @Get()
  async getUsers(@Query('email') email?: string) {
    if (email) {
      const userFound = await this.userService.getUserByEmail(email);
      if (!userFound) {
        throw new NotFoundException(`User with email ${email} not found`);
      }
      return userFound;
    }
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string) {
    const taskFound = await this.userService.getUserById(+id);
    if (!taskFound) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return taskFound
  }

  @Post()
  async createTask(@Body() data: User) {
    return await this.userService.createUser(data)
  }

  @Put(':id')
  async updateTask(@Param('id') id: string, @Body() data: User) {
    return await this.userService.updateUser(+id, data);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    try {
      return await this.userService.deleteUser(+id);
    } catch (error) {
      throw new BadRequestException(`Error deleting task with id ${id}: ${error.message}`);
    }
  }
}