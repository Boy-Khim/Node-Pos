declare global {
  namespace Express {
    interface Request {
      current_id?: number;
      id?: {
        id: number;
        name: string;
      };
    }
  }
}

export {};
