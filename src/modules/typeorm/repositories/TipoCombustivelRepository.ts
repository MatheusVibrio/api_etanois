import { EntityRepository, Repository } from "typeorm";
import Tipo_Combustivel from "../entities/Tipo_Combustivel";

@EntityRepository(Tipo_Combustivel)
class TipoCombustivelRepository extends Repository<Tipo_Combustivel>{

}

export default TipoCombustivelRepository;
