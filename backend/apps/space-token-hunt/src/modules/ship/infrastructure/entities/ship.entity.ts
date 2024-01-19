import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ShipPosition')
export class ShipEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ type: 'decimal', name: 'x' })
  x: number;

  @Column({ type: 'decimal', name: 'y' })
  y: number;

  @Column({ type: 'decimal', name: 'z' })
  z: number;

  @Column({ type: 'varchar', name: 'userId' })
  userId: string;
}
