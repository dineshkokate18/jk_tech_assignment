import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUsersService = {
    updateRole: jest.fn((id: number, role: string) => ({
      id,
      role,
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should update the user role', async () => {
    const userId = '1';
    const role = 'admin';
    const result = await controller.updateRole(userId, role);
    expect(result).toEqual({ id: 1, role: 'admin' });
    expect(service.updateRole).toHaveBeenCalledWith(1, 'admin');
  });
});
