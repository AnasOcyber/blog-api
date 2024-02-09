import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn({
    email,
    password,
  }: LoginDto): Promise<{ accessToken: string }> {
    const user = await this.userService.findUserByEmail(email);
    if (!user) throw new UnauthorizedException();

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) throw new UnauthorizedException();

    const payload = { sub: email };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
