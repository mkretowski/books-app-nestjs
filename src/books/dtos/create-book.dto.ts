import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CreateBookDTO {
  @IsNotEmpty()
  @IsString()
  @Length(3, 100)
  title: string;

  @IsNotEmpty()
  @IsNumber()
  @Max(5)
  @Min(1)
  rating: number;

  @IsNotEmpty()
  @IsNumber()
  @Max(1000)
  @Min(0)
  price: number;

  @IsNotEmpty()
  @IsUUID(4)
  @IsString()
  authorId: string;
}
