import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from "@nestjs/common";
import { Story } from "generated/prisma";
import { HistoryService } from "./history.service";

@Controller('history')
export class HistoryController {

  constructor(private readonly historiaService: HistoryService) { }

  @Get()
  async getAllHistorias() {
    return await this.historiaService.getAllHistorias();
  }

  @Get(':id')
  async getHistoriaById(@Param('id') id: string) {
    const historiaFound = await this.historiaService.getHistoriaById(+id);
    if (!historiaFound) {
      throw new NotFoundException(`Historia with id ${id} not found`);
    }
    return historiaFound;
  }

  @Get('user/:userId')
  async getHistoriasByUserId(@Param('userId') userId: string) {
    const historias = await this.historiaService.getHistoriasByUserId(+userId);
    if (!historias || historias.length === 0) {
      throw new NotFoundException(`No historias found for user with id ${userId}`);
    }
    return historias;
  }

  @Post()
  async createHistoria(@Body() data: Story) {
    return await this.historiaService.createHistoria(data);
  }

  @Put(':id')
  async updateHistoria(@Param('id') id: string, @Body() data: Story) {
    return await this.historiaService.updateHistoria(+id, data);
  }

  @Delete(':id')
  async deleteHistoria(@Param('id') id: string) {
    try {
      return await this.historiaService.deleteHistoria(+id);
    } catch (error) {
      throw new BadRequestException(`Error deleting historia with id ${id}: ${error.message}`);
    }
  }
}