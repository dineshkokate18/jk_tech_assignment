import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { IngestionService } from './ingestion.service';

@Controller('ingestion')
export class IngestionController {
  constructor(private readonly ingestionService: IngestionService) {}

  @Post('trigger')
  async trigger(@Body('source') source: string) {
    return this.ingestionService.trigger(source);
  }

  @Get()
  async getAll() {
    return this.ingestionService.getAllIngestions();
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    return this.ingestionService.getIngestion(id);
  }
}
