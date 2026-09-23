// Server input sanitization middleware
import { NextRequest, NextResponse } from 'next/server';

export function sanitizeInput(input: unknown): unknown {
  if (typeof input === 'string') {
    return input.replace(/<\/?[^>]+(>|$)/g, '').replace(/[&<>"']/g, (char) => {
      switch (char) {
        case '&': return '&amp;';
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '"': return '&quot;';
        case "'": return '&#39;';
        default: return char;
      }
    });
  }

  if (Array.isArray(input)) {
    return input.map(sanitizeInput);
  }

  if (typeof input === 'object' && input !== null) {
    const sanitized: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(input)) {
      sanitized[key] = sanitizeInput(value);
    }
    return sanitized;
  }

  return input;
}

export function createSanitizationMiddleware() {
  return async (req: NextRequest, res: NextResponse, next: () => void) => {
    if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
      const contentType = req.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        try {
          const body = await req.json();
          const sanitizedBody = sanitizeInput(body);
          (req as { body?: unknown }).body = sanitizedBody;
        } catch {
          // Invalid JSON, let it pass through to the route handler
        }
      }
    }

    next();
  };
}
