import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.userService.get(id);
  }

  @Post('signup')
  createUser(@Body() username: string) {
    return this.userService.create(username);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body('username') username: string) {
    return this.userService.update(id, username);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
