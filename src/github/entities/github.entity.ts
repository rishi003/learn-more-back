import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class GithubConnector {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  clientSecret: string;
  @Column()
  clientId: string;
}
