import {
  AfterLoad,
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { createCipheriv, randomBytes, scrypt, createDecipheriv } from 'crypto';
import { promisify } from 'util';

@Entity()
export class GithubConnector {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'bytea' })
  clientSecret: Buffer;
  @Column({ unique: true })
  clientId: string;
  @Column({ type: 'bytea' })
  iv: Buffer;

  @BeforeInsert()
  async encryptSecret() {
    const iv = randomBytes(16);
    const password = process.env.GITHUB_CLIENT_CODE_SECRET_PASSWORD;
    const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
    const cipher = createCipheriv('aes-256-ctr', key, iv);
    let secret = this.clientSecret;
    secret = Buffer.concat([cipher.update(secret), cipher.final()]);
    this.clientSecret = secret;
    this.iv = iv;
  }

  @AfterLoad()
  async decryptSecret() {
    const password = process.env.GITHUB_CLIENT_CODE_SECRET_PASSWORD;
    const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
    const decipher = createDecipheriv('aes-256-ctr', key, this.iv);
    this.clientSecret = Buffer.concat([
      decipher.update(this.clientSecret),
      decipher.final(),
    ]);
  }
}
