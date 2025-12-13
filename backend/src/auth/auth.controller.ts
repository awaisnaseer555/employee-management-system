import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';

@Controller('login')
export class AuthController {
  @Post()
  login(@Body() body: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { email, password } = body;
    console.log('Received:', email, password); // <-- DEBUG

    if (email === 'admin@example.com' && password === 'admin123') {
      return { token: 'abc123' };
    } else {
      throw new UnauthorizedException();
    }
  }
}
