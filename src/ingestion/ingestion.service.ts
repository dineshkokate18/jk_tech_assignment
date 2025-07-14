import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ingestion } from './entities/ingestion.entity';

@Injectable()
export class IngestionService {
  constructor(
    @InjectRepository(Ingestion)
    private readonly ingestionRepo: Repository<Ingestion>,
  ) {}

  async trigger(source: string): Promise<Ingestion> {
    const ingestion = this.ingestionRepo.create({ source, status: 'PENDING' });
    await this.ingestionRepo.save(ingestion);

    // Simulate async processing
    this.processIngestion(ingestion.id);

    return ingestion;
  }

  async processIngestion(id: number) {
    await this.ingestionRepo.update(id, { status: 'RUNNING' });

    try {
      // TODO: Replace this with actual ingestion logic
      await new Promise((res) => setTimeout(res, 3000)); // simulate delay

      await this.ingestionRepo.update(id, {
        status: 'SUCCESS',
        message: 'Ingestion completed.',
      });
    } catch (err) {
      await this.ingestionRepo.update(id, {
        status: 'FAILED',
        message: err.message,
      });
    }
  }

  async getAllIngestions() {
    return this.ingestionRepo.find({ order: { createdAt: 'DESC' } });
  }

  async getIngestion(id: number) {
    return this.ingestionRepo.findOneBy({ id });
  }
}
