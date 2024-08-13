import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Endereco from "./Endereco";

@Entity('posto')
class Posto {
  @PrimaryGeneratedColumn('uuid')
  id_posto: string;

  @Column()
  nome: string;

  @Column()
  cnpj: string;

  @Column()
  senha: string;

  @ManyToOne(() => Endereco)
  @JoinColumn({ name: 'fk_id_endereco' })  // Especifica a coluna de chave estrangeira
  fk_id_endereco: Endereco;  // Define o tipo como 'Endereco'
}

export default Posto;
