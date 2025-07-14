import {
  Controller, Post, Get, Param, Delete, UploadedFile, UseInterceptors, Body, Put, ParseIntPipe
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { DocumentService } from './documents.service';
import { Document } from './entities/document.entity';
import { extname } from 'path';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentService: DocumentService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
      },
    }),
  }))
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<Document> {
    return this.documentService.create(file);
  }

  @Get()
  async findAll(): Promise<Document[]> {
    return this.documentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Document> {
    return this.documentService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.documentService.remove(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<Document>,
  ): Promise<Document> {
    return this.documentService.update(id, data);
  }
}
