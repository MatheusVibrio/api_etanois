import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('endereco')
class Endereco {
  @PrimaryGeneratedColumn('increment') 
  id_endereco: number;  

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

  @Column()
  numero: number;
}

export default Endereco;
