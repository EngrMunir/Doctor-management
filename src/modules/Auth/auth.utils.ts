
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

export const createToken = (
  jwtPayload: { email: string; role: string; _id?: string; name?: string },
  secret: Secret
) => {
  return jwt.sign(jwtPayload, secret, { expiresIn: '1h' });
};

export const verifyToken = (token: string, secret:Secret) =>{
    return jwt.verify(token, secret) as JwtPayload;
};