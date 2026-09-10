// Server input sanitization middleware
import { NextRequest, NextResponse } from 'next/server';

export function sanitizeInput(input: any): any {
  if (typeof input === 'string') {
    // Remove HTML tags and special characters that could lead to XSS
    return input.replace(/<\/?[^>]+(>|$)/g, '').replace(/[&<>"']/g, (char) => {
      switch (char) {
        case '&': return '&'
        case '<': return '<'
        case '>': return '>'
        case '"': return '"'
        case "'": return '''
        default: return char
      }
    });
  }
  
  if (Array.isArray(input)) {
    return input.map(sanitizeInput);
  }
  
  if (typeof input === 'object' && input !== null) {
    const sanitized = {};
    for (const [key, value] of Object.entries(input)) {
      sanitized[key] = sanitizeInput(value);
    }
    return sanitized;
  }
  
  return input;
}

export function createSanitizationMiddleware() {
  return (req: NextRequest, res: NextResponse, next: Function) => {
    // Sanitize all request body data
    if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
      let body = '';
      
      req.on('data', (chunk) => {
        body += chunk.toString();
      });
      
      req.on('end', () => {
        try {
          const parsedBody = JSON.parse(body);
          const sanitizedBody = sanitizeInput(parsedBody);
          req.body = sanitizedBody;
        } catch (error) {
          // Invalid JSON, let it pass through to the route handler
        }
      });
    }
    
    next();
  };
}