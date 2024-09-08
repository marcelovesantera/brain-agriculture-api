import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProdutoresTable1725811180666 implements MigrationInterface {
    name = 'CreateProdutoresTable1725811180666'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "produtor" ("id" SERIAL NOT NULL, "cpfCnpj" character varying NOT NULL, "nomeProdutor" character varying NOT NULL, "nomeFazenda" character varying NOT NULL, "cidade" character varying NOT NULL, "estado" character varying NOT NULL, "areaTotal" numeric NOT NULL, "areaAgricultavel" numeric NOT NULL, "areaVegetacao" numeric NOT NULL, "culturas" text NOT NULL, CONSTRAINT "UQ_9b2f8810f6476f79ab0a8427375" UNIQUE ("cpfCnpj"), CONSTRAINT "PK_da0beeee09664030b67354e41e2" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "produtor"`);
    }

}
