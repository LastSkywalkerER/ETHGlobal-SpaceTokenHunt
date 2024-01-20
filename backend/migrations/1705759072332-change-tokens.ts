import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class ChangeTokens1705759072332 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('Tokens', [
      new TableColumn({
        name: 'address',
        type: 'varchar',
      }),
    ]);
    await queryRunner.dropColumn('Tokens', 'mintAddress');
  }

  public async down(): Promise<void> {}
}
