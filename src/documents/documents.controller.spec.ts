import { Test, TestingModule } from '@nestjs/testing';
import { DocumentsController } from './documents.controller';
import { DocumentService } from './documents.service';
import { Document } from './entities/document.entity';

describe('DocumentsController', () => {
  let controller: DocumentsController;
  let service: DocumentService;

  const mockDocument: Document = {
    id: 1,
    filename: 'sample.txt',
    path: 'uploads/sample.txt',
    createdAt: new Date(),
    mimetype: ''
  };

  const mockDocumentService = {
    create: jest.fn((file) => ({
      ...mockDocument,
      name: file.originalname,
      path: `uploads/${file.originalname}`,
    })),
    findAll: jest.fn(() => [mockDocument]),
    findOne: jest.fn((id) => mockDocument),
    remove: jest.fn((id) => undefined),
    update: jest.fn((id, data) => ({
      ...mockDocument,
      ...data,
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentsController],
      providers: [
        {
          provide: DocumentService,
          useValue: mockDocumentService,
        },
      ],
    }).compile();

    controller = module.get<DocumentsController>(DocumentsController);
    service = module.get<DocumentService>(DocumentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should upload a file', async () => {
    const file = {
      originalname: 'sample.txt',
      filename: 'sample.txt',
      path: 'uploads/sample.txt',
    } as Express.Multer.File;

    const result = await controller.uploadFile(file);
    expect(result.filename).toEqual('sample.txt');
    expect(service.create).toHaveBeenCalledWith(file);
  });

  it('should return all documents', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([mockDocument]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return one document', async () => {
    const result = await controller.findOne(1);
    expect(result).toEqual(mockDocument);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('should remove a document', async () => {
    const result = await controller.remove(1);
    expect(result).toBeUndefined();
    expect(service.remove).toHaveBeenCalledWith(1);
  });

  it('should update a document', async () => {
    const updatedData = { filename: 'updated.txt' };
    const result = await controller.update(1, updatedData);
    expect(result.filename).toEqual('updated.txt');
    expect(service.update).toHaveBeenCalledWith(1, updatedData);
  });
});
