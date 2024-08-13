import { Column, CreateDateColumn, Double, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Posto from "./Posto";
import Tipo_Combustivel from "./Tipo_Combustivel";


@Entity('preco_posto')
class Preco_Posto {
  @PrimaryGeneratedColumn('increment') 
  id_lcto: number; 

  @Column("decimal", { precision: 10, scale: 2 })
  preco: Number;

  @ManyToOne(() => Posto)
  @JoinColumn({ name: 'fk_id_posto' })  
  fk_id_posto: Posto;
  
  @ManyToOne(() => Tipo_Combustivel)
  @JoinColumn({ name: 'fk_id_combustivel' })  
  fk_id_combustivel: Tipo_Combustivel;  
}

export default Preco_Posto;
