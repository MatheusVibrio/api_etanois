import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreatePosto1723550566037 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Criação da tabela `posto` com a coluna `fk_id_endereco`
        await queryRunner.createTable(
            new Table({
                name: "posto",
                columns: [
                    {
                        name: "id_posto",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()"
                    },
                    {
                        name: "nome",
                        type: "varchar",
                        length: "100"
                    },
                    {
                        name: "cnpj",
                        type: "varchar",
                        length: "20"
                    },
                    {
                        name: "senha",
                        type: "varchar",
                        length: "20"
                    },
                    {
                        name: "fk_id_endereco",
                        type: "uuid",
                        isNullable: true // Ou `false` se for obrigatório
                    }
                ]
            })
        );

        // Adição da chave estrangeira `fk_id_endereco` para a tabela `endereco`
        await queryRunner.createForeignKey("posto", new TableForeignKey({
            columnNames: ["fk_id_endereco"],
            referencedTableName: "endereco",
            referencedColumnNames: ["id_endereco"],
            name: "FK_Endereco_Posto",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remover a chave estrangeira
        const vtable = await queryRunner.getTable("posto");
        if (vtable != null) {
         const foreignKey = vtable.foreignKeys.find(fk => fk.name === "FK_Endereco_Posto");
         if (foreignKey) {
            await queryRunner.dropForeignKey("posto", foreignKey);
        }
        }

        // Remover a tabela `posto`
        await queryRunner.dropTable("posto");
    }
}
