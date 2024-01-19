import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Ship1705653414325 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'ShipPosition',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'x',
            type: 'varchar',
          },
          {
            name: 'y',
            type: 'varchar',
          },
          {
            name: 'z',
            type: 'varchar',
          },

          {
            name: 'userId',
            type: 'varchar',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('ShipPosition');
  }
}
