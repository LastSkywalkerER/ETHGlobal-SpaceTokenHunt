import * as crypto from 'crypto';

export class CryptoService {
  private readonly algorithm: string;
  private readonly initVector: crypto.BinaryLike;
  private readonly salt: string;
  private readonly securityKey: crypto.CipherKey;

  constructor() {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.algorithm = 'aes-256-gcm';
    this.initVector = Buffer.from(process.env.VECTOR);
    this.securityKey = Buffer.from(process.env.SECURITY_KEY);
  }

  public async compare(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const [hashedPasswordSalt, key] = hashedPassword.split(':');

      return crypto.scrypt(
        password,
        hashedPasswordSalt,
        64,
        (error, derivedKey) => {
          if (error) {
            reject(error);

            return;
          }

          return resolve(key == derivedKey.toString('hex'));
        },
      );
    });
  }

  public async createOtp(): Promise<string> {
    return new Promise((resolve) => {
      crypto.randomBytes(3, (_, buffer) => {
        const otp = parseInt(buffer.toString('hex'), 16).toString().slice(0, 6);

        resolve(otp);
      });
    });
  }

  public decryptData(encryptedData: string): string {
    const { data, tag } = JSON.parse(encryptedData);

    const decipher: any = crypto.createDecipheriv(
      this.algorithm,
      this.securityKey,
      this.initVector,
    );

    decipher.setAuthTag(Buffer.from(tag));

    let decryptedData = decipher.update(data, 'hex', 'utf8');

    decryptedData += decipher.final('utf8');

    return decryptedData;
  }

  public encryptData(data: string): string {
    const cipher: any = crypto.createCipheriv(
      this.algorithm,
      this.securityKey,
      this.initVector,
    );

    let encryptedData = cipher.update(data, 'utf8', 'hex');

    encryptedData += cipher.final('hex');

    const tag = cipher.getAuthTag();

    const result = JSON.stringify({ data: encryptedData, tag });

    return result;
  }

  public generateUniqueId() {
    return crypto.randomBytes(16).toString('hex');
  }

  public async hash(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      return crypto.scrypt(password, this.salt, 64, (error, derivedKey) => {
        if (error) {
          reject(error);

          return;
        }

        return resolve(this.salt + ':' + derivedKey.toString('hex'));
      });
    });
  }
}
