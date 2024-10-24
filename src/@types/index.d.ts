declare global {
  namespace Express {
    interface Claims {}

    export interface Request {
      claims: Claims;
    }
  }
}

export {};
