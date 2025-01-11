import { IsString } from 'class-validator';

export class PostLoginDTO {
  @IsString()
  email: string;

  @IsString()
  password: string;
}
