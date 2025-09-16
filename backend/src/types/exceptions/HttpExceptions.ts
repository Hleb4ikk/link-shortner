import { HttpStatus } from 'types/HttpStatus';

export class HttpException extends Error {
  statusCode: HttpStatus;
  description?: string;
  constructor(statusCode: HttpStatus, message: string, description?: string) {
    super(message);
    this.statusCode = statusCode;
    this.description = description;
  }
}

export class BadRequestException extends HttpException {
  constructor(description?: string) {
    super(HttpStatus.BAD_REQUEST, 'Bad Request', description);
  }
}
export class UnauthorizedException extends HttpException {
  constructor(description?: string) {
    super(HttpStatus.UNAUTHORIZED, 'Unauthorized', description);
  }
}
export class ForbiddenException extends HttpException {
  constructor(description?: string) {
    super(HttpStatus.FORBIDDEN, 'Forbidden', description);
  }
}
export class NotFoundException extends HttpException {
  constructor(description?: string) {
    super(HttpStatus.NOT_FOUND, 'Not Found', description);
  }
}
export class MethodNotAllowedException extends HttpException {
  constructor(description?: string) {
    super(HttpStatus.METHOD_NOT_ALLOWED, 'Method Not Allowed', description);
  }
}
export class InternalServerErrorException extends HttpException {
  constructor(description?: string) {
    super(
      HttpStatus.INTERNAL_SERVER_ERROR,
      'Internal Server Error',
      description,
    );
  }
}
