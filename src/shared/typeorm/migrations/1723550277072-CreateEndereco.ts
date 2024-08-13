import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateEndereco1723550277072 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "endereco",
        columns: [
          {
            name: "id_endereco",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()"
          },
          {
            name: "rua",
            type: "varchar(100)"
          },
          {
            name: "bairro",
            type: "varchar(50)"
          },
          {
            name: "cidade",
            type: "varchar(40)"
          },
          {
            name: "estado",
            type: "varchar(20)"
          },
          {
            name: "cep",
            type: "varchar(15)"
          },
          {
            name: "telefone",
            type: "varchar(15)"
          }
        ]
      })
    );
    } 

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("endereco");
    }

}
