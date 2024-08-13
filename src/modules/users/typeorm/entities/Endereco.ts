import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('endereco')
class Endereco {
  @PrimaryGeneratedColumn('uuid')
  id_endereco: string;

  @Column()
  rua: string;

  @Column()
  bairro: string;

  @Column()
  cidade: string;

  @Column()
  estado: string;

  @Column()
  cep: string;

  @Column()
  telefone: string;
}

export default Endereco;
