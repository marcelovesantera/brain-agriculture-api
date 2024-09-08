import { IsNotEmpty, IsNumber, Max, ValidateIf } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsAreaValid } from '../validators/is-area-valid.decorator';

@Entity()
export class Produtor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsNotEmpty({ message: 'O CPF/CNPJ não pode ser vazio.' })
  @ValidateIf((x) => x.cpfCnpj.length === 11 || x.cpfCnpj.length === 14)
  cpfCnpj: string;

  @Column()
  @IsNotEmpty({ message: 'Nome do Produtor é obrigatório.' })
  nomeProdutor: string;

  @Column()
  @IsNotEmpty({ message: 'Nome da Fazenda é obrigatório.' })
  nomeFazenda: string;

  @Column()
  @IsNotEmpty({ message: 'Cidade é obrigatório.' })
  cidade: string;

  @Column()
  @IsNotEmpty({ message: 'Estado é obrigatório.' })
  estado: string;

  @Column('decimal')
  @IsNotEmpty({ message: 'Área Total é obrigatório.' })
  @IsNumber({}, { message: 'Área Total deve ser um número.' })
  areaTotal: number;

  @Column('decimal')
  @IsNumber({}, { message: 'Área Agricultável deve ser um número.' })
  areaAgricultavel: number;

  @Column('decimal')
  @IsNumber({}, { message: 'Área de Vegetação deve ser um número.' })
  @IsAreaValid('areaTotal', {
    message:
      'A soma das áreas agriculturáveis e de vegetação não podem ser maior que a área total.',
  })
  areaVegetacao: number;

  @Column('simple-array')
  culturas: string[];
}
