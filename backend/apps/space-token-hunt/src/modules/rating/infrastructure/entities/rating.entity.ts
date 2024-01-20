import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('RatingBoard')
export class RatingEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ type: 'decimal', name: 'totalBalance' })
  totalBalance: number;

  @Column({ type: 'varchar', name: 'walletAddress' })
  walletAddress: string;
}
