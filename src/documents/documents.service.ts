import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './entities/document.entity';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document)
    private readonly docRepo: Repository<Document>,
  ) {}

  async create(file: Express.Multer.File): Promise<Document> {
    const document = this.docRepo.create({
      filename: file.filename,
      originalName: file.originalname,
      mimetype: file.mimetype,
      path: file.path,
    });
    return this.docRepo.save(document);
  }

  findAll(): Promise<Document[]> {
    return this.docRepo.find();
  }

  async findOne(id: number): Promise<Document> {
    const doc = await this.docRepo.findOneBy({ id });
    if (!doc) throw new NotFoundException('Document not found');
    return doc;
  }

  async remove(id: number): Promise<void> {
    const result = await this.docRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Document not found');
  }

  async update(id: number, data: Partial<Document>): Promise<Document> {
    await this.docRepo.update(id, data);
    return this.findOne(id);
  }
}
