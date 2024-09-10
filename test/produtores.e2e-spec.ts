import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import * as request from 'supertest';

describe('Produtores (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  let produtorId: number;

  it('/produtores (POST)', () => {
    return request(app.getHttpServer())
      .post('/produtores')
      .send({
        cpfCnpj: '12345678901',
        nomeProdutor: 'José Silva',
        nomeFazenda: 'Fazenda Bela Vista',
        cidade: 'São Paulo',
        estado: 'SP',
        areaTotal: 500,
        areaAgricultavel: 300,
        areaVegetacao: 200,
        culturas: ['Soja', 'Milho'],
      })
      .expect(201)
      .then((response) => {
        produtorId = response.body.id;
        expect(response.body).toHaveProperty('id');
      });
  });

  it('/produtores (GET)', () => {
    return request(app.getHttpServer())
      .get('/produtores')
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body)).toBeTruthy();
      });
  });

  it('/produtores/:id (GET)', () => {
    return request(app.getHttpServer())
      .get(`/produtores/${produtorId}`)
      .expect(200)
      .then((response) => {
        expect(response.body.id).toEqual(produtorId);
      });
  });

  it('/produtores/:id (PATCH)', () => {
    return request(app.getHttpServer())
      .patch(`/produtores/${produtorId}`)
      .send({ nomeProdutor: 'José Atualizado' })
      .expect(200)
      .then((response) => {
        expect(response.body.nomeProdutor).toEqual('José Atualizado');
      });
  });

  it('/produtores/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete(`/produtores/${produtorId}`)
      .expect(200);
  });
});
