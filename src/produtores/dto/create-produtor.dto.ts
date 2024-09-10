import {
  IsNotEmpty,
  IsNumber,
  Length,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';
import { IsAreaValid } from '../validators/is-area-valid.decorator';

export class CreateProdutorDto {
  @IsNotEmpty({ message: 'O CPF/CNPJ não pode ser vazio.' })
  @Length(11, 14, { message: 'CPF ou CNPJ deve ter entre 11 e 14 caracteres.' })
  cpfCnpj: string;

  @IsNotEmpty({ message: 'O nome do produtor é obrigatório.' })
  nomeProdutor: string;

  @IsNotEmpty({ message: 'O nome da fazenda é obrigatório.' })
  nomeFazenda: string;

  @IsNotEmpty({ message: 'A cidade é obrigatória.' })
  cidade: string;

  @IsNotEmpty({ message: 'O estado é obrigatório.' })
  estado: string;

  @IsNumber({}, { message: 'A área total deve ser um número.' })
  areaTotal: number;

  @IsNumber({}, { message: 'A área agricultável deve ser um número.' })
  @IsAreaValid('areaTotal', {
    message:
      'A soma das áreas agricultáveis e vegetação não pode exceder a área total.',
  })
  areaAgricultavel: number;

  @IsNumber({}, { message: 'A área de vegetação deve ser um número.' })
  @IsAreaValid('areaTotal', {
    message:
      'A soma das áreas agricultáveis e vegetação não pode exceder a área total.',
  })
  areaVegetacao: number;

  @IsArray({ message: 'Culturas deve ser uma lista de valores.' })
  @ArrayNotEmpty({ message: 'É necessário informar pelo menos uma cultura.' })
  culturas: string[];
}
