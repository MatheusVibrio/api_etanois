import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreatePrecoPosto1723550866436 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Criação da tabela `preco_posto` com colunas e chaves estrangeiras
        await queryRunner.createTable(
            new Table({
                name: "preco_posto",
                columns: [
                    {
                        name: "id_lcto",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "preco",
                        type: "decimal",  // Alternativamente "numeric", "float", "double"
                        precision: 10,
                        scale: 2
                    },
                    {
                        name: "fk_id_posto",
                        type: "uuid"
                    },
                    {
                        name: "fk_id_combustivel",
                        type: "uuid"
                    }
                ]
            })
        );

        // Adicionar chaves estrangeiras à tabela `preco_posto`
        await queryRunner.createForeignKey("preco_posto", new TableForeignKey({
            columnNames: ["fk_id_posto"],
            referencedTableName: "posto",
            referencedColumnNames: ["id_posto"],
            name: "FK_Posto_PrecoPosto",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        }));

        await queryRunner.createForeignKey("preco_posto", new TableForeignKey({
            columnNames: ["fk_id_combustivel"],
            referencedTableName: "tipo_combustivel",
            referencedColumnNames: ["id_combustivel"],
            name: "FK_TipoCombustivel_PrecoPosto",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remover as chaves estrangeiras
        const vtable = await queryRunner.getTable("preco_posto");
        if (vtable != null){
            const foreignKeyPosto = vtable.foreignKeys.find(fk => fk.name === "FK_Posto_PrecoPosto");
            if (foreignKeyPosto) {
            await queryRunner.dropForeignKey("preco_posto", foreignKeyPosto);
            }
        }
        
        if (vtable != null){
          const foreignKeyCombustivel = vtable.foreignKeys.find(fk => fk.name === "FK_TipoCombustivel_PrecoPosto");
          if (foreignKeyCombustivel) {
            await queryRunner.dropForeignKey("preco_posto", foreignKeyCombustivel);
          }
        }

        // Remover a tabela `preco_posto`
        await queryRunner.dropTable("preco_posto");
    }
}
