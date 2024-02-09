import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/AuthGuard';

@Controller('login')
export class AuthController {
  constructor(private authservice: AuthService) {}

  @Get()
  signIn(@Body() loginDto: LoginDto) {
    return this.authservice.signIn(loginDto);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  profile() {
    return 'My profile';
  }
}
