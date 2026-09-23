// lib/auth0.ts
import { createToken, verifyToken, createRefreshToken } from './auth';
import bcrypt from 'bcryptjs';

export class Auth0Service {
  async login(email: string, password: string): Promise<{ token: string; refreshToken: string }> {
    const user = await this.findUserByEmail(email);

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await this.verifyPassword(user, password);

    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const token = createToken(user.id, user.email);
    const refreshToken = createRefreshToken(user.id);

    return { token, refreshToken };
  }

  async findUserByEmail(email: string) {
    return {
      id: 'user-123',
      email,
      password: await this.hashPassword('password123'),
    };
  }

  async verifyPassword(user: { password: string }, password: string): Promise<boolean> {
    return await this.comparePassword(password, user.password);
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  async refreshToken(token: string): Promise<{ token: string; refreshToken: string }> {
    const decoded = verifyToken(token);
    if (!decoded) {
      throw new Error('Invalid refresh token');
    }

    const newToken = createToken(decoded.userId, 'user@example.com');
    const newRefreshToken = createRefreshToken(decoded.userId);

    return { token: newToken, refreshToken: newRefreshToken };
  }
}
