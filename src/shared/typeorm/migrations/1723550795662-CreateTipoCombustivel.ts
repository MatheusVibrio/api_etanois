import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTipoCombustivel1723550795662 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "tipo_combustivel",
        columns: [
          {
            name: "id_combustivel",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()"
          },
          {
            name: "descricao",
            type: "varchar(50)"
          }
        ]
      })
    );
    } 

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("tipo_combustivel");
    }
}
