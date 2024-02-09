import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get()
  find() {
    return this.commentService.find();
  }

  @Post()
  create(@Body() commentDto: CreateCommentDto) {
    return this.commentService.create(commentDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body('content') content: string) {
    return this.commentService.update(id, content);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.commentService.delete(id);
  }
}
