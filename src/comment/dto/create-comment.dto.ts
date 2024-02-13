import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  author: string;

  @IsNotEmpty()
  postId: string;
}
