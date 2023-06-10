import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule, getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Transaction } from "@domain/entities/transaction.entity";
import { TransactionService } from "@application/transactions/transaction.service";
import { currencyType } from "@domain/enums/currencyType.enum";
import { CheckoutModel } from "@application/transactions/model/checkout.model";
import { domainEntities } from "@domain/entities/entities";
import { IMock, Mock, It, Times } from "typemoq";
import { Cache } from "cache-manager";
import { CACHE_MANAGER } from "@nestjs/cache-manager";

describe("TransactionService", () => {
  let service: TransactionService;
  let transactionRepository: Repository<Transaction>;
  const timeOut = 10000000;
  beforeAll(async () => {
    const mockCahce: IMock<Cache> = Mock.ofType(Cache);
    mockCahce.setup((x) => x.get(It.isAnyString())).returns(null);
    mockCahce.setup((x) => x.set(It.isAnyString(), It.isAny, It.isAnyNumber));
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: "sqlite",
          database: ":memory:",
          entities: [...domainEntities],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([...domainEntities]),
      ],
      providers: [
        {
          provide: CACHE_MANAGER,
          useValue: { get: jest.fn(), set: jest.fn() },
        },
        TransactionService,
      ],
    }).compile();

    service = moduleRef.get<TransactionService>(TransactionService);
    transactionRepository = moduleRef.get<Repository<Transaction>>(
      getRepositoryToken(Transaction)
    );
  }, timeOut);

  describe("checkout", () => {
    it(
      "should save transaction and purchase",
      async () => {
        const model = new CheckoutModel();
        model.amount = 100;
        model.currencyCode = "SOL";
        model.firstname = "John";
        model.lastname = "Doe";
        model.email = "john.doe@example.com";
        model.productname = "Test Product";
        model.currencyType = currencyType.CRYPTO;

        const result = await service.checkout(model);

        expect(result.referenceNumber).not.toBeNull();
        expect(result.referenceNumber).not.toBe("");
      },
      timeOut
    );

    it(
      "should rollback transaction if error occurs",
      async () => {
        const model = new CheckoutModel();
        model.amount = 100;
        model.currencyCode = "SOL";
        model.firstname = "John";
        model.lastname = "Doe";
        model.email = "john.doe@example.com";
        model.productname = "Test Product";
        model.currencyType = currencyType.CRYPTO;

        try {
          await service.checkout(model);
        } catch (error) {
          const transactions = await transactionRepository.find();
          expect(transactions).toHaveLength(0);
        }
      },
      timeOut
    );
  });

  describe("get-transactions", () => {
    it(
      "should be able to get transactions",
      async () => {
        const model = new CheckoutModel();
        model.amount = 100;
        model.currencyCode = "SOL";
        model.firstname = "John";
        model.lastname = "Doe";
        model.email = "john.doe@example.com";
        model.productname = "Test Product";
        model.currencyType = currencyType.CRYPTO;

        await service.checkout(model);

        const transactions = await service.getTransactions({});
        expect(transactions.length).toBeGreaterThan(0);
      },
      timeOut
    );
  });
});
