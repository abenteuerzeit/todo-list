import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  content?: string;

  @IsBoolean()
  @IsOptional()
  done?: boolean;
}
