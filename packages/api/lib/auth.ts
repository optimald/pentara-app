import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export interface JWTPayload {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}

export function generateJWT(userId: string, email: string): string {
  return jwt.sign(
    { userId, email },
    JWT_SECRET,
    { 
      expiresIn: '7d', // 7 days for mobile app usage
      issuer: 'pentara-api',
      audience: 'pentara-mobile'
    }
  );
}

export function validateJWT(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET, {
      issuer: 'pentara-api',
      audience: 'pentara-mobile'
    }) as JWTPayload;
    
    return decoded;
  } catch (error) {
    console.error('JWT validation error:', error);
    return null;
  }
}

export function refreshJWT(token: string): string | null {
  const decoded = validateJWT(token);
  if (!decoded) {
    return null;
  }

  // Check if token expires within 24 hours
  const expiresIn = decoded.exp * 1000 - Date.now();
  if (expiresIn < 24 * 60 * 60 * 1000) {
    return generateJWT(decoded.userId, decoded.email);
  }

  return null; // No refresh needed
}
