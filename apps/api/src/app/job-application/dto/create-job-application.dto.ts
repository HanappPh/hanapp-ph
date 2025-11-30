import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateJobApplicationDto {
  @IsUUID()
  @IsNotEmpty()
  serviceRequestId!: string;

  @IsString()
  @IsNotEmpty()
  qualifications!: string;

  @IsString()
  @IsNotEmpty()
  experience!: string;

  @IsUUID()
  @IsNotEmpty()
  providerId!: string;
}
