import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Endereco from "./Endereco";

@Entity('posto')
class Posto {
  @PrimaryGeneratedColumn('increment') 
  id_posto: number; 

  @Column()
  nome: string;

  @Column()
  cnpj: string;

  @Column()
  senha: string;

  @ManyToOne(() => Endereco)
  @JoinColumn({ name: 'fk_id_endereco' }) 
  fk_id_endereco: Endereco;
}

export default Posto;
