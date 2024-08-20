import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('planos')
class Planos {
  @PrimaryGeneratedColumn('increment') 
  id_plano: number; 

  @Column()
  nome: string;

  @Column()
  descricao: string;

  @Column("decimal", { precision: 10, scale: 2 })
  valor: Number;
}

export default Planos;
