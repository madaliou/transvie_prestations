import { BadRequestException, Body, Controller, Get, InternalServerErrorException, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';


@Controller('auth')
export class AuthController {
  userService: any;
  constructor(private authService: AuthService) {}
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Req() req) {
    return req.user; // contient { userId, email }
  }

  // auth.controller.ts
@Post('register')
async register(@Body() createUserDto: CreateUserDto) {
  return this.authService.register(createUserDto); // ✅ nom correct
}


  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    console.log('forgot password controller')
    return this.authService.sendPasswordResetEmail(email);
  
  }

 }