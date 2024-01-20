import { Column, DeepPartial, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum TypeTokens {
  UTILITY = 'utility',
  ASSET = 'asset',
  STABLE = 'stable',
}
@Entity('Tokens')
export class TokenEntity {
  constructor(props: DeepPartial<TokenEntity>) {
    if (props) {
      const { name, logo, address } = props;
      this.name = name;
      this.logo = logo;
      this.address = address;
    }
  }
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ type: 'varchar', name: 'name' })
  name: string;

  @Column({ type: 'varchar', name: 'logo' })
  logo: string;

  @Column({ type: 'varchar', name: 'address' })
  address: string;
}
