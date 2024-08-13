import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('tipo_Combustivel')
class Tipo_Combustivel {
  @PrimaryGeneratedColumn('uuid')
  id_combustivel: string;

  @Column()
  descricao: string;
}

export default Tipo_Combustivel;
