import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTipoCombustivel1723550795662 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Criação da tabela
        await queryRunner.createTable(
            new Table({
                name: "tipo_combustivel",
                columns: [
                    {
                        name: "id_combustivel",
                        type: "integer",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "descricao",
                        type: "varchar",
                        length: "50"  // Defina o comprimento máximo que você deseja
                    }
                ]
            })
        );

        // Inserção dos dados iniciais
        await queryRunner.query(`
            INSERT INTO tipo_combustivel (descricao) VALUES 
            ('Gasolina comum'),
            ('Gasolina aditivada'),
            ('Diesel'),
            ('Etanol');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Aqui você pode optar por limpar a tabela ou remover a tabela
        await queryRunner.dropTable("tipo_combustivel");
    }
}
