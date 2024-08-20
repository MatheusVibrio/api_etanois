import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Endereco from "./Endereco";
import Planos from "./Planos";

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

  @Column()
  data_atualizacao: Date;

  @Column({ nullable: true })
  imagem: string; 

  @ManyToOne(() => Planos)
  @JoinColumn({ name: 'fk_id_plano' }) 
  fk_id_plano: Planos;

  @ManyToOne(() => Endereco)
  @JoinColumn({ name: 'fk_id_endereco' }) 
  fk_id_endereco: Endereco;
}

export default Posto;
