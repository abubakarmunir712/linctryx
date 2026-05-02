import { HttpStatus, Injectable } from '@nestjs/common';
import { AppResponse } from './common/utils/response.util';

@Injectable()
export class AppService {
  constructor() { }
  index(): AppResponse<null, null> {
    return new AppResponse(
      'Running...',
      'API is running',
      null,
      null,
      HttpStatus.OK
    )
  }
}
