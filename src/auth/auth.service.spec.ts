import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../users/users.entity';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: { sign: jest.Mock };
  let userRepository: {
    create: jest.Mock;
    save: jest.Mock;
    findOne: jest.Mock;
  };

  beforeEach(async () => {
    userRepository = {
      create: jest.fn(),
      save: jest.fn(),
      findOne: jest.fn(),
    };

    jwtService = {
      sign: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: jwtService,
        },
        {
          provide: getRepositoryToken(User),
          useValue: userRepository,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  describe('register', () => {
    it('debe crear un nuevo usuario con contraseña encriptada', async () => {
      const createAuthDto = {
        username: 'testuser',
        password: 'password123',
        role: 'USER',
      };

      const mockUser = { id: 1, ...createAuthDto };
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedpassword');
      userRepository.create.mockReturnValue(mockUser);
      userRepository.save.mockResolvedValue(mockUser);

      const result = await service.register(createAuthDto);

      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
      expect(userRepository.create).toHaveBeenCalled();
      expect(result).toEqual(mockUser);
    });
  });

  describe('login', () => {
    it('debe retornar un token si las credenciales son válidas', async () => {
      const loginDto = {
        username: 'testuser',
        password: 'password123',
      };

      const mockUser = {
        id: 1,
        username: 'testuser',
        password: 'hashedpassword',
        role: 'USER',
      };

      userRepository.findOne.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      jwtService.sign.mockReturnValue('token123');

      const result = await service.login(loginDto);

      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { username: 'testuser' },
      });
      expect(bcrypt.compare).toHaveBeenCalledWith(
        'password123',
        'hashedpassword',
      );
      expect(result).toHaveProperty('access_token');
      expect(result.access_token).toBe('token123');
    });

    it('debe lanzar excepción si las credenciales son inválidas', async () => {
      const loginDto = {
        username: 'testuser',
        password: 'wrongpassword',
      };

      userRepository.findOne.mockResolvedValue(null);

      await expect(service.login(loginDto)).rejects.toThrow(
        'Credenciales inválidas',
      );
    });
  });
});
