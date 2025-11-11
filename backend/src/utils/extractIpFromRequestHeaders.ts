import { Request } from 'express';

const possibleHeaders = ['true-client-ip', 'x-forwarded-for', 'x-real-ip'];

export default function extractIpFromRequestHeaders(req: Request) {
  const header = possibleHeaders.find((header) => req.headers[header]);

  if (!header) {
    return req.socket.remoteAddress || null;
  }

  return req.headers[header] || null;
}
