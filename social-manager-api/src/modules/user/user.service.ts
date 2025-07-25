import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RefreshToken } from 'src/modules/auth/entities/refresh-token.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
  ) {}

  createUser(userData: Partial<User>): Promise<User> {
    const newUser = this.userRepository.create(userData);
    newUser.createdAt = new Date();
    newUser.updatedAt = new Date();
    if (!userData.password) {
      throw new Error('Password is required to create a user.');
    }
    const hashedPassword = bcrypt.hashSync(userData.password, 10);
    newUser.password = hashedPassword;
    return this.userRepository.save(newUser);
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
