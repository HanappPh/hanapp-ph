import { IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class UpdateServiceDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  rate?: number;

  @IsString()
  @IsOptional()
  charge?: string;

  @IsBoolean()
  @IsOptional()
  isAddon?: boolean;
}
