import { BadRequestException, Inject, Logger } from "@nestjs/common";

import { ITransactionService } from "./itransaction.service";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { CheckoutModel, CheckoutResponseModel } from "./model/checkout.model";
import { Transaction } from "@domain/entities/transaction.entity";
import { uuid } from "uuidv4";
import {
  transactionCategoryEnum,
  transactionStatusEnum,
  transactionTypeEnum,
} from "@domain/enums/transaction.enum";
import { Purchase } from "@domain/entities/purchases.entity";
import {
  GetTransactionQueryModel,
  TransactionModel,
} from "./model/transactions.model";

export class TransactionService implements ITransactionService {
  private readonly logger = new Logger(TransactionService.name);
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Transaction)
    private transactionRepo: Repository<Transaction>
  ) {}

  async checkout(model: CheckoutModel): Promise<CheckoutResponseModel> {
    const reference = uuid();
    const transaction = this.dataSource
      .createEntityManager()
      .create(Transaction, {
        amount: model.amount,
        category: transactionCategoryEnum.PRODUCT_PURCHASE,
        currencyCode: model.currencyCode,
        referenceNo: reference,
        status: transactionStatusEnum.PENDING,
        type: transactionTypeEnum.CREDIT,
        narration: "product purchase",
      } as Transaction);

    const purchase = this.dataSource.createEntityManager().create(Purchase, {
      amount: model.amount,
      currencyCode: model.currencyCode,
      currencyType: model.currencyType,
      customerEmail: model.email,
      customerFirstName: model.firstname,
      customerLastName: model.lastname,
      productName: model.productname,
      referenceNo: reference,
      status: transactionStatusEnum.PENDING,
    } as Purchase);

    const queryRunner = this.dataSource.createQueryRunner();
    queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      this.logger.log("saving checkout transaction");
      await queryRunner.manager.save(transaction);
      purchase.transactionId = transaction.id;
      await queryRunner.manager.save(purchase);
      await await queryRunner.commitTransaction();
      this.logger.log("completed saving checkout transaction");

      // todo publish event to customer email to make payment for this order
    } catch (error) {
      this.logger.error(error);
      await queryRunner.rollbackTransaction();
      throw new Error(error);
    } finally {
      await queryRunner.release();
    }

    return {
      referenceNumber: reference,
    } as CheckoutResponseModel;
  }

  async getTransactions(
    model: GetTransactionQueryModel
  ): Promise<TransactionModel[]> {
    const transactions = await this.transactionRepo.find({
      relations: { purchase: true },
    });
    return transactions as unknown as TransactionModel[];
  }
}
