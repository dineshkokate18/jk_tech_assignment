import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export type IngestionStatus = 'PENDING' | 'RUNNING' | 'SUCCESS' | 'FAILED';

@Entity()
export class Ingestion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  source: string; // e.g., file path or URL

  @Column({ type: 'varchar', default: 'PENDING' })
  status: IngestionStatus;

  @Column({ nullable: true })
  message?: string; // optional error/success message

  @CreateDateColumn()
  createdAt: Date;
}
