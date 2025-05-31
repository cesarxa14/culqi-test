// encryption.service.ts
import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

const ENCRYPTION_KEY = crypto
  .createHash('sha256')
  .update(String(process.env.ENCRYPTION_SECRET || 'clave-muy-secreta'))
  .digest(); // 32 bytes para AES-256
const IV_LENGTH = 16;

@Injectable()
export class EncryptionService {
  encrypt(text: string): string {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
    let encrypted = cipher.update(text, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return iv.toString('base64') + ':' + encrypted;
  }

  decrypt(encrypted: string): string {
    const [ivBase64, encryptedData] = encrypted.split(':');
    const iv = Buffer.from(ivBase64, 'base64');
    const decipher = crypto.createDecipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
    let decrypted = decipher.update(encryptedData, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}
