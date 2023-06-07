import { CheckoutResponseModel } from "./../../application/transactions/model/checkout.model";
import { ResultType } from "@/common/model/response.model";
import {
  ITransactionService,
  itransactionserviceDiToken,
} from "@application/transactions/itransaction.service";
import { CheckoutModel } from "@application/transactions/model/checkout.model";
import {
  GetTransactionQueryModel,
  TransactionModel,
} from "@application/transactions/model/transactions.model";
import { Transaction } from "@domain/entities/transaction.entity";
import {
  Injectable,
  Controller,
  Inject,
  Get,
  Query,
  Body,
  Post,
} from "@nestjs/common";
import { ApiCreatedResponse, ApiTags } from "@nestjs/swagger";

@Injectable()
@ApiTags("transactions")
@Controller("v1/transactions")
export class TransactionController {
  /**
   *
   */
  constructor(
    @Inject(itransactionserviceDiToken)
    private transactionSerivice: ITransactionService
  ) {}

  @Post("checkout")
  async createCheckout(
    @Body() model: CheckoutModel
  ): Promise<ResultType<CheckoutResponseModel>> {
    const result = await this.transactionSerivice.checkout(model);
    return ResultType.Ok<CheckoutResponseModel>(result);
  }

  @Get()
  async getTransactions(
    @Query() model: GetTransactionQueryModel
  ): Promise<ResultType<TransactionModel[]>> {
    const result = await this.transactionSerivice.getTransactions(model);
    return ResultType.Ok<TransactionModel[]>(result);
  }
}
