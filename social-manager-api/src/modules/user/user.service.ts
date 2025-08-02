import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RefreshToken } from 'src/modules/auth/entities/refresh-token.entity';
import { ApiResponse } from 'src/common/api-response';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
  ) {}

  async createUser(userData: Partial<User>) {
    const { email, password } = userData;

    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }

    const exists = await this.userRepository.exist({ where: { email } });
    if (exists) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      ...userData,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await this.userRepository.save(user);

    return 'Register successful'; // <-- chỉ trả về string
  }

  findByEmail(email: string) {
    const user = this.userRepository.findOneBy({
      email,
    });
    return user;
  }

  async validateUser(email: string, password: string) {
    const user = await this.findByEmail(email);
    if (!user) {
      return null;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    return isPasswordValid ? user : null;
  }
}
