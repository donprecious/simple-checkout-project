import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import { AppModule } from "../../app.module";
import { CheckoutModel } from "@application/transactions/model/checkout.model";
import { currencyType } from "@domain/enums/currencyType.enum";
import e from "express";

describe("TransactionController (e2e)", () => {
  const timeOut = 10000000;
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe("/v1/transactions (POST)", () => {
    it(
      "should create a checkout",
      () => {
        const checkoutModel = {
          // fill with valid data
          amount: 10,
          currencyCode: "SOL",
          currencyType: currencyType.CRYPTO,
          email: "donprecious@gmail.com",
          firstname: "precious",
          lastname: "chrisBrown",
          productname: "Smart watch",
        } as CheckoutModel;

        return request(app.getHttpServer())
          .post("/v1/transactions/checkout")
          .send(checkoutModel)
          .expect(201) // replace with the correct HTTP status code
          .expect((res) => {
            const body = res.body;

            expect(body).not.toBeNull();
            expect(body.success).toBe(true);
            expect(body.data?.referenceNumber).not.toBeNull();

            // put your assertions here, based on the expected response
          });
      },
      timeOut
    );
  });

  describe("/v1/transactions (GET)", () => {
    it(
      "should get transactions",
      () => {
        const queryModel = {
          // fill with valid data
        };

        return request(app.getHttpServer())
          .get("/v1/transactions")
          .query(queryModel)
          .expect(200) // replace with the correct HTTP status code
          .expect((res) => {
            const body = res.body;

            expect(body).not.toBeNull();
            expect(body.success).toBe(true);
            expect(body.data?.length).toBeGreaterThanOrEqual(0);
            // put your assertions here, based on the expected response
          });
      },
      timeOut
    );
  });

  afterAll(async () => {
    await app.close();
  });
});
