import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTokens1705760906261 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const tokenData = [
      {
        name: 'DAI',
        logo: 'https://purple-eldest-crayfish-220.mypinata.cloud/ipfs/QmZQDUtnCAaYtPAZiVFpbhfZkYEtacKJkctS73HREb33vG/dai.png',
        address: '0xFF34B3d4Aee8ddCd6F9AFFFB6Fe49bD371b8a357',
      },
      {
        name: 'LINK',
        logo: 'https://purple-eldest-crayfish-220.mypinata.cloud/ipfs/QmZQDUtnCAaYtPAZiVFpbhfZkYEtacKJkctS73HREb33vG/chainlink.png',
        address: '0xf8Fb3713D459D7C1018BD0A49D19b4C44290EBE5',
      },
      {
        name: 'USDC',
        logo: 'https://purple-eldest-crayfish-220.mypinata.cloud/ipfs/QmZQDUtnCAaYtPAZiVFpbhfZkYEtacKJkctS73HREb33vG/usdc.png',
        address: '0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8',
      },
      {
        name: 'WBTC',
        logo: 'https://purple-eldest-crayfish-220.mypinata.cloud/ipfs/QmZQDUtnCAaYtPAZiVFpbhfZkYEtacKJkctS73HREb33vG/wbtc.png',
        address: '0x29f2D40B0605204364af54EC677bD022dA425d03',
      },
      {
        name: 'WETH',
        logo: 'https://purple-eldest-crayfish-220.mypinata.cloud/ipfs/QmZQDUtnCAaYtPAZiVFpbhfZkYEtacKJkctS73HREb33vG/weth.png',
        address: '0xC558DBdd856501FCd9aaF1E62eae57A9F0629a3c',
      },
      {
        name: 'USDT',
        logo: 'https://purple-eldest-crayfish-220.mypinata.cloud/ipfs/QmZQDUtnCAaYtPAZiVFpbhfZkYEtacKJkctS73HREb33vG/usdt.png',
        address: '0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0',
      },
      {
        name: 'AAVE',
        logo: 'https://purple-eldest-crayfish-220.mypinata.cloud/ipfs/QmZQDUtnCAaYtPAZiVFpbhfZkYEtacKJkctS73HREb33vG/aave.png',
        address: '0x88541670E55cC00bEEFD87eB59EDd1b7C511AC9a',
      },
      {
        name: 'EURS',
        logo: 'https://purple-eldest-crayfish-220.mypinata.cloud/ipfs/QmZQDUtnCAaYtPAZiVFpbhfZkYEtacKJkctS73HREb33vG/eurs.png',
        address: '0x6d906e526a4e2Ca02097BA9d0caA3c382F52278E',
      },
      {
        name: 'GHO',
        logo: 'https://purple-eldest-crayfish-220.mypinata.cloud/ipfs/QmZQDUtnCAaYtPAZiVFpbhfZkYEtacKJkctS73HREb33vG/gho.png',
        address: '0xc4bF5CbDaBE595361438F8c6a187bDc330539c60',
      },
    ];

    for (const token of tokenData) {
      await queryRunner.query(
        'INSERT INTO "Tokens" ("name", "logo", "address") VALUES ($1, $2, $3)',
        [token.name, token.logo, token.address.toLowerCase()],
      );
    }
  }

  public async down(): Promise<void> {}
}
