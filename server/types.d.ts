import express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: DecodedToken;
    }
  }
}

interface DecodedToken {
  id: string; // Add any other properties here, e.g., role, email
}