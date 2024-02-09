import { Body, Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('login')
export class AuthController {
  constructor(private authservice: AuthService) {}

  @Get()
  signIn(@Body() loginDto: LoginDto) {
    return this.authservice.signIn(loginDto);
  }
}
