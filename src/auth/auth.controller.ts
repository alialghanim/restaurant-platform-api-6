// src/auth/auth.controller.ts

import { Controller, Post, Body, HttpCode, HttpStatus, Get, UseGuards, Req, Patch } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateNameDto } from './dto/update-name.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

@Post('/register')
register(@Body() dto: RegisterDto) {
  return this.authService.register(dto); // ← الآن يرجع التوكن
}

  // 👇👇 إضافة نقطة النهاية الجديدة لتسجيل الدخول
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('/verify')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  verify(@Req() req) {
    return { userId: req.user.id, email: req.user.email };
  }

@Get('/me')
@UseGuards(JwtAuthGuard)
getMe(@Req() req) {
  const user = req.user;
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
  };
}


@Patch('/update-name')
@UseGuards(JwtAuthGuard)
updateName(@Req() req, @Body() body: { name: string }) {
  return this.authService.updateName(req.user.id, body.name);
}

@Patch('/update-email')
@UseGuards(JwtAuthGuard)
updateEmail(@Req() req, @Body() body: { email: string }) {
  return this.authService.updateEmail(req.user.id, body.email);
}

@Patch('/update-password')
@UseGuards(JwtAuthGuard)
updatePassword(@Req() req, @Body() body: { currentPassword: string; newPassword: string }) {
  return this.authService.updatePassword(req.user.id, body.currentPassword, body.newPassword);
}
}
