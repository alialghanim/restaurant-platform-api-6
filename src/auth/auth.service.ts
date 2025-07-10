// src/auth/auth.service.ts

import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { RegisterDto } from './dto/register.dto';import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto): Promise<{ access_token: string }> {
  const { name, email, phone, password } = dto;

  const existingUser = await this.userRepository.findOne({
    where: [{ email }, { name }, { phone }],
  });

  if (existingUser) {
    throw new BadRequestException('User with this email, name, or phone already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = this.userRepository.create({
    name,
    email,
    phone,
    password: hashedPassword,
  });

  await this.userRepository.save(user);

  const payload = { email: user.email, sub: user.id, name: user.name };

  return {
    access_token: this.jwtService.sign(payload),
  };
}

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto);
    const payload = { email: user.email, sub: user.id, name: user.name };
    return {
      message: 'Login successful',
      access_token: this.jwtService.sign(payload),
    };
  }

  async updateName(userId: string, name: string) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new UnauthorizedException('User not found.');
    user.name = name;
    await this.userRepository.save(user);
    const { password, ...result } = user;
    return result;
  }

  async updateEmail(userId: string, email: string) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new UnauthorizedException('User not found.');
    const existing = await this.userRepository.findOneBy({ email });
    if (existing && existing.id !== userId) {
      throw new ConflictException('Email already in use.');
    }
    user.email = email;
    await this.userRepository.save(user);
    const { password, ...result } = user;
    return result;
  }

  async updatePassword(userId: string, currentPassword: string, newPassword: string) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new UnauthorizedException('User not found.');
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) throw new UnauthorizedException('Current password is incorrect.');
    user.password = await bcrypt.hash(newPassword, 10);
    await this.userRepository.save(user);
    const { password, ...result } = user;
    return result;
  }

  private async validateUser(loginDto: LoginDto): Promise<Omit<User, 'password'>> {
    const { email, password } = loginDto;
    const user = await this.userRepository.findOneBy({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password: userPassword, ...result } = user;
      return result;
    }

    throw new UnauthorizedException(
      'Invalid credentials. Please check email and password.',
    );
  }
}