import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreatePlano1724155607007 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "planos",
                columns: [
                    {
                        name: "id_plano",
                        type: "integer",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                     {
                        name: "nome",
                        type: "varchar",
                        length: "50"
                    },
                    {
                        name: "descricao",
                        type: "varchar",
                        length: "200"
                    },
                    {
                        name: "valor",
                        type: "decimal",  // Alternativamente "numeric", "float", "double"
                        precision: 10,
                        scale: 2
                    }
                ]
            })
        );


        await queryRunner.query(`
            INSERT INTO planos (nome,descricao,valor) VALUES 
            ('Grátis', 'Acesso total aos recursos da aplicação, sem suporte dedicado. Uma boa opção para novos usuários que desejam testar a aplicação antes de decidir por um plano pago.', 0),
            ('Básico', 'Acesso a todos os recursos da aplicação, com suporte básico. Adequado para usuários que precisam de funcionalidades essenciais a um custo reduzido.', 20.00),
            ('Clássico', 'Inclui todos os recursos essenciais da aplicação, com suporte padrão. Perfeito para usuários que desejam um bom equilíbrio entre custo e benefícios.', 30.00),
            ('Premium', 'Acesso a todos os recursos da aplicação e suporte prioritário. Ideal para usuários que buscam a melhor experiência e o máximo de funcionalidades e visibilidade.', 45.00);
        `);

        await queryRunner.createForeignKey("posto", new TableForeignKey({
            columnNames: ["fk_id_plano"],
            referencedTableName: "planos",
            referencedColumnNames: ["id_plano"],
            name: "FK_Plano_Posto",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        }));
    }       
    
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("planos");
    }

}
