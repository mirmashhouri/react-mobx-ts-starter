export class RefreshTokenError extends Error {
  constructor(msg: string = 'Couldn\'t refresh token. Redirecting to login.') {
    super(msg);

    this.name = 'RefreshTokenError';
  }
}

export class ExpiredTokenError extends Error {
  constructor(msg: string = 'The authentication token has expired.') {
    super(msg);

    this.name = 'ExpiredTokenError';
  }
}

export class MissingUrlParamError extends Error {
  constructor(key: string) {
    super(`Missing url param: ${key}`);

    this.name = 'MissingUrlParamError';
  }
}
