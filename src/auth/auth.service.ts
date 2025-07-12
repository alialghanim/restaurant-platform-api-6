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
import { Restaurant } from '../restaurant/entities/restaurant.entity'; // تأكد من المسار الصحيح

@Injectable()
export class AuthService {
 constructor(
  @InjectRepository(User)
  private readonly userRepository: Repository<User>,
  @InjectRepository(Restaurant)
  private readonly restaurantRepository: Repository<Restaurant>,
  private readonly jwtService: JwtService,
) {}

async register(dto: RegisterDto): Promise<{ access_token: string; user: any }> {
  const { name, email, phone, password } = dto;

  const fieldErrors = [];

  const existingEmail = await this.userRepository.findOne({ where: { email } });
  if (existingEmail) fieldErrors.push({ field: "email", message: "Email is already in use" });

  const existingPhone = await this.userRepository.findOne({ where: { phone } });
  if (existingPhone) fieldErrors.push({ field: "phone", message: "Phone number is already in use" });

  const existingName = await this.userRepository.findOne({ where: { name } });
  if (existingName) fieldErrors.push({ field: "name", message: "Name is already in use" });

  if (fieldErrors.length > 0) {
    throw new BadRequestException(fieldErrors);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = this.userRepository.create({ name, email, phone, password: hashedPassword });
  await this.userRepository.save(user);

  // 👇 هنا نربط المستخدم بالمطعم تلقائيًا
  const restaurant = this.restaurantRepository.create({
    name, // يمكن تعديله لاحقًا
    owner: user,
  });
  await this.restaurantRepository.save(restaurant);

  const payload = { email: user.email, sub: user.id, name: user.name };

  return {
    access_token: this.jwtService.sign(payload),
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      restaurantId: restaurant.id,
    },
  };
}

  async login(loginDto: LoginDto) {
  const user = await this.validateUser(loginDto);
  const payload = { email: user.email, sub: user.id, name: user.name };

  return {
    message: 'Login successful',
    access_token: this.jwtService.sign(payload),
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      restaurantId: user.restaurant?.id || null, // ← مهم جدًا
    },
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

private async validateUser(loginDto: LoginDto): Promise<User> {
  const { email, password } = loginDto;
  const user = await this.userRepository.findOne({
    where: { email },
    relations: ['restaurant'], // <-- مهم جدًا
  });

  if (user && (await bcrypt.compare(password, user.password))) {
    return user;
  }

  throw new UnauthorizedException(
    'Invalid credentials. Please check email and password.',
  );
}
}