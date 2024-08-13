import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('tipo_combustivel')
class Tipo_Combustivel {
  @PrimaryGeneratedColumn('increment') 
  id_combustivel: number; 

  @Column()
  descricao: string;
}

export default Tipo_Combustivel;
