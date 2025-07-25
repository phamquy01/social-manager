import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshToken } from 'src/modules/auth/entities/refresh-token.entity';
import { UserService } from 'src/modules/user/user.service';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPRISE,
    });

    await this.saveRefreshToken(refreshToken, user.id);

    return {
      accessToken,
      refreshToken,
    };
  }

  async saveRefreshToken(refreshToken: string, userId: number) {
    await this.refreshTokenRepository.delete({ user: { id: userId } });
    const hashedRefreshToken = bcrypt.hashSync(refreshToken, 10);
    const token = this.refreshTokenRepository.create({
      refresh_token: hashedRefreshToken,
      user: { id: userId },
    });
    return this.refreshTokenRepository.save(token);
  }

  async verifyRefreshToken(refreshToken: string): Promise<any> {
    try {
      const decoded: any = this.jwtService.verify(refreshToken);
      const tokenRecord = await this.refreshTokenRepository.findOne({
        where: { user: { id: decoded.sub } },
        order: { id: 'DESC' },
        relations: ['user'],
      });
      if (!tokenRecord) return null;

      const isMatch = await bcrypt.compare(
        refreshToken,
        tokenRecord.refresh_token,
      );
      if (isMatch) {
        // Trả về thông tin user (bỏ password nếu có)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...userInfo } = tokenRecord.user;
        return userInfo;
      }
      return null;
    } catch {
      return null;
    }
  }
}
