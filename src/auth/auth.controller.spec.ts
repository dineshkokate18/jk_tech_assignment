import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    register: jest.fn((dto: RegisterDto) => {
      return { message: 'User registered successfully', user: dto };
    }),
    login: jest.fn((dto: LoginDto) => {
      return { accessToken: 'mock-jwt-token', user: dto };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('register()', () => {
    it('should register a user', async () => {
      const dto: RegisterDto = {
        email: 'dinesh@example.com',
        password: 'test1234',
      };

      const result = await authController.register(dto);
      expect(result).toEqual({
        message: 'User registered successfully',
        user: dto,
      });
      expect(mockAuthService.register).toHaveBeenCalledWith(dto);
    });
  });

  describe('login()', () => {
    it('should login a user and return a token', async () => {
      const dto: LoginDto = {
        email: 'dinesh@example.com',
        password: 'test1234',
      };

      const result = await authController.login(dto);
      expect(result).toEqual({
        accessToken: 'mock-jwt-token',
        user: dto,
      });
      expect(mockAuthService.login).toHaveBeenCalledWith(dto);
    });
  });
});
