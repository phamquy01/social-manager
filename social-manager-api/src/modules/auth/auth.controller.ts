import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  Get,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from 'src/modules/auth/dto/register.dto';
import { UserService } from 'src/modules/user/user.service';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.userService.createUser(registerDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() request: any) {
    return this.authService.login(request.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile(@Request() request: any) {
    return request.user;
  }

  @Post('refresh-token')
  async refreshToken(@Body() { refreshToken }: { refreshToken: string }) {
    if (!refreshToken) {
      throw new BadRequestException('Refresh token is required');
    }
    const user = await this.authService.verifyRefreshToken(refreshToken);
    if (!user) {
      throw new BadRequestException('Invalid refresh token');
    }
    return this.authService.login(user);
  }
}
