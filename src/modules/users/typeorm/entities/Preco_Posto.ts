import { Column, CreateDateColumn, Double, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Posto from "./Posto";
import Tipo_Combustivel from "./Tipo_Combustivel";


@Entity('preco_Posto')
class Preco_Posto {
  @PrimaryGeneratedColumn('uuid')
  id_lcto: string;

  @Column()
  preco: Number;

  @ManyToOne(() => Posto)
  @JoinColumn({ name: 'fk_id_posto' })  
  fk_id_posto: Posto;
  
  @ManyToOne(() => Tipo_Combustivel)
  @JoinColumn({ name: 'fk_id_combustivel' })  
  fk_id_combustivel: Tipo_Combustivel;  
}

export default Preco_Posto;
