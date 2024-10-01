import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateEndereco1723550277072 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "endereco",
                columns: [
                    {
                        name: "id_endereco",
                        type: "integer",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "rua",
                        type: "varchar",
                        length: "100"
                    },
                    {
                        name: "bairro",
                        type: "varchar",
                        length: "50"
                    },
                    {
                        name: "cidade",
                        type: "varchar",
                        length: "40"
                    },
                    {
                        name: "estado",
                        type: "varchar",
                        length: "20"
                    },
                    {
                        name: "cep",
                        type: "varchar",
                        length: "15"
                    },
                    {
                        name: "telefone",
                        type: "varchar",
                        length: "15"
                    },
                    {
                        name: "numero",
                        type: "integer"
                    },                          
                ]
            })
        );
    } 

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("endereco");
    }
}
