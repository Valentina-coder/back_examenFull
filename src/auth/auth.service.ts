import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/users.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  // REGISTRO: Crea usuario y encripta clave
  async register(registerDto: any) {
    const { username, password, role } = registerDto;

    // Encriptar la contraseña antes de guardar
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      username,
      password: hashedPassword,
      role: role || 'USER', // Si no envían rol, es USER por defecto
    });

    return await this.userRepository.save(user);
  }

  // LOGIN: Valida credenciales y entrega Token
  async login(loginDto: any) {
    const { username, password } = loginDto;

    // 1. Buscar si el usuario existe
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // 2. Verificar si la contraseña coincide
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // 3. Generar y retornar el Token
    const payload = { username: user.username, role: user.role, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      username: user.username,
      role: user.role,
    };
  }
}
