import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class RatingBoard1705781552730 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'RatingBoard',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'totalBalance',
            type: 'decimal',
          },
          {
            name: 'walletAddress',
            type: 'varchar',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('RatingBoard');
  }
}
