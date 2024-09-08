import { IsNotEmpty, IsNumber, Length } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsAreaValid } from '../validators/is-area-valid.decorator';

@Entity()
export class Produtor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsNotEmpty({ message: 'O CPF/CNPJ não pode ser vazio.' })
  @Length(11, 14, { message: 'CPF ou CNPJ deve ter entre 11 e 14 caracteres.' })
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

  @Column('decimal', { precision: 12, scale: 2 })
  @IsNotEmpty({ message: 'Área Total é obrigatório.' })
  @IsNumber({}, { message: 'Área Total deve ser um número.' })
  areaTotal: number;

  @Column('decimal', { precision: 12, scale: 2 })
  @IsNumber({}, { message: 'Área Agricultável deve ser um número.' })
  @IsAreaValid('areaTotal', {
    message:
      'A soma das áreas agriculturáveis e de vegetação não podem ser maior que a área total.',
  })
  areaAgricultavel: number;

  @Column('decimal', { precision: 12, scale: 2 })
  @IsNumber({}, { message: 'Área de Vegetação deve ser um número.' })
  @IsAreaValid('areaTotal', {
    message:
      'A soma das áreas agriculturáveis e de vegetação não podem ser maior que a área total.',
  })
  areaVegetacao: number;

  @Column('simple-array')
  culturas: string[];
}
