import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { createCipheriv, randomBytes } from 'crypto';

@Entity()
export class GithubConnector {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  clientSecret: string;
  @Column()
  clientId: string;
  @Column()
  code: string;
}
