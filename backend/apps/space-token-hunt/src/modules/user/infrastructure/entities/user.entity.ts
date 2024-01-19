import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column('varchar', { length: 100, nullable: false, unique: true })
  uuid: string;

  @Column({ type: 'varchar', name: 'walletAddress' })
  walletAddress: string;
}
