import { Injectable } from '@nestjs/common';

import { AppDataResponseDto } from './dto/app.dto';

@Injectable()
export class AppService {
  getData(): AppDataResponseDto {
    return { message: 'Hello API' };
  }
}
