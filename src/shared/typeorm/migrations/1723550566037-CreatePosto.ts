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
                        type: "integer",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
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
                        length: "100"
                    },
                     {
                        name: "data_atualizacao",
                        type: "timestamp",
                        isNullable: true,  
                    },
                    {
                        name: 'imagem', 
                        type: 'varchar',
                        length: '255',
                        isNullable: true,
                    },
                    {
                        name: "fk_id_plano",
                        type: "integer"
                    },
                    {
                        name: "fk_id_endereco",
                        type: "integer"
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

        await queryRunner.query(`
            CREATE OR REPLACE FUNCTION public.insert_preco_posto()
            RETURNS trigger
            LANGUAGE plpgsql
            AS $function$
            BEGIN
            INSERT INTO preco_posto (preco, fk_id_posto, fk_id_combustivel)
            SELECT 0, NEW.id_posto, tc.id_combustivel
            FROM tipo_combustivel tc;
            
            RETURN NEW;
            END;
            $function$;

            CREATE TRIGGER after_posto_insert
            AFTER INSERT ON posto
            FOR EACH ROW
            EXECUTE FUNCTION insert_preco_posto();
        `);
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

         await queryRunner.query(`
            DROP TRIGGER IF EXISTS after_posto_insert ON posto;
            DROP FUNCTION IF EXISTS insert_preco_posto;
        `);
    }
}
