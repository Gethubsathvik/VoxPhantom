// lib/auth0.ts
import { AuthClient } from 'auth0';
import { createToken, verifyToken, createRefreshToken } from './auth';

export class Auth0Service {
  private authClient: AuthClient;

  constructor() {
    this.authClient = new AuthClient({
      domain: process.env.AUTH0_DOMAIN,
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      redirect_uri: process.env.AUTH0_REDIRECT_URI,
      audience: process.env.AUTH0_AUDIENCE,
      scope: 'openid profile email',
    });
  }

  async login(email: string, password: string): Promise<{ token: string; refreshToken: string }> {
    // Auth0 doesn't handle username/password directly - this would be handled by Auth0's hosted page
    // For this implementation, we'll simulate Auth0 login
    const user = await this.findUserByEmail(email);
    
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    // Verify password (in real implementation, this would be done by Auth0)
    const isPasswordValid = await this.verifyPassword(user, password);
    
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }
    
    // Create tokens
    const token = createToken(user.id, user.email);
    const refreshToken = createRefreshToken(user.id);
    
    return { token, refreshToken };
  }

  async findUserByEmail(email: string) {
    // In real implementation, this would query your database
    // For demo purposes, return a mock user
    return {
      id: 'user-123',
      email,
      password: await this.hashPassword('password123'),
      email: email,
    };
  }

  async verifyPassword(user: any, password: string): Promise<boolean> {
    // In real implementation, this would be handled by Auth0
    // For demo, we'll check if password matches
    return await this.comparePassword(password, user.password);
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  async refreshToken(refreshToken: string): Promise<{ token: string; refreshToken: string }> {
    const decoded = verifyToken(refreshToken);
    if (!decoded) {
      throw new Error('Invalid refresh token');
    }
    
    // In real implementation, this would call Auth0's token endpoint
    const newToken = createToken(decoded.userId, 'user@example.com');
    const newRefreshToken = createRefreshToken(decoded.userId);
    
    return { token: newToken, refreshToken: newRefreshToken };
  }
}