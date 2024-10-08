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
                        type: "integer",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "preco",
                        type: "decimal",  // Alternativamente "numeric", "float", "double"
                        precision: 10,
                        scale: 2
                    },
                    {
                        name: "fk_id_posto",
                        type: "integer"
                    },
                    {
                        name: "fk_id_combustivel",
                        type: "integer"
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

        await queryRunner.query(`
            CREATE OR REPLACE FUNCTION update_data_atualizacao()
            RETURNS TRIGGER AS $$
            BEGIN
                IF OLD.preco <> NEW.preco THEN
                    UPDATE posto
                    SET data_atualizacao = NOW()
                    WHERE id_posto = NEW.fk_id_posto;
                END IF;
                
                RETURN NEW;
            END;
            $$ LANGUAGE plpgsql;
        `);

        await queryRunner.query(`
            CREATE TRIGGER trigger_update_data_atualizacao
            AFTER UPDATE OF preco ON preco_posto
            FOR EACH ROW
            EXECUTE FUNCTION update_data_atualizacao();
        `);
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

        await queryRunner.query(`
            DROP TRIGGER IF EXISTS trigger_update_data_atualizacao ON preco_posto;
            DROP FUNCTION IF EXISTS update_data_atualizacao;
        `);
    }
}
