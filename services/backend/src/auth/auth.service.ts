import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';

@Injectable()
export class AuthService {
  private readonly users = [
    {
      id: 'demo-user-id',
      email: 'owner@example.com',
      passwordHash: bcrypt.hashSync('P@ssw0rd123', 10),
      fullName: 'Demo Owner',
      phone: '081234567890',
    },
  ];

  constructor(private readonly jwtService: JwtService) {}

  async register(dto: {
    email: string;
    password: string;
    full_name?: string;
    phone?: string;
  }) {
    const exists = this.users.some((user) => user.email === dto.email);

    if (exists) {
      throw new UnauthorizedException('Email already registered');
    }

    const user = {
      id: randomUUID(),
      email: dto.email,
      passwordHash: await bcrypt.hash(dto.password, 10),
      fullName: dto.full_name || 'New User',
      phone: dto.phone || null,
    };

    this.users.push(user);

    const token = this.signToken(user.id, user.email);

    return {
      user: {
        id: user.id,
        email: user.email,
        full_name: user.fullName,
        phone: user.phone,
      },
      token,
    };
  }

  async login(dto: { email: string; password: string }) {
    const user = this.users.find((item) => item.email === dto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const valid = await bcrypt.compare(dto.password, user.passwordHash);

    if (!valid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.signToken(user.id, user.email);

    return {
      user: {
        id: user.id,
        email: user.email,
        full_name: user.fullName,
      },
      token,
    };
  }

  async validateUser(userId: string) {
    const user = this.users.find((item) => item.id === userId);

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
    };
  }

  private signToken(userId: string, email: string) {
    return this.jwtService.sign({ sub: userId, email });
  }
}
