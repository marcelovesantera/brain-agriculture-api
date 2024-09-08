import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsAreaValid(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isAreaValid',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          const totalValue =
            (args.object as any).areaAgricultavel +
            (args.object as any).areaVegetacao;

          return totalValue <= relatedValue;
        },
        defaultMessage(args: ValidationArguments) {
          return 'A soma das áreas agriculturáveis e de vegetação não podem ser maior que a área total.';
        },
      },
    });
  };
}
