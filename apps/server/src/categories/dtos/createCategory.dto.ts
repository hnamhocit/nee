import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateCategoryDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  thumbnail: string | null;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  parentId: string | null;
}
